import React, { useState, useEffect } from "react";
import { clamp, getBounds, motionConfig } from "../utils";

function Motion({
  setMotionState,
  motionState,
  setActionHistory,
  lookState,
  previewRef,
}) {
  const [localState, setLocalState] = useState({
    toMoveSteps: motionState.toMoveSteps,
    clockWiseTurnDegree: motionState.clockWiseTurnDegree,
    antiClockWiseTurnDegree: motionState.antiClockWiseTurnDegree,
    goto: { ...motionState.goto },
    pointingDirection: motionState.pointingDirection,
    positionType: motionState.positionType,
    turnDegree: motionState.turnDegree,
  });

  const { height, width } = getBounds(previewRef);

  

  const setReplayState = (prev, deltaX = 0, deltaY = 0) => [
    ...prev,
    {
      turnDegree: motionState.turnDegree,
      goto: {
        x: motionState.goto.x + deltaX,
        y: motionState.goto.y + deltaY,
      },
      size: lookState.sizePercentage / 100,
      msgState: lookState.currentTextAction,
    },
  ];

  useEffect(() => {
    setLocalState((prev) => ({
      ...prev,
      goto: { ...motionState.goto },
    }));
  }, [motionState.goto]);

  const moveCat = (deltaX, deltaY) => {
    const newX = clamp(motionState.goto.x + deltaX, -width / 2, width / 2);
    const newY = clamp(motionState.goto.y + deltaY, -height / 2, height / 2);

    setMotionState((prev) => ({
      ...prev,
      toMoveSteps: localState.toMoveSteps,
      goto: { x: newX, y: newY },
    }));
    setActionHistory((prev) => setReplayState(prev, deltaX, deltaY));
  };

  const handleLabelClick = (id, e) => {
    setMotionState((prevState) => {
      let updatedState = { ...prevState };
      switch (id) {
        case "move":
          const deltaSteps = localState.toMoveSteps;
          const radians = (prevState.pointingDirection * Math.PI) / 180;
          const deltaX = deltaSteps * Math.cos(radians);
          const deltaY = deltaSteps * Math.sin(radians);
          moveCat(deltaX, deltaY);
          break;

        case "turnClockwise":
          updatedState = {
            ...updatedState,
            turnDegree:
              (updatedState.turnDegree || 0) + localState.clockWiseTurnDegree,
          };
          setActionHistory(setReplayState);
          break;

        case "turnAnticlockwise":
          updatedState = {
            ...updatedState,
            turnDegree:
              (updatedState.turnDegree || 0) -
              localState.antiClockWiseTurnDegree,
          };
          setActionHistory(setReplayState);
          break;

        case "gotoPosition":
          updatedState.goto.x = clamp(localState.goto.x, -width / 2, width / 2);
          updatedState.goto.y = clamp(
            localState.goto.y,
            -height / 2,
            height / 2
          );
          setActionHistory(setReplayState);
          break;

        case "direction":
          updatedState = {
            ...updatedState,
            pointingDirection: localState.pointingDirection,
            turnDegree: localState.pointingDirection,
          };
          setActionHistory(setReplayState);
          break;

        case "positionType":
          if (localState.positionType === "mouse") {
            // Move to mouse position
            const mouseX =
              e.clientX -
              previewRef.current.getBoundingClientRect().left -
              width / 2;
            const mouseY =
              e.clientY -
              previewRef.current.getBoundingClientRect().top -
              height / 2;
            updatedState.goto.x = clamp(mouseX, -width / 2, width / 2);
            updatedState.goto.y = clamp(mouseY, -height / 2, height / 2);
          } else if (localState.positionType === "random") {
            const randomX = Math.floor(Math.random() * width) - width / 2;
            const randomY = Math.floor(Math.random() * height) - height / 2;
            updatedState = {
              ...updatedState,
              goto: { x: randomX, y: randomY },
            };
          }
          setActionHistory(setReplayState);
          break;

        default:
          break;
      }
      return updatedState;
    });
  };

  const handleInputChange = (id, newValue) => {
    setLocalState((prevState) => {
      let updatedState = { ...prevState };

      if (id === "gotoPosition") {
        updatedState.goto = {
          ...prevState.goto,
          [newValue.name]: clamp(
            newValue.value,
            newValue.name === "x" ? -width / 2 : -height / 2,
            newValue.name === "x" ? width / 2 : height / 2
          ),
        };
      } else {
        switch (id) {
          case "move":
            updatedState.toMoveSteps = clamp(newValue, -width / 2, width / 2);
            break;
          case "turnClockwise":
            updatedState.clockWiseTurnDegree = newValue;
            break;
          case "turnAnticlockwise":
            updatedState.antiClockWiseTurnDegree = newValue;
            break;
          case "direction":
            updatedState.pointingDirection = newValue;
            break;
          case "positionType":
            updatedState = { ...updatedState, positionType: newValue };
            break;
          default:
            break;
        }
      }
      return updatedState;
    });
  };

  const renderInput = (config) => (
    <div
      key={config.id}
      className="flex items-center bg-blue-50 p-2 rounded-lg"
    >
      <button
        onClick={() => handleLabelClick(config.id)}
        className="flex-shrink-0 font-semibold mr-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg p-2 cursor-pointer transition-all"
      >
        {config.label}{" "}
        {config.icon && <span className="text-lg">{config.icon}</span>}
      </button>
      <input
        type="number"
        value={localState[config.id]}
        placeholder={config.placeholder}
        onChange={(e) => handleInputChange(config.id, +e.target.value)}
        className="p-2 border border-gray-300 rounded-lg w-14 text-xs"
      />
      <span className="ml-2 text-sm text-gray-500">{config.unit}</span>
    </div>
  );

  const renderInputGroup = (config) => (
    <div key={config.id} className="flex bg-blue-50 p-4 rounded-lg ml-[10px]">
      <button
        onClick={() => handleLabelClick(config.id)}
        className="font-semibold mb-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg p-2 cursor-pointer transition-all mr-2"
      >
        {config.label}
      </button>
      <div className="flex space-x-4">
        {config.inputs.map((input) => (
          <div key={input.name} className="flex items-center">
            <input
              type="number"
              placeholder={config.placeholder}
              value={localState.goto[input.name.split(".")[1]]}
              onChange={(e) =>
                handleInputChange(config.id, {
                  name: input.name.split(".")[1],
                  value: +e.target.value,
                })
              }
              className="p-2 border border-gray-300 rounded-lg w-24 text-xs"
            />
            <span className="ml-2 text-xs text-gray-500">{input.unit}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSelect = (config) => (
    <div
      key={config.id}
      className="flex items-center bg-blue-50 p-2 rounded-lg"
    >
      <button
        onClick={(e) => handleLabelClick(config.id, e)}
        className="flex-shrink-0 font-semibold mr-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg p-2 cursor-pointer transition-all"
      >
        {config.label}
      </button>
      <select
        value={localState[config.id]}
        onChange={(e) => handleInputChange(config.id, e.target.value)}
        className="p-2 border border-gray-300 rounded-lg min-w-0"
      >
        {config.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="absolute top-4 left-4 bg-blue-50 p-6 rounded-lg shadow-lg space-y-4 w-full">
      {motionConfig.map((config) => {
        if (config.type === "input") {
          return renderInput(config);
        }
        if (config.type === "input-group") {
          return renderInputGroup(config);
        }
        if (config.type === "select") {
          return renderSelect(config);
        }
        return null;
      })}
    </div>
  );
}

export default Motion;
