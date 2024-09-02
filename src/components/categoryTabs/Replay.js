import React, { useState } from "react";
import { replayConfig } from "../utils"; // Adjust the path as needed

function ReplayControls({ onNthReplayClick, onReplayAll }) {
  const [nthActionValue, setNthActionValue] = useState(0);

  const handleNthChange = (e) => {
    setNthActionValue(e.target.value);
  };

  return (
    <div className="absolute top-4 left-4 bg-blue-50 p-6 rounded-lg shadow-lg space-y-4 w-full max-w-sm">
      {replayConfig.map((config) => {
        switch (config.id) {
          case "replayAllActions":
            return (
              <div
                key={config.id}
                className="flex items-center bg-blue-50 p-2 rounded-lg mb-2"
              >
                <button
                  onClick={onReplayAll}
                  className="flex-shrink-0 font-semibold mr-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg p-2 cursor-pointer transition-all"
                >
                  {config.label}
                </button>
              </div>
            );
          case "replayNthAction":
            return (
              <div
                key={config.id}
                className="flex items-center bg-blue-50 p-2 rounded-lg mb-2"
              >
                <button
                  onClick={() => onNthReplayClick(nthActionValue)}
                  className="flex-shrink-0 font-semibold mr-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg p-2 cursor-pointer transition-all"
                >
                  {config.label}
                </button>
                <input
                  type="number"
                  value={nthActionValue}
                  onChange={handleNthChange}
                  className="p-2 border border-gray-300 rounded-lg w-20 text-xs ml-2"
                />
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export default ReplayControls;
