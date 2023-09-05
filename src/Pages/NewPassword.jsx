import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Form from "../Components/Form";
import { confirmPassword } from "../Services/allApi";

const confirmPasswordList = [
    {
        name: "Password",
        type: "password",
        placeholder: "Password",
        lable: "Password :- "
    },
    {
        name: "ConfirmPassword",
        type: "password",
        placeholder: "Confirm Password",
        lable: "Confirm Password :- "
    },
]

const NewPassword = () => {
    const location = useLocation();

    const [confirmPasswordField, setConfirmPasswordField] = useState({
        Password: "",
        ConfirmPassword: "",
    });

    const confirmPasswordChange = (e) => {
        const { name, value } = e.target
        setConfirmPasswordField({
            ...confirmPasswordField,
            [name]: value
        })
    }

    const confirmPasswordSubmit = (e) => {
        e.preventDefault()
        if (confirmPasswordField.Password && confirmPasswordField.ConfirmPassword) {
            console.log(confirmPasswordField);

            setConfirmPasswordField({
                Password: "",
                ConfirmPassword: "",
            })

            confirmPassword(location.search, confirmPasswordField)
                .then((res) => console.log(res))
                .catch((error) => console.log(error))
        }
    }

    return (
        <>
            <div className="employee-form">
                <div className="login_container">
                    <h1 className="login_title">Confirm Password</h1>
                    <form className="login_form" onSubmit={confirmPasswordSubmit}>
                        <Form handleChange={confirmPasswordChange} inputField={confirmPasswordField} inputs={confirmPasswordList} />
                        <button type="submit" className="login_btn">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
};

export default NewPassword;
