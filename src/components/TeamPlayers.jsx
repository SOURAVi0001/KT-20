import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TeamPlayers.css';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const TeamPlayers = ({ clubId = 19323, teamId = 178 }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await axios.get('https://core-prod-origin.cricclubs.com/core/team/getTeamPlayers', {
          params: { clubId, teamId },
          headers: {
            'x-consumer-key': 'Kom177cc',
            'x-api-key': 'adm$ui93',
          },
        });

        if (res.data.responseState && res.data.data?.teamPlayers) {
          setPlayers(res.data.data.teamPlayers);
        }
      } catch (error) {
        console.error('Error fetching team players:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [clubId, teamId]);

  if (loading) return <div className="players-container">Loading players...</div>;
  if (!players.length) return <div className="players-container">No players found.</div>;

  return (
    <div className="players-container">
      <h2>Team Players</h2>
      <div className="players-grid">
        {players.map((player) => {
          const imageUrl = player.profilepic_file_path
            ? `https://core.cricclubs.com${player.profilepic_file_path}`
            : 'https://via.placeholder.com/80x80.png?text=No+Image';

          return (
            <div
              key={player.playerID}
              className="player-card-new"
              onClick={() => setSelectedPlayer({ ...player, imageUrl })}
            >
              <div
                className="player-banner"
                style={{ backgroundImage: `url(${imageUrl})` }}
              >
                <img className="player-avatar" src={imageUrl} alt={player.firstName} />
              </div>
              <div className="player-info">
                <h4>{player.firstName} {player.lastName}</h4>
                <p>{player.playingRole || 'N/A'}</p>
              </div>
            </div>
          );
        })}
      </div>

      <Modal open={!!selectedPlayer} onClose={() => setSelectedPlayer(null)}>
        <Box className="player-modal">
          <IconButton sx={{ position: 'absolute', top: 8, right: 8 }} onClick={() => setSelectedPlayer(null)}>
            <CloseIcon />
          </IconButton>
          {selectedPlayer && (
            <>
              <img className="modal-avatar" src={selectedPlayer.imageUrl} alt={selectedPlayer.firstName} />
              <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
                {selectedPlayer.firstName} {selectedPlayer.lastName}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1, color: 'gray' }}>
                {selectedPlayer.playingRole || 'Role not specified'}
              </Typography>
              <Typography variant="body2">
                Batting Style: {selectedPlayer.battingStyle || 'N/A'} <br />
                Bowling Style: {selectedPlayer.bowlingStyle || 'N/A'} <br />
                Jersey No: {selectedPlayer.jerseyNumber || 'N/A'}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default TeamPlayers;
