import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Grid,
} from '@mui/material';

const SeriesDetails = ({ seriesId=13 }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSeriesDetails = async () => {
    try {
      const res = await axios.get(
        'https://core-prod-origin.cricclubs.com/core/series/getSeriesDetails',
        {
          params: {
            clubId: 17793,
            seriesId:seriesId,
            'X-Auth-Token': '',
          },
          headers: {
            'x-consumer-key': 'Kom177cc',
            'x-api-key': 'adm$ui93',
          },
        }
      );
      console.log(res)
      setDetails(res.data.data);
    } catch (err) {
      console.error('Error fetching series details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeriesDetails();
  }, [seriesId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!details) {
    return <Typography sx={{ p: 3 }}>No series details found.</Typography>;
  }

  return (
  <Box
    sx={{
      p: 4,
      mt: 4,
      background: 'linear-gradient(to right top, #e0f7fa, #ede7f6)',
      borderRadius:"10px"
    }}
  >
    <Typography
      variant="h4"
      gutterBottom
      align="center"
      sx={{
        fontWeight: 'bold',
        background: 'linear-gradient(to right, #6a1b9a, #0288d1)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        mb: 4,
      }}
    >
      📋 {details.name}
    </Typography>

    <Paper
      elevation={6}
      sx={{
        p: 4,
        maxWidth: 900,
        mx: 'auto',
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography><strong>🗓️ Start Date:</strong> {details.startDate || 'N/A'}</Typography>
          <Typography><strong>⏳ End Date:</strong> {details.endDate || 'N/A'}</Typography>
          <Typography><strong>🏷️ Type:</strong> {details.seriesType}</Typography>
          <Typography><strong>📶 Level:</strong> {details.level}</Typography>
          <Typography><strong>✅ Status:</strong> {details.status}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>🔁 Max Overs:</strong> {details.maxOvers}</Typography>
          <Typography><strong>🏏 Ball Type:</strong> {details.ballType}</Typography>
          <Typography><strong>📂 Category:</strong> {details.category}</Typography>
          <Typography><strong>🥇 Winning Points:</strong> {details.winPoints}</Typography>
          <Typography><strong>🤝 Tie Points:</strong> {details.tiePoints}</Typography>
        </Grid>
      </Grid>
    </Paper>
  </Box>
);

};

export default SeriesDetails;
