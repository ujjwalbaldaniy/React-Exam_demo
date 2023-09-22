import React from "react";

const StudentGiveExamForm = ({ examInputList, activeQuestion, questions, setQuestions, examFormValidation, setExamFormValidation }) => {
    return (
        <>
            <div className="exam_maincontainer">
                <h3 className="title-heading1">Question {activeQuestion + 1}</h3>
                {questions.length && examInputList.map((input, index) => {
                    return (
                        <div key={index} className="exam-container">
                            <label>{input.label}</label>
                            {input.type === "radio" ? (
                                <div className="exam_radio-div">
                                    {input.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className="exam_option-div">
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
                                                readOnly={true}
                                                className="exam_option-text"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div >
                                    <input {...input} className="exam_allinput" />
                                </div>
                            )}
                            {input.showerrors && (<div style={{ color: "red" }}>{input.showerrors}</div>)}
                        </div>
                    )
                })}
            </div>
        </>
    )
};

export default StudentGiveExamForm;
