import React, { useState } from "react";
import styles from "./Polling.module.css";

const Polling = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [votes, setVotes] = useState({ team1: 0, team2: 0 });

  const teams = [
    { id: "team1", name: "India", logo: "https://upload.wikimedia.org/wikipedia/mai/1/11/India_national_cricket_team.png" },
    { id: "team2", name: "Australia", logo: "https://upload.wikimedia.org/wikipedia/en/3/3f/Cricket_Australia.png" }
  ];

  const handleVote = (teamId) => {
    setSelectedTeam(teamId);
    setVotes((prevVotes) => ({
      ...prevVotes,
      [teamId]: prevVotes[teamId] + 1,
    }));
  };

  const totalVotes = votes.team1 + votes.team2;
  const calculatePercentage = (teamVotes) => (totalVotes ? Math.round((teamVotes / totalVotes) * 100) : 0);

  return (
    <div className={styles.pollContainer}>
      <h2 className={styles.pollTitle}>Who Will Win?</h2>
      <div className={styles.teamsContainer}>
        {teams.map((team) => (
          <div
            key={team.id}
            className={`${styles.teamCard} ${selectedTeam === team.id ? styles.selected : ""}`}
            onClick={() => handleVote(team.id)}
          >
            <img src={team.logo} alt={`${team.name} logo`} className={styles.teamLogo} />
            <h3>{team.name}</h3>
            {selectedTeam && (
              <div className={styles.voteResults}>
                <div
                  className={styles.voteBar}
                  style={{
                    width: `${calculatePercentage(votes[team.id])}%`,
                    backgroundColor: team.id === "team1" ? "#0066cc" : "#ff6600",
                  }}
                >
                  {votes[team.id]} votes ({calculatePercentage(votes[team.id])}%)
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className={styles.totalVotes}>Total Votes: {totalVotes}</p>
    </div>
  );
};

export default Polling;