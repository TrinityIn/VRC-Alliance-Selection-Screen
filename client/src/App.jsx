import { useEffect, useState, useContext } from "react";
import Remote from "./components/Remote";
import "./App.css";
import RobotContext from "./RobotContext"; // Adjust the path as needed
import Bracket from "./components/Bracket";

function App() {
  const [animateRobot, setAnimateRobot] = useState(false);
  const [selectedRobot, setSelectedRobot] = useState("0");
  const [teamComponent, setTeamComponent] = useState([]);
  const [seeds, setSeeds] = useState([]);
  const [videoFound, setVideoFound] = useState(false);

  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRankings = async () => {
    const eventId = 51496; // Example Event ID
    const divisionId = 1; // Example Division ID
    let allRankings = [];
    let currentPage = 1;
    const apiKey = "YOUR_AUTH_TOKEN"; // Replace with your actual token

    try {
      do {
        const url = `https://www.robotevents.com/api/v2/events/${eventId}/divisions/${divisionId}/rankings?page=${currentPage}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            accept: "application/json",
            authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiZTY4Y2IzYTRlYzVkODU4Y2ZjZGZlYjEzY2Q4MjJjNzBjOGM2NzFkNGE5ODc1MDM2MWEwY2E1OTNjMGM5MDU5YmUyMDY0YjJkOWFkNDE3MWYiLCJpYXQiOjE3MDcwMjIxMDkuOTA3NTE0MSwibmJmIjoxNzA3MDIyMTA5LjkwNzUxNywiZXhwIjoyNjUzNzkzMzA5Ljg5NDQ4ODgsInN1YiI6Ijg3OTI1Iiwic2NvcGVzIjpbXX0.aDumHzVvXiAZywJj6RYU0Mvlag7TmeISHl6KUxfLylftaydHrz_EniS7bviymD5ea2QxKo3UKdU1eMVnmiuqrxl0o2o0ek7dYfxtjwIKd_mIN5Lmy2LXjvynNPMx_XhUJWkzm2-nyeOGtnquC4aNzq6jYzOXLMgWbPIWbnx6HY3Ip_EdXiPdGtafSjiENqE9yd46RWdWkVEwF960MIijzvG7wkHQXaaZBbvP3rDQgVP9GyORflDSD8a-citr2ETpx6SJMzt-FtwGfaYhmdooHDDaSzYWzKzFDzbzBC13jnfvZxiPWonyNZHnuCf9azr-xLpa8D4vTnS9RI8da6QEzQHweKvWbpugwhZyjtD0iqgckiB01P1LVUOf36bmOupvlbJqQg-YtLzke3mfBvvo6lT_x-3hE19j_Vrxn8BQQrhCZ43aFVAdJVcv9czhINzpW1nIWhKbwqpkbuXWdL51BEWkdb6CXYuIMPTZgDhJv8j-HVHZfIBYjKnVeGMBSqV0GnY5qTYVJq-r0qkl1--ATy4po8lNId7YSl44SYChG-9zrLQtOBDWUnUGNfTRZVxdi9gxq46R6GkkKX7SgVLdUn8QG0xEFsik60cnL1EL_RcBxjas2RTeoK1QhxM_IVPvNTwbBYUWHhfKxn4xLsQ3G4z1FGCbIoVdW8e8r9pHY_k`,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }

        const data = await response.json();
        allRankings = allRankings.concat(data.data);
        currentPage++; // Increment page number for next iteration
        // console.log(allRankings + " " + currentPage);
      } while (currentPage <= 5); // Continue until the last page
      console.log(allRankings.reverse());
      setRankings(allRankings.reverse());
    } catch (error) {
      setError(`Failed to fetch rankings: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankings();
  }, []);

  useEffect(() => {
    const videoExists = teams.some((team) => team.number === selectedRobot);
    setVideoFound(videoExists);
  }, [selectedRobot]);

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
    const updatedTeamComponent = rankings.map((team) => (
      <div key={team.team.name}>
        <div className="flex flex-row justify-center items-center">
          <p className=" text-red-500 text-sm -mr-2">{team.rank}</p>
          <h1
            className={`${
              team.cannotAccept ? "text-red-500" : "text-white"
            } text-3xl py-3 px-3`}
          >
            {team.team.name}
          </h1>
        </div>
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
        videoFound,
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
              className={`w-4/5 bg-black border border-white rounded-lg h-[550px] ${
                animateRobot ? "" : "hidden"
              } flex justify-center flex-col items-center overflow-hidden`}
            >
              <video
                key={selectedRobot}
                loop
                muted
                autoPlay
                className={`${animateRobot ? "" : "hidden"} w-full`}
              >
                <source src={`/vid/${selectedRobot}.mp4`} type="video/mp4" />
              </video>

              <h1 className="text-white text-6xl font-black -mt-[50px]">
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
