import React from "react";
import Icon from "./Icon";

export default function Sidebar({ selectedTab, setSelectedTab }) {
  const handleClick = (tab) => {
    setSelectedTab(tab);
  };

  const getTabClass = (tab) =>
    `p-4 cursor-pointer transition-colors duration-300 rounded-lg ${
      selectedTab === tab
        ? "bg-blue-700 text-white"
        : "bg-blue-400 hover:bg-blue-500 text-black"
    }`;

  return (
    <div className="w-60  p-2 border-r border-gray-200">
      <div className="flex">
        {/* Tabs */}
        <div className="flex flex-col w-full bg-gray-200 border-r border-gray-300">
          <div
            className={getTabClass("Motion")}
            onClick={() => handleClick("Motion")}
          >
            <h2 className="text-lg font-bold">Motion</h2>
          </div>
          <div
            className={getTabClass("Looks")}
            onClick={() => handleClick("Looks")}
          >
            <h2 className="text-lg font-bold">Looks</h2>
          </div>
          <div
            className={getTabClass("Replay")}
            onClick={() => handleClick("Replay")}
          >
            <h2 className="text-lg font-bold">Replay</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
