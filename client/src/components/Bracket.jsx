import React from "react";

function Bracket() {
  return (
    <div className="flex flex-row w-full h-full items-center justify-between bg-black">
      <div className="red w-1/3 bg-red-600 h-full"></div>
      <div className="w-[30px] h-full bg-white"></div>
      <div className="blue w-1/3 bg-blue-600 h-full"></div>
    </div>
  );
}

export default Bracket;
