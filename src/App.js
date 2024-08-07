import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import PlayVideo from './Components/PlayVideo';
import Nav from './Components/Nav';
import Sidenav from './Components/Sidenav';
import Search from './Components/Search';
import LoadingLine from './Components/LoadingLine';
function App() {
  const [query, setQuery] = useState(''); // Used to set the search input from the nav and pass it to the search component
  const resetQuery = () => setQuery(''); // Used to take the page to the home on clicking the home icon in the sidenav

  const [homedata, setHomedata] = useState([]); // Used to receive data from the home and search component and pass it to play video on clicking the video  
  const [darkTheme, setDarkTheme] = useState(true);

  const handleThemeToggle = (isDark) => {
    setDarkTheme(isDark);
  };

  return (
    <Router>
      <div className={`App ${darkTheme ? 'dark' : ''}`}>
        <LoadingLine />
        <Nav setQuery={setQuery} onThemeToggle={handleThemeToggle} />
        
        <Sidenav resetQuery={resetQuery} darkTheme={darkTheme} />
        <Routes>
          <Route path="/YouTube" element={<Home setHomedata={setHomedata} darkTheme={darkTheme} />} />
          <Route path="/Search" element={<Search query={query} setHomedata={setHomedata} darkTheme={darkTheme} />} />
          <Route path="/play/:videoId" element={<PlayVideo homedata={homedata} darkTheme={darkTheme} />} />
          <Route path="/shorts" element={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>Shorts Page</div>} />
          <Route path="/subscription" element={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>Subscription Page</div>} />
          <Route path="/you" element={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>You Page</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
