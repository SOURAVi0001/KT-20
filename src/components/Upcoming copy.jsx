import React, { useState, useEffect } from 'react';
import axios from 'axios'; // 
import styles from './Upcoming.module.css';

const Upcoming = () => {
  const [matches, setMatches] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/match/upcoming')
      .then(response => {
        setMatches(response.data);
      })
      .catch(error => {
        console.error('Error fetching match:', error);
      });
  }, []);

  const displayedMatches = showAll ? matches : matches.slice(0, 5);

  return (
    <div className={styles.nextMatchWrap}>
      <div className={styles.cardTop}>
        <h2>Upcoming Matches</h2>
        {displayedMatches.length > 0 ? (
          displayedMatches.map((match, index) => (
            <div key={index} className={styles.slideWrapLatest}>
              <div className={styles.matchFlex}>
                <div className={styles.team}>
                  <div className={styles.teamNameScoreLatest}>
                    <h6 className={styles.theName}>{match.team1Heading}</h6>
                    <img
                      src={`https://indiadialingai.com/kt20/wp-content/uploads/2024/07/team${index + 1}-3.png`}
                      alt={`${match.team1Heading} Logo`}
                      className={styles.teamLogo}
                    />
                  </div>
                </div>
                <div className={styles.vs}>
                  <div className={styles.live}>VS</div>
                </div>
                <div className={styles.team}>
                  <div className={styles.teamNameScoreLatest}>
                    <h6 className={styles.theName}>{match.team2Heading}</h6>
                    <img
                      src={`https://indiadialingai.com/kt20/wp-content/uploads/2024/07/team${index + 2}-3.png`}
                      alt={`${match.team2Heading} Logo`}
                      className={styles.teamLogo}
                    />
                  </div>
                </div>
              </div>
              <p className={styles.matchDetails}>
                <strong>Venue:</strong> {match.matchNumberVenue} | <strong>Date:</strong> {match.date}
              </p>
            </div>
          ))
        ) : (
          <p>Loading matches...</p>
        )}
        
        {matches.length > 5 && (
          <button className={styles.showMoreButton} onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Upcoming;
