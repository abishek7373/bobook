import React from "react";
import './Navbar.css';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Navbar = () => {
    const isLogged = useSelector(state => state.auth.isLogged);

    return (
        <nav className="navbar-container">
            <div style={{ display: 'flex' }}>
                <img src="https://i.pinimg.com/originals/06/78/b5/0678b5b74bcee961408b06722c371068.jpg" alt="nil" height={100} width={100} style={{ paddingTop: '0px', paddingLeft: '0px' }} />
                <h2 style={{ color: 'black', paddingTop: '20px' }}>BoBook</h2>
            </div>
            <ul className="navbar-ul">
                <li>
                    <Link to="/" className="navbar-link" style={{ textDecoration: 'none' }}>Home</Link>
                </li>
                {isLogged ? (
                    <li><Link to="/profile" className="navbar-link" style={{ textDecoration: 'none' }}><img src="/img/user.png" alt="profile" style={{ width: '30px', height: '30px' }} /></Link></li>
                ) : (
                    <li><Link to="/login" className="navbar-link" style={{ textDecoration: 'none' }}>Login</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
