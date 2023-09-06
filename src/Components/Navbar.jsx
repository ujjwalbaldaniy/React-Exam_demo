import React from "react";
import "../Styles/navbar.css"
import { Link, Outlet, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/signin')
    }
    let data = JSON.parse(localStorage.getItem("user"));

    return (
        <>
            <div className="navbar">
                <div className="logo">
                    {data && data.role === "teacher" ? <Link to="/teacherPage">Teacher Module</Link> : data && data.role === "student" ? <Link to="/studentPage">Student Module</Link> : <Link>Module</Link>}
                </div>
                {data ? <div className="logout">
                    <h2 onClick={handleLogout}>Log Out</h2>
                </div> : <div className="menu">
                    <ul>
                        <li><Link to="/signup">Sign up</Link></li>
                        <li><Link to="/signin">Sign in</Link></li>
                    </ul>
                </div>}
            </div>
            <Outlet />
        </>
    )
};

export default Navbar;
