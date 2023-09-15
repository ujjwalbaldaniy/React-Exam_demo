import React from "react";

const CreateExamForm = ({ examInputList, activeQuestion, questions, setQuestions }) => {
    return (
        <>
            <div>
                {examInputList.map((input, index) => {
                    return (
                        <div key={index}>
                            <label>{input.label}</label>
                            {input.type === "radio" ? (
                                <div>
                                    {input.options.map((option, optionIndex) => {
                                        return (
                                            <div key={optionIndex}>
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
                    )
                })}
            </div>
        </>
    )
};

export default CreateExamForm;
