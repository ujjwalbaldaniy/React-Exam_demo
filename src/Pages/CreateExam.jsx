import React, { useState } from "react";
import TeacherSideBar from "../Components/TeacherSideBar";
import '../Styles/createExam.css'

const mainObj = {
    subjectName: "",
    questions: [
        {
            question: "",
            answer: "",
            options: [
                "",
                "",
                "",
                ""
            ]
        },
        {
            question: "",
            answer: "",
            options: [
                "",
                "",
                "",
                ""
            ]
        },
        {
            question: "",
            answer: "",
            options: [
                "",
                "",
                "",
                ""
            ]
        },
        {
            question: "",
            answer: "",
            options: [
                "",
                "",
                "",
                ""
            ]
        },
        {
            question: "",
            answer: "",
            options: [
                "",
                "",
                "",
                ""
            ]
        },
        {
            question: "",
            answer: "",
            options: [
                "",
                "",
                "",
                ""
            ]
        },
        {
            question: "",
            answer: "",
            options: [
                "",
                "",
                "",
                ""
            ]
        },
        {
            question: "",
            answer: "",
            options: [
                "",
                "",
                "",
                ""
            ]
        },
        {
            question: "",
            answer: "",
            options: [
                "",
                "",
                "",
                ""
            ]
        },
        {
            question: "",
            answer: "",
            options: [
                "",
                "",
                "",
                ""
            ]
        },
        {
            question: "",
            answer: "",
            options: [
                "",
                "",
                "",
                ""
            ]
        },
        {
            question: "",
            answer: "",
            options: [
                "",
                "",
                "",
                ""
            ]
        },
        {
            question: "",
            answer: "",
            options: [
                "",
                "",
                "",
                ""
            ]
        },
        {
            question: "",
            answer: "",
            options: [
                "",
                "",
                "",
                ""
            ]
        },
        {
            question: "",
            answer: "",
            options: [
                "",
                "",
                "",
                ""
            ]
        },

    ],
    notes: []
}

const CreateExam = () => {

    const [quesForm, setQuesForm] = useState({
        subjectName: ""
    });

    const createExamSubmit = (e) => {
        e.preventDefault()
    }
    
    return (
        <>
            <div className="teacher_container">
                <div className="teacher_sidebar">
                    <TeacherSideBar />
                </div>
                <div className="teacher_mainbar">
                    <h1>Create Exam</h1>
                    <div className="exam_container">
                        <form onSubmit={createExamSubmit}>
                            {Object.entries(mainObj).map(([key, value], index) => {
                                console.log(`key = ${key} , value = ${value}, index= ${index}`);
                                return (
                                    <div key={index}>
                                        <label>{key}</label>
                                        <input type="text" placeholder={quesForm?.[key]} name={mainObj?.[key]} value={mainObj?.[key]} />
                                    </div>
                                )
                            })}

                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default CreateExam;