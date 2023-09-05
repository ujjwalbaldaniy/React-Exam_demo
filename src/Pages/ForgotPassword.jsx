import React, { useState } from "react";
import Form from "../Components/Form";
import { forgotPassword } from "../Services/allApi";

const forgotPasswordListData = [
    {
        name: "email",
        type: "email",
        placeholder: "email",
        lable: "Email Id :- "
    },
]

const ForgotPassword = () => {
    const [forgotPwField, setForgotPwField] = useState({
        email: ""
    });

    const forgotPwChange = (e) => {
        const { name, value } = e.target
        setForgotPwField({
            ...forgotPwField,
            [name]: value
        })
    }

    const forgotPwSubmit = (e) => {
        e.preventDefault()
        if (forgotPwField.email) {
            console.log(forgotPwField);

            setForgotPwField({
                email: ""
            })

            forgotPassword(forgotPwField)
                .then((res) => console.log(res))
                .catch((error) => console.log(error))
        }
    }

    return (
        <>
            <div className="employee-form">
                <div className="login_container">
                    <h1 className="login_title">Forgot Password</h1>
                    <form className="login_form" onSubmit={forgotPwSubmit}>
                        <Form handleChange={forgotPwChange} inputField={forgotPwField} inputs={forgotPasswordListData} />
                        <button type="submit" className="login_btn">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
};

export default ForgotPassword;
