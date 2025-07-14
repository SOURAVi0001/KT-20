// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from './logo.png';

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo items-center flex "><img src={logo} alt='logo' className='logo1'/>Cricket League</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <a href="#match">Match</a>
        <a href="#gallery">Gallery</a>
        <a href="#point-table">Point Table</a>
        <Link to="/login">Admin Login</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
}

export default Navbar;
