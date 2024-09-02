import React, { useState } from "react";
import { lookConfig } from "../utils";

function Looks({ lookState, setLookState, setActionHistory, motionState }) {
  const [localState, setLocalState] = useState({
    sayDurationMsg: { ...lookState.sayDurationMsg },
    sayMsg: lookState.sayMsg,
    thinkMsg: lookState.thinkMsg,
    thinkDurationMsg: { ...lookState.thinkDurationMsg },
    costume: lookState.costume,
    sizePercentage: lookState.sizePercentage,
    currentTextAction: lookState.currentTextAction,
  });

  const setReplayState = (prev, currentTextAction) => [
    ...prev,
    {
      turnDegree: motionState.turnDegree,
      goto: {
        x: motionState.goto.x,
        y: motionState.goto.y,
      },
      size: localState.sizePercentage / 100,
      msgState: currentTextAction,
    },
  ];

  const handleInputChange = (id, value) => {
    setLocalState((prev) => {
      switch (id) {
        case "sayDuration":
          return {
            ...prev,
            sayDurationMsg: { ...prev.sayDurationMsg, ...value },
          };
        case "thinkDuration":
          return {
            ...prev,
            thinkDurationMsg: { ...prev.thinkDurationMsg, ...value },
          };
        case "say":
          return { ...prev, sayMsg: value };
        case "think":
          return { ...prev, thinkMsg: value };
        case "sizeChangeByPercent":
          return { ...prev, sizePercentage: value };
        default:
          return prev;
      }
    });
  };

  const handleLabelClick = (id) => {
    setLookState((prev) => {
      switch (id) {
        case "sayDuration":
          setActionHistory((prev) => setReplayState(prev, "sayDurationMsg"));
          return {
            ...prev,
            currentTextAction: `sayDurationMsg`,
            sayDurationMsg: { ...localState.sayDurationMsg },
          };
        case "thinkDuration":
          setActionHistory((prev) => setReplayState(prev, "thinkDurationMsg"));
          return {
            ...prev,
            currentTextAction: `thinkDurationMsg`,
            thinkDurationMsg: { ...localState.thinkDurationMsg },
          };
        case "say":
          setActionHistory((prev) => setReplayState(prev, "say"));
          return {
            ...prev,
            currentTextAction: `sayMsg`,
            sayMsg: localState.sayMsg,
          };
        case "think":
          setActionHistory((prev) => setReplayState(prev, "think"));
          return {
            ...prev,
            currentTextAction: `thinkMsg`,
            thinkMsg: localState.thinkMsg,
          };
        case "sizeChangeByPercent":
          setActionHistory((prev) =>
            setReplayState(prev, "sizeChangeByPercent")
          );
          return { ...prev, sizePercentage: localState.sizePercentage };
        default:
          return prev;
      }
    });
  };


  const renderAction = (config) => {
    switch (config.id) {
      case "sayDuration":
        return (
          <div
            key={config.id}
            className="flex items-center bg-blue-50 p-2 rounded-lg mb-2"
          >
            <button
              onClick={() => handleLabelClick(config.id)}
              className="flex-shrink-0 font-semibold mr-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg p-2 cursor-pointer transition-all"
            >
              {config.action}
            </button>
            <input
              type="text"
              placeholder={config.placeholder}
              value={localState.sayDurationMsg.msg}
              onChange={(e) =>
                handleInputChange(config.id, { msg: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-lg w-40 text-xs ml-2"
            />
            <span className="p-2">for</span>
            <input
              type="number"
              placeholder={config.placeholder}
              value={localState.sayDurationMsg.duration}
              onChange={(e) =>
                handleInputChange(config.id, { duration: +e.target.value })
              }
              className="p-2 border border-gray-300 rounded-lg w-14 text-xs"
            />
            <span className="p-2">secs</span>
          </div>
        );
      case "thinkDuration":
        return (
          <div
            key={config.id}
            className="flex items-center bg-blue-50 p-2 rounded-lg mb-2"
          >
            <button
              onClick={() => handleLabelClick(config.id)}
              className="flex-shrink-0 font-semibold mr-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg p-2 cursor-pointer transition-all"
            >
              {config.action}
            </button>
            <input
              type="text"
              placeholder={config.placeholder}
              value={localState.thinkDurationMsg.msg}
              onChange={(e) =>
                handleInputChange(config.id, { msg: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-lg w-40 text-xs ml-2"
            />
            <span className="p-2">for</span>
            <input
              type="number"
              placeholder={config.placeholder}
              value={localState.thinkDurationMsg.duration}
              onChange={(e) =>
                handleInputChange(config.id, { duration: +e.target.value })
              }
              className="p-2 border border-gray-300 rounded-lg w-14 text-xs"
            />
            <span className="p-2">secs</span>
          </div>
        );
      case "say":
      case "think":
        return (
          <div
            key={config.id}
            className="flex items-center bg-blue-50 p-2 rounded-lg mb-2"
          >
            <button
              onClick={() => handleLabelClick(config.id)}
              className="flex-shrink-0 font-semibold mr-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg p-2 cursor-pointer transition-all"
            >
              {config.action}
            </button>
            <input
              type="text"
              placeholder={config.placeholder}
              value={localState[config.id]}
              onChange={(e) => handleInputChange(config.id, e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-40 text-xs ml-2"
            />
          </div>
        );
      case "sizeChangeByPercent":
        return (
          <div
            key={config.id}
            className="flex items-center bg-blue-50 p-2 rounded-lg mb-2"
          >
            <button
              onClick={() => handleLabelClick(config.id)}
              className="flex-shrink-0 font-semibold mr-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg p-2 cursor-pointer transition-all"
            >
              {config.action}
            </button>
            <input
              type="number"
              placeholder={config.placeholder}
              value={localState.sizePercentage}
              onChange={(e) => handleInputChange(config.id, +e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-14 text-xs"
            />
            <span className="ml-2">%</span>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className="absolute top-4 left-4 bg-blue-50 p-6 rounded-lg shadow-lg space-y-4 w-full">
      {lookConfig.map((config) => renderAction(config))}
    </div>
  );
}

export default Looks;
