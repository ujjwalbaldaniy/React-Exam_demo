import React from "react";
import { NavLink } from "react-router-dom";
import '../Styles/teacherSidebar.css'

const TeacherSideBar = () => {
    return (
        <>
            <div className="teacher_sidebar_menu">
                <ul>
                    <li>
                        <NavLink to='/teacherDeshboard'>DeshBoard</NavLink>
                    </li>
                    <li>
                        <NavLink to='/createExam' state={{ toggle: true }} >Create Exam</NavLink>
                    </li>
                    <li>
                        <NavLink to='/verifiedStudent'>Verified Student</NavLink>
                    </li>
                    <li>
                        <NavLink to='/teacherProfile'>Profile</NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
};

export default TeacherSideBar;
