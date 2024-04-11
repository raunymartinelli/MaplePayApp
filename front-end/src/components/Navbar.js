import React from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css'; // Import CSS for Navbar styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Logo</Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/wallet">Home</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                {/* Add more navigation links as needed */}
                <li className="dropdown">
                    <span className="dropdown-button">Dropdown</span>
                    <div className="dropdown-content">
                        <Link to="/settings">Settings</Link>
                        <Link to="/logout">Logout</Link>
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
