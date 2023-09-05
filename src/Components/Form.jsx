import React from "react";
import '../Styles/form.css'
import { useNavigate } from "react-router-dom";

const Form = ({ handleChange, inputField, inputs }) => {
    const navigate = useNavigate()

    return (
        <>
            {inputs.map((input, index) => (
                <div className="input-div" key={index + 1}>
                    <label>{input.lable}</label>
                    <input onChange={handleChange} {...input} value={inputField[input.name]} />
                </div>
            ))}
            {/* <div className="navigate_btn">
                <button className="navigate_sign_btn" onClick={() => navigate('/signup')}>Sign up</button>
                <button className="navigate_sign_btn" onClick={() => navigate('/signin')}>Sign in</button>
            </div> */}
        </>
    )
};

export default Form;
