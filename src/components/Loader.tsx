import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-5  bg-gradient-to-r from-[#3378ff] to-[#9442fe] ">
      <div className="flex space-x-2 animate-pulse">
        <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
        <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
        <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default Loader;
