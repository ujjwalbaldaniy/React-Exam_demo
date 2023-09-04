import React from "react";
import '../Styles/form.css'
import { useNavigate } from "react-router-dom";

const Form = ({ handleSubmit, handleChange, inputField, inputs, titleName}) => {
    const navigate = useNavigate()
    
    return (
        <>
            <div className="employee-form">
                <div class="login_container">
                    <h1 class="login_title">{titleName}</h1>

                    <form className="login_form" onSubmit={handleSubmit}>
                        {inputs.map((input, index) => (
                            <>
                                <div className="input-div" key={index + 1}>
                                    <label>{input.lable}</label>
                                    <input onChange={handleChange} {...input} value={inputField[input.name]} />
                                </div>
                            </>
                        ))}
                        <button type="submit" className="login_btn">Submit</button>
                    </form>
                    <div className="navigate_btn">
                        <button className="navigate_signup_btn" onClick={() => navigate('/signup')}>Sign up</button>
                        <button className="navigate_Signin_btn" onClick={() => navigate('/signin')}>Sign in</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Form;
