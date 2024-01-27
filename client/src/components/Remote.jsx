import React, { useContext } from "react";
import RobotContext from "../RobotContext";

const Remote = () => {
  const { setAnimateRobot, setSelectedRobot, teams, selectedRobot, setTeams } =
    useContext(RobotContext);

  const handleAccept = () => {
    const index = teams.findIndex(
      (item) => item.number === selectedRobot.toUpperCase()
    );
    if (index > -1) {
      const newTeams = [...teams];
      newTeams.splice(index, 1); // Remove the item from the copied array
      setTeams(newTeams); // Set the new array as the new state
      alert("success! removed " + selectedRobot);
    } else {
      alert("failed: " + selectedRobot);
    }
  };

  const handleDecline = () => {
    const index = teams.findIndex(
      (item) => item.number === selectedRobot.toUpperCase()
    );
    if (index > -1) {
      const newTeams = teams.map((team) => {
        if (team.number === selectedRobot.toUpperCase()) {
          return { ...team, cannotCaptain: true };
        }
        return team;
      });
      setTeams(newTeams); // Set the new array as the new state
      alert("success! declined " + selectedRobot);
    } else {
      alert("failed: " + selectedRobot);
    }
  };

  return (
    <div className=" h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-[300px] bg-white p-4 shadow-lg">
        <div className="mb-4">
          {/* todo: make this a dropdown */}
          <input
            type="text"
            className="w-full p-2 border-2 border-black mb-2"
            placeholder="Team Name (not caps sensitive)"
            onChange={(e) => {
              setSelectedRobot(e.target.value);
            }}
          />
          <input
            type="text"
            className="w-full p-2 border-2 border-black mb-2"
            placeholder="Input 1"
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
            Show {selectedRobot}'s robot
          </button>
          <button
            onClick={() => setAnimateRobot(false)}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
          >
            Stop Showing Robot
          </button>
          <button
            onClick={handleAccept}
            className="bg-green-500 text-white p-2 rounded hover:bg-red-700"
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
          >
            Decline
          </button>
          <button className="bg-red-500 text-white p-2 rounded hover:bg-red-700">
            back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Remote;
