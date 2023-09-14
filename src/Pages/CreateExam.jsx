import React, { useState } from "react";
import TeacherSideBar from "../Components/TeacherSideBar";
import '../Styles/createExam.css'

const CreateExam = () => {
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [examState, setExamState] = useState({
        subjectName: "",
        notes: "",
    })
    const [questions, setQuestions] = useState(Array.from({ length: 15 }, () => ({
        question: "",
        answer: "",
        options: ["", "", "", ""],
    })));
    const [selectRadioBtnAnswer, setSelectRadioBtnAnswer] = useState(Array(15).fill(""));

    const handleExamStateChange = (e) => {
        const { name, value } = e.target
        setExamState({
            ...examState,
            [name]: value
        })
    }

    const handleActiveQuestionChange = (e) => {
        const allQuestions = [...questions];
        allQuestions[activeQuestion].question = e.target.value;
        setQuestions(allQuestions);
    };

    const handleRadioBtnChange = (e) => {
        const updatedRadioBtnQuestions = [...questions];
        updatedRadioBtnQuestions[activeQuestion].answer = e.target.value;
        setQuestions(updatedRadioBtnQuestions);

        const selectedAnswersField = [...selectRadioBtnAnswer];
        selectedAnswersField[activeQuestion] = e.target.value;
        setSelectRadioBtnAnswer(selectedAnswersField);
    };

    const handlePrevious = () => {
        if (activeQuestion > 0) {
            setActiveQuestion(activeQuestion - 1)
        }
    }

    const handleNext = () => {
        if (activeQuestion < 14) {
            setActiveQuestion(activeQuestion + 1)
        }
    }

    const handleSubmit = (e) => {
        console.log("submit");
        e.preventDefault()
        console.log(examState, questions);
    }

    const examInputList = [
        {
            label: "Subject Name :- ",
            type: "text",
            name: "subjectName",
            placeholder: "enter subject name",
            value: examState.subjectName,
            onChange: handleExamStateChange,
            disabled: activeQuestion !== 0,
        },
        {
            label: "Question :- ",
            type: "text",
            placeholder: "enter your question",
            value: questions[activeQuestion]?.question,
            onChange: handleActiveQuestionChange,
        },
        {
            label: "Answers :- ",
            type: "radio",
            options: questions[activeQuestion]?.options,
            onChange: handleRadioBtnChange,
            answer: questions[activeQuestion]?.answer,
        },
        {
            label: "Answer :- ",
            type: "text",
            placeholder: "answer",
            value: selectRadioBtnAnswer[activeQuestion],
            readOnly: true,
        },
        {
            label: "Notes :- ",
            type: "text",
            name: "notes",
            placeholder: "notes",
            onChange: handleExamStateChange,
            value: examState.notes,
            disabled: activeQuestion !== 0,
            // readOnly: true,
        },
    ];

    return (
        <>
            <div className="teacher_container">
                <div className="teacher_sidebar">
                    <TeacherSideBar />
                </div>
                <div className="teacher_mainbar">
                    <h1>Create Exam</h1>
                    <div className="exam_container">
                        <h3>Question {activeQuestion + 1}</h3>
                        <div>
                            <form>
                                {examInputList.map((input, index) => (
                                    <div key={index}>
                                        <label>{input.label}</label>
                                        {input.type === "radio" ? (
                                            <div>
                                                {input.options.map((option, optionIndex) => {
                                                    console.log(option, optionIndex);

                                                    return (
                                                        <div key={optionIndex}>
                                                            <input
                                                                type={input.type}
                                                                name={`question${activeQuestion}`}
                                                                value={option}
                                                                checked={input.answer === option}
                                                                onChange={input.onChange}
                                                            />
                                                            <input
                                                                type="text"
                                                                placeholder={`Option ${optionIndex + 1}`}
                                                                value={option}
                                                                onChange={(e) => {
                                                                    const updatedQuestions = [...questions];
                                                                    updatedQuestions[activeQuestion].options[optionIndex] = e.target.value;
                                                                    setQuestions(updatedQuestions);
                                                                }}
                                                            />
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        ) : (
                                            <div >
                                                <input {...input} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </form>
                        </div>

                        <div>
                            <button disabled={activeQuestion === 0} onClick={handlePrevious}>Previous</button>
                            <button disabled={activeQuestion !== 14} onClick={handleSubmit}>Submit</button>
                            <button disabled={activeQuestion === 14} onClick={handleNext}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default CreateExam;