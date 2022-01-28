import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

import RoutePaths from '@/enums/RoutePaths';
import HomePage from '@/pages/HomePage/HomePage';
import ScanPage from '@/pages/ScanPage/ScanPage';
import ListPage from '@/pages/ListPage/ListPage';
import DevPage from './pages/DevPage/DevPage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path={RoutePaths.homePage}>
            <Route index element={<HomePage />} />
            <Route path={RoutePaths.scanPage} element={<ScanPage />} />
            <Route path={RoutePaths.listPage} element={<ListPage />} />
            <Route path={RoutePaths.devPage} element={<DevPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
