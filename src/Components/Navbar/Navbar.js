import React from "react";
import './Navbar.css'
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={{ display: 'flex' }} className="nav-">
            <div style={{display:'flex'}}>
                <img src="https://i.pinimg.com/originals/06/78/b5/0678b5b74bcee961408b06722c371068.jpg" alt="nil" height={100} width={100} style={{paddingTop:'0px' , paddingLeft:'0px'}}/>
                <h2 style={{color:'black' , paddingTop:'20px'}}>BoBook</h2>
            </div>
            <ul className="nav--ul">
                <li>
                    <Link to="/" className="link-style" style={{ textDecoration: 'none' }}>Home</Link>
                </li>
                <li>
                    <Link to="/Login" className="link-style" style={{ textDecoration: 'none' }}>Login</Link>
                </li>
                <li>
                    <Link to="/Register" className="link-style" style={{ textDecoration: 'none' }}>Register</Link>
                </li>

            </ul>
        </nav>
    );
};

export default Navbar;
