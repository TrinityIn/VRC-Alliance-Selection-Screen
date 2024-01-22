import { useState } from "react";

import "./App.css";

function App() {
  return (
    <div className="h-[1080px] w-[1920px] flex bg-black flex-row ">
      <div className="w-1/2 bg-gray-400 flex flex-row">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="w-1/2 flex flex-col items-center ">
        <div className="w-4/5 bg-green-500 rounded-lg h-[400px] my-10 "></div>
        <div className="w-4/5 bg-gray-900 border border-white rounded-lg h-[550px]"></div>
      </div>
    </div>
  );
}

export default App;
