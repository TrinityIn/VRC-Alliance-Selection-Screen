import { useEffect, useState, useContext } from "react";
import Remote from "./components/Remote";
import "./App.css";
import RobotContext from "./RobotContext"; // Adjust the path as needed
import Bracket from "./components/Bracket";

function App() {
  const [animateRobot, setAnimateRobot] = useState(false);
  const [selectedRobot, setSelectedRobot] = useState("210Y");
  const [teamComponent, setTeamComponent] = useState([]);
  const [seeds, setSeeds] = useState([]);

  // Todo: get teams using robotevents api
  const teamList = [
    {
      key: 0,
      number: "10B",
      teamName: "Exothermic Blaze",
      organization: "Exothermic Robotics",
      location: "Redmond, Washington, United States",
    },
    {
      key: 2,
      number: "210F",
      teamName: "Ok I Pull Up",
      organization: "Western Mechatronics",
      location: "Calgary, Alberta, Canada",
    },
    {
      key: 3,
      number: "10N",
      teamName: "Exothermic Blaze",
      organization: "Exothermic Robotics",
      location: "Redmond, Washington, United States",
    },
    {
      key: 4,
      number: "210B",
      teamName: "Ok I Pull Up",
      organization: "Western Mechatronics",
      location: "Calgary, Alberta, Canada",
    },
    {
      key: 5,
      number: "10C",
      teamName: "Exothermic Blaze",
      organization: "Exothermic Robotics",
      location: "Redmond, Washington, United States",
    },
  ];

  const [teams, setTeams] = useState(teamList);

  useEffect(() => {
    const updatedTeamComponent = teams.map((team) => (
      <div key={team.number}>
        <h1
          className={`${
            team.cannotCaptain ? "text-red-500" : "text-white"
          } text-3xl py-3 px-3`}
        >
          {team.number}
        </h1>
      </div>
    ));
    setTeamComponent(updatedTeamComponent);
  }, [teams]);

  return (
    <RobotContext.Provider
      value={{
        animateRobot,
        setAnimateRobot,
        selectedRobot,
        setSelectedRobot,
        teams,
        setTeams,
        seeds,
        setSeeds,
      }}
    >
      <div className="w-full h-screen items-center flex">
        <div className="h-[1080px] w-[1920px] flex bg-black flex-row ">
          <div className="w-1/2 bg-gray-400 flex flex-row">
            <Bracket />
          </div>
          <div className="w-1/2 flex flex-col items-center ">
            <div className="w-4/5 bg-green-500 rounded-3xl h-[400px] my-10 "></div>
            <div
              className={`w-4/5 bg-gray-900 border border-white rounded-lg h-[550px] ${
                animateRobot ? "hidden" : ""
              } overflow-hidden`}
            >
              <div className="flex flex-row flex-wrap py-3 px-3 overflow-hidden">
                {teamComponent}
              </div>
            </div>
            <div
              className={`w-4/5 bg-green-500 border border-white rounded-lg h-[550px] ${
                animateRobot ? "" : "hidden"
              } flex items-end justify-center`}
            >
              <h1 className="text-white text-6xl font-black">
                {selectedRobot}
              </h1>
            </div>
          </div>
        </div>
        <div className="w-[300px] h-screen bg-red-700 flex overflow-hidden">
          <Remote />
        </div>
      </div>
    </RobotContext.Provider>
  );
}

export default App;
