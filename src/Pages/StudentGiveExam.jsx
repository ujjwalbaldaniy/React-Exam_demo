import React, { useEffect, useState } from "react";
import StudentSideBar from "./StudentSideBar";
import { useNavigate, useParams } from "react-router-dom";
import { postGiveExam, studentExamPaper } from "../Services/allApi";
import StudentGiveExamForm from "./StudentGiveExamForm";
import Loader from "../Components/Loader";
import { toast } from "react-toastify";
import '../Styles/studentGiveExam.css'

const StudentGiveExam = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [questions, setQuestions] = useState([]);
    const [selectRadioBtnAnswer, setSelectRadioBtnAnswer] = useState(Array(7).fill(""));
    const [toggle, setToggle] = useState(true);
    const [newQuestionData, setNewQuestionData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        studentExamPaper(params.id)
            .then((res) => {
                setQuestions(res.data.data)
                setLoading(false)
            }).catch((error) => {
                console.log(error);
            })
    }, [params.id])

    const handleRadioBtnChange = (e) => {
        const updatedRadioBtnQuestions = [...questions];
        updatedRadioBtnQuestions[activeQuestion].answer = e.target.value;
        setQuestions(updatedRadioBtnQuestions);

        //for answer update
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
        e.preventDefault()
        console.log(questions)
        const aaa = questions.map((element, index) => ({
            question: element._id,
            answer: element.answer
        }))
        console.log("aaaa", aaa);

        postGiveExam(params.id, aaa)
            .then((res) => {
                console.log(res);
                toast.success(res.data.message)
                navigate('/studentDashboard')
            }).catch((error) => {
                console.log(error);
            })
    }

    const handlePreview = () => {
        setToggle(false)
        const aaa = questions.map((element, index) => ({
            question: element.question,
            answer: element.answer
        }))
        setNewQuestionData(aaa);
        localStorage.setItem("7Question", JSON.stringify(questions))
    }

    const editIndex = (id) => {
        console.log(id);
        setActiveQuestion(id)
        setToggle(true)
        const storeQuestionData = JSON.parse(localStorage.getItem("7Question"));
        setQuestions([...storeQuestionData])
    }

    const examInputList = [
        {
            label: "Question :- ",
            type: "text",
            value: questions[activeQuestion]?.question,
            readOnly: true,
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
    ];

    const buttonList = [
        {
            name: "Previous",
            disabled: activeQuestion === 0,
            onClick: handlePrevious,
        },
        {
            name: "Preview",
            disabled: activeQuestion !== 6,
            onClick: handlePreview,
        },
        {
            name: "Next",
            disabled: activeQuestion === 6,
            onClick: handleNext,
        },
    ]

    return (
        <>
            <div className="teacher_container">
                <div className="teacher_sidebar">
                    <StudentSideBar />
                </div>
                {loading ? <Loader /> : (
                    <div className="teacher_mainbar">
                        {toggle ? (
                            <>
                                <h1 className="title-heading">Student Give Exam</h1>
                                <div className="exam_container">
                                    <h3>Question {activeQuestion + 1}</h3>
                                    <div>
                                        <StudentGiveExamForm examInputList={examInputList} activeQuestion={activeQuestion} questions={questions} />
                                    </div>
                                    <div>
                                        {buttonList.map((element, index) => (
                                            <button key={index} {...element}>{element.name}</button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <h1 className="title-heading">Preview your Exam</h1>
                                {newQuestionData.length && newQuestionData.map((data, index) => {
                                    console.log(data);

                                    return (
                                        <div key={index} className="give_exam-div">
                                            <div className="give_exam-ques">
                                                <h3>{data.question}</h3>
                                                <p>{data.answer}</p>
                                            </div>
                                            <div>
                                                <button className="submit-btn" onClick={() => editIndex(index)}>Edit</button>
                                            </div>
                                        </div>
                                    );
                                })}
                                <button className="login_btn" onClick={handleSubmit}>Submit</button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </>
    )
};

export default StudentGiveExam;
