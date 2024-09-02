import React from "react";

const CloudText = ({ text, actionType }) => {
  return (
    <div className="relative flex flex-col items-center">
      {actionType === "think" ? (
        <div className="relative flex flex-col items-center mb-32 ml-40">
          <div
            className="absolute w-4 h-4 bg-white rounded-full shadow-sm"
            style={{
              bottom: "-60px",
              transform: "rotate(-10deg)",
              left: "10px",
              zIndex: 1,
            }}
          />
          <div
            className="absolute w-6 h-6 bg-white rounded-full shadow-sm"
            style={{
              bottom: "-40px",
              transform: "rotate(5deg)",
              left: "15px",
              zIndex: 1,
            }}
          />
          <div
            className="absolute w-5 h-5 bg-white rounded-full shadow-sm"
            style={{
              bottom: "-20px",
              transform: "rotate(-5deg)",
              left: "20px",
              zIndex: 1,
            }}
          />

          <div className="relative flex items-center justify-center w-40 h-24 bg-white rounded-full shadow-md p-4 mt-8">
            <span className="text-sm text-gray-700">{text}</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-40 h-24 bg-white rounded-full shadow-md p-4">
          <span className="text-sm text-gray-700">{text}</span>
        </div>
      )}
    </div>
  );
};

export default CloudText;
