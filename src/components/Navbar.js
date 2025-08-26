import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1 className="navbar-title">Car Management App</h1>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/cars">Cars</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;