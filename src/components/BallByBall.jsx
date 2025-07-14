import  { useEffect, useState } from "react";
import axios from "axios";
import './BallByBall.css';  // must match the actual file name exactly

const BallByBall = () => {
  const [ballData, setBallData] = useState(null);

  useEffect(() => {
    axios.get("https://core-prod-origin.cricclubs.com/core/scoreCard/getBallByBall", {
      params: {
        matchId: 238,
        clubId: 17793
      },headers: {
          'x-consumer-key': 'Kom177cc',
          'x-api-key': 'adm$ui93',
        }
    }).then((res) => {
      setBallData(res.data.data);
    });
  }, []);

  if (!ballData) return <div className="status">Loading ball-by-ball data...</div>;

  const { innings1Balls } = ballData;

  const renderBallCommentary = () => {
    const overs = innings1Balls?.oversMap || {};
    const overEntries = Object.entries(overs).sort(
      ([a], [b]) => parseInt(b.replace("Over", "")) - parseInt(a.replace("Over", ""))
    );

    return overEntries.map(([overKey, overData]) => (
      <div key={overKey} className="over-block">
        <div className="over-header">
          Over {overData.overNum}: {overData.bowlerName}
        </div>
        {overData.balls
          .slice()
          .reverse()
          .map((ball, i) => (
            <div key={i} className="ball-commentary">
              <span className="ball-tag">Ball {ball.over}.{ball.ball}:</span>{" "}
              {ball.commentary}
            </div>
          ))}
      </div>
    ));
  };

  return (
    <div className="ball-by-ball-container">
      <h2 className="title">Ball-by-Ball Commentary</h2>

      <div className="score-header">
        <img src={innings1Balls.teamLogoPath} alt="Team Logo" className="team-logo" />
        <div>
          <h3>{innings1Balls.teamName}</h3>
          <p>{innings1Balls.rcb} ({innings1Balls.overs} overs)</p>
        </div>
      </div>

      <div className="commentary-section">{renderBallCommentary()}</div>
    </div>
  );
};

export default BallByBall;
