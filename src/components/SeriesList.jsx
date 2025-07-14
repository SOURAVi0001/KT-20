import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';

const SeriesList = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSeries = async () => {
    try {
      const res = await axios.get(
        'https://core-prod-origin.cricclubs.com/core/series/getSeriesList',
        {
          params: {
            clubId: 17793,
            limit: 50,
          },
          headers: {
            'x-consumer-key': 'Kom177cc',
            'x-api-key': 'adm$ui93',
          },
        }
      );
      setSeries(res.data.data.seriesList || []);
    } catch (err) {
      console.error('Error fetching series:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  const buildHierarchy = () => {
    const map = {};
    series.forEach((item) => {
      map[item.seriesID] = { ...item, children: [] };
    });

    const tree = [];
    series.forEach((item) => {
      if (item.parentSeriesId && map[item.parentSeriesId]) {
        map[item.parentSeriesId].children.push(map[item.seriesID]);
      } else {
        tree.push(map[item.seriesID]);
      }
    });

    return tree;
  };

  const renderSeries = (nodes) =>
    nodes.map((node) => (
      <Accordion
        key={node.seriesID}
        sx={{
          mb: 2,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: node.children.length > 0 ? 'rgba(255,255,255,0.85)' : '#f5f5f5',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: 6,
            transform: 'scale(1.01)',
          },
          '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(180deg)',
          },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 'bold', color: '#4a148c' }}>
            {node.seriesName} ({node.seriesType || 'Type N/A'}) - {node.level || 'Level N/A'}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {node.children.length > 0 ? (
            renderSeries(node.children)
          ) : (
            <Typography
              sx={{
                pl: 2,
                fontStyle: 'italic',
                color: 'text.secondary',
              }}
            >
              No divisions
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
    ));

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4 },
        py: 4,
        background: "linear-gradient(45deg, #cf2929, #2a5298, #cf2929)",
        borderRadius:"10px"
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: 'center',
          fontWeight: 800,
          fontSize: { xs: '1.8rem', sm: '2.5rem' },
          background: 'linear-gradient(to right, #7b1fa2, #0288d1)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4,
        }}
      >
        <SportsCricketIcon sx={{ mr: 1 }} />
        CricClubs Series List
      </Typography>

      {renderSeries(buildHierarchy())}
    </Box>
  );
};

export default SeriesList;
