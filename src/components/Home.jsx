import React from 'react';
import Livescore from './Livescore';
import Gallery from './Gallery';
import Navbar from './Nav';
import Polling from './Polling';
import AnimationLogo from './AnimatedLogo';
import Sliding from './Sliding';
import Footer from './Footer';
import Fixtures from './Fixtures';
import LiveScoreCard from './LiveScoreCard';
import BallByBall from './BallByBall';
import SeriesList from './SeriesList';
import SeriesDetails from './SeriesDetails';
import TeamsList from './TeamsList';
import TeamPlayers from './TeamPlayers';
import MatchCardList from './MatchCardList';
import { Box, Typography } from '@mui/material';
import "./home.css"

function Home() {
  return (
    <div className="home">
    <Box sx={{ background: 'rgb(11, 2, 56)', width:"100%" }}>
      <AnimationLogo />
      <Navbar />
      <Box className="home-sections" sx={{ pt: 2 }}>
        
        <Box id="home" sx={{ mb: 4 }}>
          <Sliding />
        </Box>

        <Box
          id="match"
          sx={{
            display: 'flex',
            gap: 4,
            flexWrap: 'wrap',
            mb: 6,
            px: 4,
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ flex: 1, minWidth: '300px' }}>
            {/* <Typography variant="h5" gutterBottom>Live Score</Typography> */}
            <Livescore />
          </Box>
        </Box>

        <Box id="upcoming" sx={{ mb: 6, px: 4 }}>
          {/* <Typography variant="h5" gutterBottom>Upcoming Fixtures</Typography> */}
          <Fixtures />
        </Box>

        <Box sx={{ mb: 6, px: 4 }}>
          {/* <Typography variant="h5" gutterBottom>Today's Matches</Typography> */}
          <MatchCardList />
        </Box>

        <Box sx={{ mb: 6, px: 4 }}>
          {/* <Typography variant="h5" gutterBottom>Live Score Card</Typography> */}
          <LiveScoreCard matchId={950} />
        </Box>

        <Box sx={{ mb: 6, px: 4 }}>
          {/* <Typography variant="h5" gutterBottom>Ball By Ball</Typography> */}
          <BallByBall />
        </Box>

        <Box sx={{ mb: 6, px: 4 }}>
          {/* <Typography variant="h5" gutterBottom>Series List</Typography> */}
          <SeriesList />
        </Box>

        <Box sx={{ mb: 6, px: 4 }}>
          {/* <Typography variant="h5" gutterBottom>Series Details</Typography> */}
          <SeriesDetails />
        </Box>

        <Box sx={{ mb: 6, px: 4 }}>
          {/* <Typography variant="h5" gutterBottom>Teams</Typography> */}
          <TeamsList />
        </Box>

        <Box sx={{ mb: 6, px: 4 }}>
          {/* <Typography variant="h5" gutterBottom>Team Players</Typography> */}
          <TeamPlayers />
        </Box>

        <Box id="gallery" sx={{ mb: 6, px: 4 }}>
          {/* <Typography variant="h5" gutterBottom>Gallery</Typography> */}
          <Gallery />
        </Box>
      </Box>
      <Footer />
    </Box>
    </div>
  );
}

export default Home;
