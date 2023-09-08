import React from "react";
import '../Styles/form.css'

const Form = ({ handleChange, inputField, inputs }) => {

    return (
        <>
            {inputs.map((input, index) => (
                <div className="input-div" key={index + 1}>
                    <label>{input.lable}</label>
                    <input onChange={handleChange} {...input} value={inputField[input.name]} />
                </div>
            ))}
        </>
    )
};

export default Form;
