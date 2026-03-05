import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Listings from './pages/Listings';
import Map from './pages/Map';
import Match from './pages/Match';
import './App.css';

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" end className="navbar-brand">
        <img src="/replaylaLOGO.png" alt="RePlay LA" className="navbar-logo" />
        <span className="navbar-brand-text">RePlay LA</span>
      </NavLink>
      <div className="navbar-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/listings">Listings</NavLink>
        <NavLink to="/map">Map</NavLink>
        <NavLink to="/match">Match</NavLink>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/map" element={<Map />} />
        <Route path="/match" element={<Match />} />
      </Routes>
    </BrowserRouter>
  );
}
