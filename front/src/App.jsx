import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme, Switch, FormControlLabel } from '@mui/material';
import BoxScene from './BoxScene';
import BoxForm from './BoxForm';
import axios from 'axios';

const App = () => {
  const [dimensions, setDimensions] = useState({ length: 1, width: 1, height: 1 });
  const [triangles, setTriangles] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({ palette: { mode: darkMode ? 'dark' : 'light' } });

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://cad-kdld.onrender.com', dimensions);
      setTriangles(response.data.triangles);
    } catch (error) {
      console.error('Error fetching triangulation data:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        {/* Левая панель с формой */}
        <Box sx={{ width: 350, padding: 2, bgcolor: darkMode ? 'grey.900' : 'grey.200' }}>
          <FormControlLabel control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />} label="Dark Mode" />
          <BoxForm dimensions={dimensions} setDimensions={setDimensions} onSubmit={handleSubmit} />
        </Box>

        {/* Правая часть — 3D сцена */}
        <Box sx={{  height: '100vh', flexGrow:1 }}>
          <BoxScene triangles={triangles} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
