import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LiveMatches.css";

const LiveMatches = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios
      .get("https://core-prod-origin.cricclubs.com/core/match/getMatches", {
        params: {
          "X-AuthToken": "",
          clubId: 17793,
          seriesId: "",
          teamId: "",
          limit: 10,
        },headers: {
          'x-consumer-key': 'Kom177cc',
          'x-api-key': 'adm$ui93',
        },
      })
      .then((response) => {
        const liveMatches = response.data.data?.filter(
          (match) => match.matchState === "Live"
        );
        setMatches(liveMatches || []);
      })
      .catch((error) => {
        console.error("Failed to fetch matches:", error);
        setMatches([]);
      });
  }, []);

  if (!matches || matches.length === 0) {
    return <p className="no-matches">No live matches available.</p>;
  }

  return (
    <div className="container">
      <h1 className="title">Live Matches</h1>
      <div className="card-grid">
        {matches.map((match) => (
          <div key={match.matchId} className="card">
            <h2 className="match-title">
              {match.teamOneName} vs {match.teamTwoName}
            </h2>
            <p className="series-name">{match.seriesName}</p>
            <p className="match-date">📅 {match.matchDate}</p>
            <p className="result">{match.result}</p>
            {match.location && (
              <p className="location">📍 {match.location}</p>
            )}
            <p className="updated">⏱️ {match.timeSinceLastUpdate}</p>
            {match.live_streaming_link && (
              <a
                href={match.live_streaming_link}
                target="_blank"
                rel="noopener noreferrer"
                className="watch-link"
              >
                ▶️ Watch Live
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveMatches;
