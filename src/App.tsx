import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UrlShortener from './pages/UrlShortener';
import Statistics from './pages/Statistics';
import Redirector from './pages/Redirector';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UrlShortener />} />
        <Route path="/stats" element={<Statistics />} />
        <Route path="/:shortcode" element={<Redirector />} />
      </Routes>
    </Router>
  );
}

export default App; 