import React, { useEffect, useState } from "react";
import '../Styles/createExam.css'
import { createExamPost, editExamApi, putExamDataApi } from "../Services/allApi";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import CreateExamForm from "../Components/CreateExamForm";
import createExamValidation from "../utils/validationForm";
import { examInputFieldList } from "../utils/description";
import newValidation from "../utils/newValidation";

const CreateExam = () => {
    const navigate = useNavigate()
    const location = useLocation()
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

    const { subjectName, notes } = examState
    const [examFormValidation, setExamFormValidation] = useState({
        subjectName: "",
        question: "",
        options: "",
        answer: "",
        notes: ""
    });

    const handleExamStateChange = (e) => {
        console.log(e.target);
        const { name, value } = e.target
        const error = newValidation(name, value);
        setExamFormValidation({
            ...examFormValidation,
            [name]: error,
        });
        setExamState({
            ...examState,
            [name]: value
        })
    }

    const handleActiveQuestionChange = (e) => {
        console.log(e.target);
        const { name, value } = e.target
        const error = newValidation(name, value);
        setExamFormValidation({
            ...examFormValidation,
            [name]: error,
        });
        const allQuestions = [...questions];
        allQuestions[activeQuestion].question = e.target.value;
        setQuestions(allQuestions);
    };

    const handleRadioBtnChange = (e) => {
        // debugger
        console.log(e.target);
        const updatedRadioBtnQuestions = [...questions];
        updatedRadioBtnQuestions[activeQuestion].answer = e.target.value;
        setQuestions(updatedRadioBtnQuestions);
    };

    const handlePrevious = () => {
        if (activeQuestion > 0) {
            setActiveQuestion(activeQuestion - 1)
        }
        setExamFormValidation({
            subjectName: "",
            question: "",
            options: "",
            answer: "",
            notes: ""
        })
    }

    const handleNext = () => {
        const error = createExamValidation(
            examFormValidation,
            setExamFormValidation,
            questions,
            activeQuestion,
            examState,
        );
        if (error) {
            if (activeQuestion < 14) {
                setActiveQuestion(activeQuestion + 1)
            }
        }
    }

    const examEditData = {
        subjectName: subjectName,
        questions: questions,
        notes: notes
    }

    useEffect(() => {
        if (!location.state.toggle) {
            editExamApi(location.state.id)
                .then((res) => {
                    console.log(res.data.data.questions);
                    setQuestions(res.data.data.questions)
                    setExamState(location.state)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [location.state.id, location.state, location.state.toggle])

    const examFormData = {
        subjectName: subjectName,
        questions: questions,
        notes: [notes]
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const error = createExamValidation(
            examFormValidation,
            setExamFormValidation,
            questions,
            activeQuestion,
            examState,
        );
        if (error) {
            if (location.state.toggle) {
                createExamPost(examFormData)
                    .then((res) => {
                        console.log(res);
                        if (res.data.statusCode === 500) {
                            toast.error(res.data.message)
                        } else if (res.data.statusCode === 401) {
                            toast.error(res.data.message)
                            navigate('/signin')
                        } else {
                            toast.success(res.data.message)
                            navigate('/teacher/dashboard')
                        }
                    }).catch((error) => {
                        console.log(error);
                        toast.error(error.response.data.details.body[0]?.message)
                    })
            }
            else {
                putExamDataApi(examEditData, location.state.id)
                    .then((res) => {
                        console.log(res);
                        if (res.data.statusCode === 500) {
                            toast.error(res.data.message)
                        } else {
                            toast.success(res.data.message)
                            navigate('/teacher/dashboard')
                        }
                    }).catch((error) => {
                        console.log(error);
                        toast.error(error.response.data.details.body[0]?.message)
                    })
            }
        }
    }

    const examInputList = examInputFieldList(subjectName,
        handleExamStateChange,
        activeQuestion,
        examFormValidation,
        questions,
        handleActiveQuestionChange,
        handleRadioBtnChange,
        notes)

    const buttonList = [
        {
            name: "Previous",
            disabled: activeQuestion === 0,
            onClick: handlePrevious,
        },
        {
            name: "Submit",
            disabled: activeQuestion !== 14,
            onClick: handleSubmit,
        },
        {
            name: "Next",
            disabled: activeQuestion === 14,
            onClick: handleNext,
        },
    ]

    return (
        <>
            <div className="teacher_container">
                <div className="teacher_mainbar">
                    <h1 className="title-heading">{location.state.toggle ? "Create" : "Edit"} Exam</h1>
                    <div className="exam_container">
                        <div>
                            <form>
                                <CreateExamForm examInputList={examInputList} activeQuestion={activeQuestion} questions={questions} setQuestions={setQuestions} setExamFormValidation={setExamFormValidation} examFormValidation={examFormValidation} />
                            </form>
                        </div>
                        <div className="exam-btn">
                            {buttonList.map((element, index) => (
                                <button className="table-btn" key={index} {...element}>{element.name}</button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default CreateExam;