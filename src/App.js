import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import PlayVideo from './Components/PlayVideo';
import Nav from './Components/Nav';
import Sidenav from './Components/Sidenav';

function App() {
  const [query, setQuery] = useState('');
  const resetQuery = () => setQuery('');

  const [homedata, setHomedata] = useState([]);

  return (
    <Router>
      <div className="App">
        <Nav setQuery={setQuery} />
        <Sidenav resetQuery={resetQuery} />
        <Routes>
          <Route path="/YouTube" element={<Home query={query} setHomedata={setHomedata} />} />
          <Route path="/play/:videoId" element={<PlayVideo homedata={homedata} />} />
          <Route path="/shorts" element={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>Shorts Page</div>} />
          <Route path="/subscription" element={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>Subscription Page</div>} />
          <Route path="/you" element={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>You Page</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
