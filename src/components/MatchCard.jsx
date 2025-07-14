import React from "react";
import { FaPlayCircle } from "react-icons/fa";

const MatchCard = ({ match }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 transition transform hover:-translate-y-1 hover:shadow-xl">
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {match.teamOneName} <span className="text-gray-500">vs</span> {match.teamTwoName}
            </h2>
            <p className="text-sm text-gray-500">
              {match.matchDate} | {match.location || "Unknown Venue"}
            </p>
          </div>
          <span className="bg-gradient-to-r from-indigo-100 to-indigo-300 text-indigo-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {match.status?.toUpperCase() || "UPCOMING"}
          </span>
        </div>

        <p className="text-gray-700 mb-3 text-sm">{match.result || "No result yet"}</p>

        {match.live_streaming_link ? (
          <a
            href={match.live_streaming_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            <FaPlayCircle className="mr-2" />
            Watch Live
          </a>
        ) : (
          <p className="text-xs text-gray-400 italic">Live stream not available</p>
        )}

        <p className="text-xs text-gray-400 mt-3">
          Updated {match.timeSinceLastUpdate || "recently"}
        </p>
      </div>
    </div>
  );
};

export default MatchCard;
