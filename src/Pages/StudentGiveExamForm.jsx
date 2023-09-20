import React from "react";

const StudentGiveExamForm = ({ examInputList, activeQuestion, questions, setQuestions }) => {
    return (
        <>
            <form>
                {questions.length && examInputList.map((input, index) => {
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
                                                    readOnly={true}
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
            </form>
        </>
    )
};

export default StudentGiveExamForm;
