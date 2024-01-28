import React, { useContext, useState } from "react";
import RobotContext from "../RobotContext";

const Remote = () => {
  const {
    setAnimateRobot,
    setSelectedRobot,
    teams,
    selectedRobot,
    setTeams,
    seeds,
    setSeeds,
    videoFound,
  } = useContext(RobotContext);

  const [currentSeed, setCurrentSeed] = useState(1);

  const checkIfNewCaptain = () => {
    for (let i = 0; i < seeds.length; i++) {
      if (seeds[i].key < currentSeed && seeds[i].secondTeam === "") {
        return false;
      }
    }
    return true;
  };

  const newCaptain = () => {
    if (checkIfNewCaptain()) {
      const newSeeds = seeds.map((seed) => {
        if (seed.key === currentSeed && seed.firstTeam === "") {
          return { ...seed, firstTeam: teams[0].number };
        }
        return seed;
      });
      removeTeam(0);
      setSeeds(newSeeds);
      setCurrentSeed((prevSeed) => prevSeed + 1);
    } else {
      alert("cannot new captain");
    }
  };

  const addTeamToSeed = (team) => {
    let found = false;
    const newSeeds = seeds.map((seed) => {
      if (seed.secondTeam === "" && !found) {
        found = true;
        return { ...seed, secondTeam: team };
      }
      return seed;
    });
    setSeeds(newSeeds);
  };

  const removeTeam = (index) => {
    const newTeams = [...teams];
    setTeams(
      newTeams.slice(0, index).concat(newTeams.slice(index + 1, teams.length))
    );
  };

  const handleAccept = () => {
    const index = teams.findIndex(
      (item) => item.number === selectedRobot.toUpperCase()
    );

    if (index > -1) {
      if (!teams[index].cannotAccept) {
        setAnimateRobot(false);
        addTeamToSeed(teams[index].number);
        removeTeam(index);
      } else {
        alert("failed: " + selectedRobot);
      }
    }
  };

  const handleDecline = () => {
    const index = teams.findIndex(
      (item) => item.number === selectedRobot.toUpperCase()
    );
    if (index > -1) {
      const newTeams = teams.map((team) => {
        if (team.number === selectedRobot.toUpperCase()) {
          return { ...team, cannotAccept: true };
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
            className={`${
              videoFound ? "bg-green-500" : "bg-red-500"
            } text-white p-2 rounded hover:bg-red-700`}
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
          <button
            onClick={newCaptain}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
          >
            New Captain
          </button>
        </div>
      </div>
    </div>
  );
};

export default Remote;
