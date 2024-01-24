import { useState } from "react";

import "./App.css";

function App() {
  const [animateRobot, setAnimateRobot] = useState(true);
  const [selectedRobot, setSelectedRobot] = useState("210Y");

  return (
    <div className="w-full h-screen items-center flex">
      <div className="h-[1080px] w-[1920px] flex bg-black flex-row ">
        <div className="w-1/2 bg-gray-400 flex flex-row">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="w-1/2 flex flex-col items-center ">
          <div className="w-4/5 bg-green-500 rounded-3xl h-[400px] my-10 "></div>
          <div
            className={`w-4/5 bg-gray-900 border border-white rounded-lg h-[550px] ${
              animateRobot ? "hidden" : ""
            }`}
          ></div>
          <div
            className={`w-4/5 bg-green-500 border border-white rounded-lg h-[550px] ${
              animateRobot ? "" : "hidden"
            } flex items-end justify-center`}
          >
            <h1 className="text-white text-6xl font-black">{selectedRobot}</h1>
          </div>
        </div>
      </div>
      <div className="flex-grow h-screen bg-red-700 flex">
        <input
          type="text"
          className="bg-gray-900 text-white h-[200px] flex-grow placeholder:'Robot Name'"
          onChange={(e) => setSelectedRobot(e.target.value)}
          placeholder="Robot Name"
        />
        <button onClick={() => setAnimateRobot(!animateRobot)}>
          {animateRobot ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
}

export default App;
