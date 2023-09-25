import React from "react";
import { NavLink } from "react-router-dom";
import '../Styles/teacherSidebar.css'

const TeacherSideBar = () => {
    return (
        <>
            <div className="teacher_sidebar_menu">
                <ul>
                    <li>
                        <NavLink to='/teacher/dashboard'>DashBoard</NavLink>
                    </li>
                    <li>
                        <NavLink to='/teacher/createExam' state={{ toggle: true }} >Create Exam</NavLink>
                    </li>
                    <li>
                        <NavLink to='/teacher/verifiedStudent'>Verified Student</NavLink>
                    </li>
                    <li>
                        <NavLink to='/teacher/profile'>Profile</NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
};

export default TeacherSideBar;
