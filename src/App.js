import React, { useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";

export default function App() {
  const [motionState, setMotionState] = useState({
    toMoveSteps: 0,
    antiClockWiseTurnDegree: 0,
    clockWiseTurnDegree: 0,
    positionType: "random",
    turnDegree: 0,
    goto: { x: 0, y: 0 },
    pointingDirection: 0,
  });
  const [lookState, setLookState] = useState({
    sayDurationMsg: {
      msg: "",
      duration: 2,
    },
    sayMsg: "",
    thinkMsg: "",
    thinkDurationMsg: {
      msg: "",
      duration: 2,
    },
    costume: "costume1",
    sizePercentage: 100,
    currentTextAction: "",
  });
  const [actionHistory, setActionHistory] = useState([]);
  const [isReplayig, setIsReplaying] = useState(false);
  const previewRef = useRef(null);

  const [selectedTab, setSelectedTab] = useState("Motion");

  const onNthReplayClick = (n) => {
    if (n < 1 || n > actionHistory.length) return;
    setLookState((prev) => ({
      ...prev,
      currentTextAction: actionHistory?.[n - 1]?.msgState,
      sizePercentage: actionHistory?.[n - 1]?.size * 100,
    }));
    setMotionState((prev) => ({
      ...prev,
      goto: actionHistory?.[n - 1]?.goto,
      turnDegree: actionHistory?.[n - 1]?.turnDegree,
    }));
  };

  const onReplayAll = () => {
    const delay = 1000;
    setIsReplaying(true);
    actionHistory.forEach((item, index) => {
      setTimeout(() => {
        setLookState((prev) => ({
          ...prev,
          currentTextAction: item?.msgState,
          sizePercentage: item?.size * 100,
        }));
        setMotionState((prev) => ({
          ...prev,
          goto: item?.goto,
          turnDegree: item?.turnDegree,
        }));
        if (index === actionHistory.length - 1) {
          setIsReplaying(false);
        }
      }, delay + index * 1000);
    });
  };

  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row  ">
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          <div
            className={`${
              isReplayig ? "pointer-events-none filter grayscale" : ""
            }`}
          >
            <Sidebar
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </div>

          <MidArea
            motionState={motionState}
            setMotionState={setMotionState}
            selectedTab={selectedTab}
            lookState={lookState}
            setLookState={setLookState}
            setActionHistory={setActionHistory}
            previewRef={previewRef}
            onNthReplayClick={onNthReplayClick}
            onReplayAll={onReplayAll}
          />
        </div>

        <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          <PreviewArea
            setMotionState={setMotionState}
            motionState={motionState}
            lookState={lookState}
            setLookState={setLookState}
            previewRef={previewRef}
          />
        </div>
      </div>
    </div>
  );
}
