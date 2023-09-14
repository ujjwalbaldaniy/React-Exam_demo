import React, { useState } from "react";
import TeacherSideBar from "../Components/TeacherSideBar";
import '../Styles/createExam.css'

const createExamInputList = [
    {
        lable: "Subject Name :- ",
        type: "text",
        placeholder: "subjectName",
        name: "subjectName",
    },
    {
        lable: "Question :- ",
        type: "text",
        placeholder: "Question",
        name: "question",
    },
    {
        type: "text",
        placeholder: "answer1",
        name: "answer1",
    },
    {
        type: "text",
        placeholder: "answer2",
        name: "answer2",
    },
    {
        type: "text",
        placeholder: "answer3",
        name: "answer3",
    },
    {
        type: "text",
        placeholder: "answer4",
        name: "answer4",
    },
    {
        type: "radio",
        name: "answer",
    },
    {
        type: "radio",
        name: "answer",
    },
    {
        type: "radio",
        name: "answer",
    },
    {
        type: "radio",
        name: "answer",
    },
    {
        type: "text",
        placeholder: "Notes",
        name: "notes",
    },
]


const CreateExam = () => {

    const [examState, setExamState] = useState({
        subjectName: "",
        questions: [],
        notes: "",
    })

    const [ques, setQues] = useState({
        question: "",
        answer: "",
        options: []
    });

    const [answers, setAnswers] = useState({
        ans1: "",
        ans2: "",
        ans3: "",
        ans4: "",
    });

    const createExamChange = (e) => {
        const { name, value } = e.target
        setExamState({
            ...examState,
            [name]: value
        })
    }

    const quesChange = (e) => {
        const { name, value } = e.target
        setQues({
            ...ques,
            [name]: value
        })
    }

    const answersChange = (e) => {
        const { name, value } = e.target
        setAnswers({
            ...answers,
            [name]: value
        })
    }

    const createExamSubmit = (e) => {
        e.preventDefault()

        console.log(examState);
        console.log(ques);
        console.log(answers);

        ques.options.push(answers)
        examState.questions.push(ques)
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
                            <label>Subject Name :- </label>
                            <input type="text" placeholder="subjectName" name="subjectName" value={examState.subjectName} onChange={createExamChange} />
                            <label>Question :- </label>
                            <input type="text" placeholder="Question" name="question" value={ques.question} onChange={quesChange} />

                            <div className="mcqs_value">
                                <div>
                                    <input type="radio" name="answer" value={answers.answer1} onChange={quesChange} />
                                    <input type="text" placeholder="answer1" name="ans1" value={answers.answer1} onChange={answersChange} />
                                </div>
                                <div>
                                    <input type="radio" name="answer" value={answers.answer2} onChange={quesChange} />
                                    <input type="text" placeholder="answer2" name="ans2" value={answers.answer2} onChange={answersChange} />
                                </div>
                                <div>
                                    <input type="radio" name="answer" value={answers.answer3} onChange={quesChange} />
                                    <input type="text" placeholder="answer3" name="ans3" value={answers.answer3} onChange={answersChange} />
                                </div>
                                <div>
                                    <input type="radio" name="answer" value={answers.answer4} onChange={quesChange} />
                                    <input type="text" placeholder="answer4" name="ans4" value={answers.answer4} onChange={answersChange} />
                                </div>
                            </div>

                            <label>Notes :- </label>
                            <input type="text" placeholder="Notes" name="notes" value={examState.notes} onChange={createExamChange} />

                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default CreateExam;