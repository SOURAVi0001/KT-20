import React from "react";
import './scorecard.css'; // ✅ DO NOT use curly braces

const Scorecard = ({ data }) => {
  if (!data || !data.data) return <div color="black">No scorecard data available.</div>;

  const { matchInfo, innings1, innings2 } = data.data;

  const renderBatting = (battingList) => (
    <table className="table-auto w-full text-sm">
      <thead>
        <tr>
          <th className="text-left">Batter</th>
          <th>R</th>
          <th>B</th>
          <th>4s</th>
          <th>6s</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {battingList.map((batter) => (
          <tr key={batter.playerID}>
            <td>{batter.firstName} {batter.lastName}</td>
            <td>{batter.runsScored}</td>
            <td>{batter.ballsFaced}</td>
            <td>{batter.fours}</td>
            <td>{batter.sixers}</td>
            <td>{batter.outStringNoLink}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderBowling = (bowlingList) => (
    <table className="table-auto w-full text-sm mt-4">
      <thead>
        <tr>
          <th className="text-left">Bowler</th>
          <th>Runs</th>
          <th>Balls</th>
          <th>Wkts</th>
          <th>Maidens</th>
        </tr>
      </thead>
      <tbody>
        {bowlingList.map((bowler) => (
          <tr key={bowler.playerID}>
            <td>{bowler.firstName} {bowler.lastName}</td>
            <td>{bowler.runs}</td>
            <td>{bowler.balls}</td>
            <td>{bowler.wickets}</td>
            <td>{bowler.maidens}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">
        {matchInfo.teamOneName} vs {matchInfo.teamTwoName}
      </h2>

      <div className="mb-6">
        <h3 className="font-bold mb-2">{innings1.teamName} - {innings1.total}/{innings1.wickets} ({innings1.overs} overs)</h3>
        {renderBatting(innings1.batting)}
        {renderBowling(innings1.bowling)}
      </div>

      <div>
        <h3 className="font-bold mb-2">{innings2.teamName} - {innings2.total}/{innings2.wickets} ({innings2.overs} overs)</h3>
        {renderBatting(innings2.batting)}
        {renderBowling(innings2.bowling)}
      </div>
    </div>
  );
};

export default Scorecard;
