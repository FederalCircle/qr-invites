import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RoutePaths from '@/enums/RoutePaths';
import HomePage from '@/pages/HomePage/HomePage';
import ScanPage from '@/pages/ScanPage/ScanPage';
import ListPage from '@/pages/ListPage/ListPage';

import '@/App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={RoutePaths.homePage}>
            <Route index element={<HomePage />} />
            <Route path={RoutePaths.scanPage} element={<ScanPage />} />
            <Route path={RoutePaths.listPage} element={<ListPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
