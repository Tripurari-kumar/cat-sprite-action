import React from "react";
import Motion from "./categoryTabs/Motion";
import Looks from "./categoryTabs/Looks";
import ReplayControls from "./categoryTabs/Replay";

export default function MidArea({
  setMotionState,
  motionState,
  selectedTab,
  lookState,
  setLookState,
  setActionHistory,
  previewRef,
  onNthReplayClick,
  onReplayAll,
}) {
  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full p-4 bg-gray-100">
      {selectedTab === "Motion" && (
        <Motion
          setMotionState={setMotionState}
          motionState={motionState}
          lookState={lookState}
          setActionHistory={setActionHistory}
          previewRef={previewRef}
        />
      )}
      {selectedTab === "Looks" && (
        <Looks
          lookState={lookState}
          setLookState={setLookState}
          motionState={motionState}
          setActionHistory={setActionHistory}
        />
      )}
      {selectedTab === "Replay" && (
        <ReplayControls
          onNthReplayClick={onNthReplayClick}
          onReplayAll={onReplayAll}
        />
      )}
    </div>
  );
}
