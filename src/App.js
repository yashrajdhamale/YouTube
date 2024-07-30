import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Nav from './Components/Nav';
import Sidenav from './Components/Sidenav';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Sidenav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shorts" element={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>Shorts Page</div>} />
          <Route path="/subscription" element={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>Subscription Page</div>} />
          <Route path="/you" element={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>You Page</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
