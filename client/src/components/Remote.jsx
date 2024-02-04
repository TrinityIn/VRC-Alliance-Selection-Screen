import React, { useContext, useState } from "react";
import RobotContext from "../RobotContext";

const Remote = () => {
  const {
    setAnimateRobot,
    setSelectedRobot,
    teams,
    selectedRobot,
    setTeams,
    rankings,
    setRankings,
    seeds,
    setSeeds,
    videoFound,
  } = useContext(RobotContext);

  const [currentSeed, setCurrentSeed] = useState(1);
  const [requestedTeam, setRequestedTeam] = useState(false);

  const canSelect = (team) => {
    const index = rankings.findIndex(
      (item) => item.team.name === team.toUpperCase()
    );

    if (index > -1) {
      // if (rankings[index].cannotAccept) {
      //   return false;
      // }
      return true;
    }
  };

  const handleRequest = () => {
    setRequestedTeam(true);
  };

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
      // alert("cannot new captain");
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
    const newRankings = [...rankings];
    setTeams(
      newTeams.slice(0, index).concat(newTeams.slice(index + 1, teams.length))
    );
    setRankings(
      newRankings
        .slice(0, index)
        .concat(newRankings.slice(index + 1, rankings.length))
    );
  };

  const handleAccept = () => {
    const index = rankings.findIndex(
      (item) => item.team.name === selectedRobot.toUpperCase()
    );

    if (index > -1) {
      console.log("CANNOT");
      if (!rankings[index].cannotAccept) {
        setAnimateRobot(false);
        addTeamToSeed(rankings[index].team.name);
        removeTeam(index);
      } else {
        // alert("failed: " + selectedRobot);
      }
      setRequestedTeam(false);
    }
  };

  const handleDecline = () => {
    const index = rankings.findIndex(
      (item) => item.team.name === selectedRobot.toUpperCase()
    );
    if (index > -1) {
      const newRankings = rankings.map((team) => {
        if (team.team.name === selectedRobot.toUpperCase()) {
          return { ...team, cannotAccept: true };
        }
        return team;
      });
      setRankings(newRankings);
    } else {
    }
    setRequestedTeam(false);
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
        </div>
        <div className="flex flex-col justify-evenly pt-5 space-y-3">
          <button
            onClick={() => setAnimateRobot(true)}
            className={`${
              videoFound ? "bg-green-500" : "bg-red-500"
            } text-white p-2 rounded hover:bg-red-700`}
            disabled={!videoFound}
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
            onClick={handleRequest}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            disabled={!videoFound || !canSelect(selectedRobot)}
          >
            Request {selectedRobot}
          </button>

          <button
            onClick={newCaptain}
            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700"
            disabled={!checkIfNewCaptain()}
          >
            New Captain
          </button>
        </div>
      </div>

      <div
        className={`bg-black flex flex-row w-full justify-evenly ${
          requestedTeam ? "" : "hidden"
        }`}
      >
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
      </div>
    </div>
  );
};

export default Remote;
