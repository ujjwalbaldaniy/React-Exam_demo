import React, { useState } from "react";
import '../Styles/teacherDeshboard.css'
import TeacherSideBar from "../Components/TeacherSideBar";

const TeacherDeshboard = () => {
    return (
        <>
            <div className="teacher_container">
                <div className="teacher_sidebar">
                    <TeacherSideBar />
                </div>
                <div className="teacher_mainbar">
                    <h1>Teacher Deshboard</h1>
                </div>
            </div>
        </>
    )
};

export default TeacherDeshboard;
