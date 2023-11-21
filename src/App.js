import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Congress from './Congress';
import Parliament from './Parliament';
import NotFound from './NotFound'; //Import NotFound component for handling unknown routes

const basename = process.env.REACT_APP_BASENAME || '/';

//so here BrowserRouter is set up as the main router, theres multiple routes with two routes being nested and the error handling in case path is not valid ie 404s
function App() { // added error handling component
  return (
    <div className="App">
      <Router basename={basename}>
        <Routes>
          <Route path="/API-app" element={<Homepage />} />
          <Route path="/API-app/congress" element={<Congress />} />
          <Route path="/API-app/parliament" element={<Parliament />} />
          <Route path="*" element={<NotFound/>} /> {} 
        </Routes>
      </Router>
    </div>
  );
}

export default App;