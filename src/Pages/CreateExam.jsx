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
    // const [examState, setExamState] = useState({
    //     subjectName: "",
    //     notes: "",
    // })
    // const [questions, setQuestions] = useState(Array.from({ length: 15 }, () => ({
    //     question: "",
    //     answer: "",
    //     options: ["", "", "", ""],
    // })));
    // const [selectRadioBtnAnswer, setSelectRadioBtnAnswer] = useState(Array(15).fill(""));

    const [examData, setExamData] = useState({
        subjectName: "",
        notes: "",
        questions: Array.from({ length: 15 }, () => ({
            question: "",
            answer: "",
            options: ["", "", "", ""],
        }))
    });

    const { subjectName, notes } = examData
    const [examFormValidation, setExamFormValidation] = useState({
        subjectName: "",
        question: "",
        options: "",
        answer: "",
        notes: ""
    });

    const handleExamStateChange = (e) => {
        const { name, value } = e.target
        const error = newValidation(name, value);
        setExamFormValidation({
            ...examFormValidation,
            [name]: error,
        });
        setExamData({
            ...examData,
            [name]: value
        })
    }

    const handleActiveQuestionChange = (e) => {
        const { name, value } = e.target
        const error = newValidation(name, value);
        setExamFormValidation({
            ...examFormValidation,
            [name]: error,
        });
        const allQuestions = { ...examData };
        allQuestions.questions[activeQuestion].question = e.target.value;
        setExamData({ ...examData, ...allQuestions });
    };

    const handleRadioBtnChange = (e) => {
        setExamFormValidation({
            ...examFormValidation,
            answer: "",
        });
        const updatedRadioBtnQuestions = { ...examData };
        updatedRadioBtnQuestions.questions[activeQuestion].answer = e.target.value;
        setExamData({ ...examData, ...updatedRadioBtnQuestions });
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
            examData.questions,
            activeQuestion,
            examData,
        );
        if (error) {
            if (activeQuestion < 14) {
                setActiveQuestion(activeQuestion + 1)
            }
        }
    }

    const examEditData = {
        subjectName: subjectName,
        questions: examData.questions,
        notes: notes
    }

    useEffect(() => {
        if (!location.state.toggle) {
            editExamApi(location.state.id)
                .then((res) => {
                    // console.log(res.data.data.questions);
                    // console.log(location.state);
                    let { subjectName, notes } = location.state
                    setExamData({
                        ...examData,
                        subjectName: subjectName,
                        notes: notes,
                        questions: res.data.data.questions
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.state.id, location.state, location.state.toggle])

    const examFormData = {
        subjectName: subjectName,
        questions: examData.questions,
        notes: [notes]
    }

    const handleSubmit = (e) => {
        console.log(examFormData);

        e.preventDefault()
        const error = createExamValidation(
            examFormValidation,
            setExamFormValidation,
            examData.questions,
            activeQuestion,
            examData,
        );
        if (error) {
            if (location.state.toggle) {
                createExamPost(examFormData)
                    .then((res) => {
                        console.log(res);
                        if (res?.data?.statusCode === 500) {
                            toast.error(res.data.message)
                        } else if (res?.data?.statusCode === 401) {
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
                        if (res?.data?.statusCode === 500) {
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

    const examInputList = examInputFieldList(
        subjectName,
        handleExamStateChange,
        activeQuestion,
        examFormValidation,
        examData.questions,
        handleActiveQuestionChange,
        handleRadioBtnChange,
        notes
    )

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
                                <CreateExamForm examInputList={examInputList} activeQuestion={activeQuestion} examData={examData} setExamData={setExamData} setExamFormValidation={setExamFormValidation} examFormValidation={examFormValidation} />
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