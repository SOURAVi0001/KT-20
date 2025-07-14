import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TeamsList.css';

const TeamsList = ({ clubId = 19323, seriesId = 13 }) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get(
          'https://core-prod-origin.cricclubs.com/core/team/getTeamsList',
          {
            params: { clubId, seriesId },
            headers: {
              'x-consumer-key': 'Kom177cc',
              'x-api-key': 'adm$ui93',
            },
          }
        );

        if (res.data.responseState && res.data.data?.teamsList) {
          setTeams(res.data.data.teamsList);
        } else {
          setTeams([]);
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [clubId, seriesId]);

  if (loading) return <div className="teams-container">Loading teams...</div>;
  if (!teams.length) return <div className="teams-container">No teams found.</div>;

  return (
    <div className="teams-container">
      <h2 className="section-title">Teams List</h2>
      <div className="teams-grid">
        {teams.map((team) => (
          <div key={team.teamID} className="team-card">
            <img
              src={`https://core.cricclubs.com${team.logo_file_path}`}
              alt={team.teamName}
              className="team-logo"
            />
            <h3>{team.teamName}</h3>
            <p><strong>Captain:</strong> {team.captainName}</p>
            <p><strong>Vice Captain:</strong> {team.viceCaptainName || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsList;