import React, { useEffect, useState } from "react";
import StudentSideBar from "./StudentSideBar";
import { useParams } from "react-router-dom";
import { postGiveExam, studentExamPaper } from "../Services/allApi";
import StudentGiveExamForm from "./StudentGiveExamForm";

const StudentGiveExam = () => {
    const params = useParams()
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [questions, setQuestions] = useState(Array.from({ length: 7 }, () => ({
        question: "",
        _id: "",
        answer: "",
        options: ["", "", "", ""],
    })));
    const [selectRadioBtnAnswer, setSelectRadioBtnAnswer] = useState(Array(7).fill(""));

    useEffect(() => {
        studentExamPaper(params.id)
            .then((res) => {
                setQuestions(res.data.data)
            }).catch((error) => {
                console.log(error);
            })
    }, [params.id])
    // console.log(questions);

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
        // console.log(questions[0].question)

        const aaa = questions.map((element, index) => ({
            question: element.question,
            answer: element.answer
        }))
        console.log("aaaa", aaa);

        postGiveExam(params.id, aaa)
            .then((res) => {
                console.log(res);

            }).catch((error) => {
                console.log(error);

            })
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
            name: "Submit",
            disabled: activeQuestion !== 6,
            onClick: handleSubmit,
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
                <div className="teacher_mainbar">
                    <h1>Student Give Exam</h1>
                    <div className="exam_container">
                        <h3>Question {activeQuestion + 1}</h3>
                        <div>
                            <form>
                                <StudentGiveExamForm examInputList={examInputList} activeQuestion={activeQuestion} />
                            </form>
                        </div>
                        <div>
                            {buttonList.map((element, index) => (
                                <button key={index} {...element}>{element.name}</button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default StudentGiveExam;
