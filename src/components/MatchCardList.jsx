import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MatchCardList.css"; // Import the CSS

const MatchCardList = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get(
          "https://core-prod-origin.cricclubs.com/core/match/getMatches",
          {
            params: {
              clubId: 17793,
              limit: 50,
            },
            headers: {
              "x-consumer-key": "Kom177cc",
              "x-api-key": "adm$ui93",
            },
          }
        );
        if (res.data.responseState && Array.isArray(res.data.data)) {
          setMatches(res.data.data);
        } else {
          console.error("Unexpected response:", res.data);
        }
      } catch (error) {
        console.error("Failed to fetch match data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <p className="loading-text">Loading matches...</p>;

  return (
    <div className="match-card-container">
      <h2 className="match-title">Match List</h2>
      <div className="match-grid">
        {matches.map((match) => (
          <div className="match-card" key={match.matchId}>
            <div className="match-header">
              <span className={`status ${match.status?.toLowerCase() === "live" ? "live" : "upcoming"}`}>
                {match.status || "N/A"}
              </span>
              <span className="match-date">{match.matchDate || "Unknown Date"}</span>
            </div>
            <h3 className="match-teams">
              {match.teamOneName || "Team A"} vs {match.teamTwoName || "Team B"}
            </h3>
            <p className="match-location">📍 {match.location || "Unknown"}</p>
            <p className="match-result">🏆 {match.result || "Pending Result"}</p>
            {match.live_streaming_link && (
              <a
                href={match.live_streaming_link}
                target="_blank"
                rel="noopener noreferrer"
                className="watch-btn"
              >
                🎥 Watch Live
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchCardList;
