import React, { useEffect, useState } from "react";
import StudentSideBar from "./StudentSideBar";
import { useParams } from "react-router-dom";
import { studentExamPaper } from "../Services/allApi";

const StudentGiveExam = () => {
    const params = useParams()
    const [giveExamQuestions, setGiveExamQuestions] = useState([]);

    useEffect(() => {
        studentExamPaper(params.id)
            .then((res) => {
                console.log(res.data.data);
                setGiveExamQuestions(res.data.data)
            }).catch((error) => {
                console.log(error);
            })
    }, [params.id])

    return (
        <>
            <div className="teacher_container">
                <div className="teacher_sidebar">
                    <StudentSideBar />
                </div>
                <div className="teacher_mainbar">
                    <h1>Student Give Exam</h1>
                    {giveExamQuestions.map((element, index) => (
                        <div key={index}>
                            <h3>Question {element._id}</h3>
                            {element.options.map((option, opIndex) => (
                                <p key={opIndex}>{option}</p>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
};

export default StudentGiveExam;
