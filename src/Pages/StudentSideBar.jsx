import React from "react";
import { NavLink } from "react-router-dom";
import '../Styles/teacherSidebar.css'

const StudentSideBar = () => {
    return (
        <>
            <div className="teacher_sidebar_menu">
                <ul>
                    <li>
                        <NavLink to='/studentDashboard'>DashBoard</NavLink>
                    </li>
                    <li>
                        <NavLink to='/studentProfile'>Profile</NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
};

export default StudentSideBar;
