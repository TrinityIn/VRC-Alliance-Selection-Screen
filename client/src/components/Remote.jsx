import React from "react";

const Remote = ({ setAnimateRobot, setSelectedRobot }) => {
  return (
    <div className=" h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-[300px] bg-white p-4 shadow-lg">
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border-2 border-black mb-2"
            placeholder="Input 1"
          />
          <input
            type="text"
            className="w-full p-2 border-2 border-black mb-2"
            placeholder="Input 2"
            onChange={(e) => {
              setSelectedRobot(e.target.value);
            }}
          />
          <input
            type="text"
            className="w-full p-2 border-2 border-black mb-2"
            placeholder="Input 3"
          />
        </div>
        <div className="flex justify-between flex-wrap">
          <button
            onClick={() => setAnimateRobot(true)}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
          >
            Button 1
          </button>
          <button
            onClick={() => setAnimateRobot(false)}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
          >
            Button 2
          </button>
          <button className="bg-red-500 text-white p-2 rounded hover:bg-red-700">
            Button 3
          </button>
          <button className="bg-red-500 text-white p-2 rounded hover:bg-red-700">
            Button 4
          </button>
          <button className="bg-red-500 text-white p-2 rounded hover:bg-red-700">
            Button 5
          </button>
        </div>
      </div>
    </div>
  );
};

export default Remote;
