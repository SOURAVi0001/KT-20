import React, { useEffect, useState } from "react";
import styles from "./Livescore.module.css";
import noMatchImage from "../uploads/images/noMatch.png";
import axios from "axios";

function LiveMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false); // 🔁 local trigger

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get("http://localhost:8080/match/live");
        setMatches(res.data || []);
      } catch (error) {
        console.error("Failed to fetch matches:", error);
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [refresh]); // 🔁 re-fetch on refresh toggle

  if (loading) {
    return <p className={styles.loading}>Loading Live Matches...</p>;
  }

  if (!matches || matches.length === 0) {
    return (
      <div className={styles.noMatchContainer}>
        <img src={noMatchImage} alt="No Live Match" className={styles.noMatchImage} />
        <h2 className={styles.noMatchText}>No Live Matches Right Now</h2>
        <p className={styles.upcomingText}>Stay tuned for upcoming matches!</p>
        <button className={styles.upcomingBtn} onClick={() => {
          setLoading(true);
          setRefresh(prev => !prev); // ✅ soft refresh
        }}>
          Check Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Live Cricket Matches</h1>

      {matches.map((match, index) => (
        <div key={index} className={styles.singleMatch}>
          <h2 className={styles.matchTitle}>{match.teamHeading}</h2>
          <p className={styles.matchVenue}>{match.matchNumberVenue}</p>

          <div className={styles.scoreboard}>
            <div className={styles.teamInfo}>
              <span className={styles.teamName}>{match.battingTeam}</span>
              <span className={styles.mainScore}>{match.battingTeamScore}</span>
            </div>
            <div className={styles.vs}>VS</div>
            <div className={styles.teamInfo}>
              <span className={styles.teamName}>{match.bowlTeam}</span>
              <span className={styles.mainScore}>{match.bowlTeamScore}</span>
            </div>
          </div>

          <p className={styles.liveUpdate}>{match.liveText}</p>

          <p className={`${styles.matchStatus} ${match.status === "LIVE" ? styles.live : styles.completed}`}>
            {match.status}
          </p>

          <a href={match.matchLink} className={styles.matchLink} target="_blank" rel="noopener noreferrer">
            View Full Scorecard
          </a>
        </div>
      ))}
    </div>
  );
}

export default LiveMatches;
