import React from "react";

const CreateExamForm = ({ examInputList, activeQuestion, questions, setQuestions, examFormValidation, setExamFormValidation }) => {
    return (
        <>
            <div className="exam_maincontainer">
                <h3 className="title-heading1">Question {activeQuestion + 1}</h3>
                {examInputList.map((input, index) => {
                    return (
                        <div key={index} className="exam-container">
                            {/* <label>{input.label}</label> */}
                            {input.type === "radio" ? (
                                <div className="exam_radio-div">
                                    {input.options.map((option, optionIndex) => {
                                        return (
                                            <div key={optionIndex} className="exam_option-div">
                                                <input
                                                    type={input.type}
                                                    name={`question${activeQuestion}`}
                                                    value={option}
                                                    checked={input.answer && input.answer === option}
                                                    onChange={input.onChange}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder={`Option ${optionIndex + 1}`}
                                                    value={option}
                                                    className="exam_option-text"
                                                    onChange={(e) => {
                                                        const updatedQuestions = [...questions];
                                                        updatedQuestions[activeQuestion].options[optionIndex] = e.target.value;
                                                        setQuestions(updatedQuestions);
                                                        setExamFormValidation({
                                                            ...examFormValidation,
                                                            options: "",
                                                        });
                                                    }}
                                                />
                                            </div>
                                        )
                                    })}
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

export default CreateExamForm;
