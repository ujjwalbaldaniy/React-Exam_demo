import React from "react";
import TeacherSideBar from "../Components/TeacherSideBar";

const CreateExam = () => {
    return (
        <>
            <div className="teacher_container">
                <div className="teacher_sidebar">
                    <TeacherSideBar />
                </div>
                <div className="teacher_mainbar">
                    <h1>Create Exam</h1>
                    <div className="exam_container">
                        <input type="text" placeholder="Enter Subject" />
                        <input type="text" placeholder="Enter Question" />
                    </div>
                </div>
            </div>
        </>
    )
};

export default CreateExam;