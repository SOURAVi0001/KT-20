import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './LiveScoreCard.module.css';

const LiveScoreCard = ({ matchId = 250 }) => {
  const [scoreData, setScoreData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScoreCard = async () => {
      try {
        const res = await axios.get(
          'https://core-prod-origin.cricclubs.com/core/scoreCard/getScoreCard',
          {
            params: {
              matchId: 955,
              clubId: 17793,
            },
            headers: {
              'x-consumer-key': 'Kom177cc',
              'x-api-key': 'adm$ui93',
            },
          }
        );
        setScoreData(res.data.data);
      } catch (error) {
        console.error('Error fetching scorecard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScoreCard();
  }, [matchId]);

  const renderTable = (headers, rows, type) => (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={type === 'bat' ? styles.batHeader : styles.bowlHeader}>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((player, index) => (
            <tr key={player.playerID || index} className={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
              <td>{player.firstName} {player.lastName}</td>
              {type === 'bat' ? (
                <>
                  <td>{player.runsScored}</td>
                  <td>{player.ballsFaced}</td>
                  <td>{player.fours}</td>
                  <td>{player.sixers}</td>
                  <td><i>{player.outStringNoLink}</i></td>
                </>
              ) : (
                <>
                  <td>{player.balls}</td>
                  <td>{player.runs}</td>
                  <td>{player.wickets}</td>
                  <td>{player.maidens}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (loading) return <div className={styles.loading}>Loading scorecard...</div>;
  if (!scoreData) return <div className={styles.error}>No scorecard data available</div>;

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>
        {scoreData.matchInfo.teamOneName} vs {scoreData.matchInfo.teamTwoName}
      </h2>

      {scoreData.innings1 && (
        <>
          <h3 className={styles.heading}>
            🏏 Innings 1 – <span>{scoreData.innings1.teamName}</span>
          </h3>
          {renderTable(['Player', 'Runs', 'Balls', '4s', '6s', 'Status'], scoreData.innings1.batting || [], 'bat')}
          {renderTable(['Bowler', 'Balls', 'Runs', 'Wickets', 'Maidens'], scoreData.innings1.bowling || [], 'bowl')}
        </>
      )}

      {scoreData.innings2 && (
        <>
          <h3 className={styles.heading}>
            🏏 Innings 2 – <span>{scoreData.innings2.teamName}</span>
          </h3>
          {renderTable(['Player', 'Runs', 'Balls', '4s', '6s', 'Status'], scoreData.innings2.batting || [], 'bat')}
          {renderTable(['Bowler', 'Balls', 'Runs', 'Wickets', 'Maidens'], scoreData.innings2.bowling || [], 'bowl')}
        </>
      )}
    </div>
  );
};

export default LiveScoreCard;
