import React from "react";
import "../Styles/navbar.css"
import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <>
            <div className="navbar">
                <div className="logo">
                    <Link to="/">Exam</Link>
                </div>
                <div className="menu">
                    <ul>
                        <li><Link to="/signup">Sign up</Link></li>
                        <li><Link to="/signin">Sign in</Link></li>
                    </ul>
                </div>
                <div className="logout">
                    <h2>Log Out</h2>
                </div>
            </div>
        </>
    )
};

export default Navbar;
