import React, { useEffect, useState } from "react";
import TeacherSideBar from "../Components/TeacherSideBar";
import '../Styles/createExam.css'
import { createExamPost, editExamApi, putExamDataApi } from "../Services/allApi";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import CreateExamForm from "../Components/CreateExamForm";
import createExamValidation from "../utils/createExamValidation";

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
    const [selectRadioBtnAnswer, setSelectRadioBtnAnswer] = useState(Array(15).fill(""));
    const { subjectName, notes } = examState
    const [examFormValidation, setExamFormValidation] = useState({
        subjectName: "",
        question: "",
        options: "",
        answer: "",
        notes: ""
    });

    const handleExamStateChange = (e) => {
        const { name, value } = e.target
        setExamFormValidation({
            ...examFormValidation,
            [name]: "",
        });
        setExamState({
            ...examState,
            [name]: value
        })
    }

    const handleActiveQuestionChange = (e) => {
        const allQuestions = [...questions];
        allQuestions[activeQuestion].question = e.target.value;
        setQuestions(allQuestions);
        setExamFormValidation({
            ...examFormValidation,
            question: "",
        });
    };

    const handleRadioBtnChange = (e) => {
        const updatedRadioBtnQuestions = [...questions];
        updatedRadioBtnQuestions[activeQuestion].answer = e.target.value;
        setQuestions(updatedRadioBtnQuestions);

        //for answer update
        const selectedAnswersField = [...selectRadioBtnAnswer];
        selectedAnswersField[activeQuestion] = e.target.value;
        setSelectRadioBtnAnswer(selectedAnswersField);
        setExamFormValidation({
            ...examFormValidation,
            answer: "",
        });
    };

    const handlePrevious = () => {
        if (activeQuestion > 0) {
            setActiveQuestion(activeQuestion - 1)
        }
    }

    const handleNext = () => {
        const error = createExamValidation(
            examFormValidation,
            setExamFormValidation,
            questions,
            activeQuestion,
            examState,
            selectRadioBtnAnswer
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
                    setSelectRadioBtnAnswer(res.data.data.questions.map((item) => item.answer))
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
            selectRadioBtnAnswer
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
                            navigate('/teacherDashboard')
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
                            navigate('/teacherDashboard')
                        }
                    }).catch((error) => {
                        console.log(error);
                        toast.error(error.response.data.details.body[0]?.message)
                    })
            }
        }
    }

    const examInputList = [
        {
            label: "Subject Name :- ",
            type: "text",
            name: "subjectName",
            placeholder: "Subject name",
            value: subjectName,
            onChange: handleExamStateChange,
            disabled: activeQuestion !== 0,
            showerrors: examFormValidation.subjectName
        },
        {
            label: "Question :- ",
            type: "text",
            placeholder: "Question name",
            value: questions[activeQuestion]?.question,
            onChange: handleActiveQuestionChange,
            showerrors: examFormValidation.question,
        },
        {
            label: "Options :- ",
            type: "radio",
            options: questions[activeQuestion]?.options,
            onChange: handleRadioBtnChange,
            answer: questions[activeQuestion]?.answer,
            showerrors: examFormValidation.options,
        },
        {
            label: "Answer :- ",
            type: "text",
            placeholder: "Answer",
            value: selectRadioBtnAnswer[activeQuestion],
            readOnly: true,
            showerrors: examFormValidation.answer,
        },
        {
            label: "Notes :- ",
            type: "text",
            name: "notes",
            placeholder: "Notes",
            onChange: handleExamStateChange,
            value: notes,
            disabled: activeQuestion !== 0,
            showerrors: examFormValidation.notes
        },
    ];

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
                <div className="teacher_sidebar">
                    <TeacherSideBar />
                </div>
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