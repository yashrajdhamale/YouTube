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

  const [query, setQuery] = useState(''); // used the set the search input from the nav and pass it to the search component
  const resetQuery = () => setQuery(''); // used to take the page to the home on clicking to the home icon in the sidenav
  
  const [homedata, setHomedata] = useState([]); // used to receive data from the home and search component and pass 
                                                //it to play video on clicking the video  

  return (

    <Router>
      <div className="App">
        <LoadingLine/>
        <Nav setQuery={setQuery} />
        <Sidenav resetQuery={resetQuery} />
        <Routes>
          <Route path="/YouTube" element={<Home setHomedata={setHomedata} />} />
          <Route path="/Search" element={<Search query={query} setHomedata={setHomedata} />} />
          <Route path="/play/:videoId" element={<PlayVideo homedata={homedata} />} />
          <Route path="/shorts" element={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>Shorts Page</div>}/>
          <Route path="/subscription" element={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>Subscription Page</div>} />
          <Route path="/you" element={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>You Page</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
