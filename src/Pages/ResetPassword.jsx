import React, { useState } from "react";
import Form from "../Components/Form";
import { userResetPassword } from "../Services/allApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import formValidation from "../utils/validation";

const ResetPassword = () => {
    const navigate = useNavigate()
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    // console.log(localStorageData.role);

    const [resetPasswordField, setResetPasswordField] = useState({
        oldPassword: "",
        Password: "",
        ConfirmPassword: "",
    });
    const [formErrors, setFormErrors] = useState({
        oldPassword: "",
        Password: "",
        ConfirmPassword: "",
    });

    const resetPasswordChange = (e) => {
        const { name, value } = e.target
        const error = formValidation(name, value, resetPasswordField.Password);
        setFormErrors({
            ...formErrors,
            [name]: error,
        });
        setResetPasswordField({
            ...resetPasswordField,
            [name]: value
        })
    }

    const resetPasswordSubmit = (e) => {
        e.preventDefault()
        if (Object.values(resetPasswordField).some((value) => value === "")) {
            toast.error("Please enter all Fields");
        } else {
            userResetPassword(resetPasswordField)
                .then((res) => {
                    console.log(res)
                    toast.success(res.data.message)
                    if (localStorageData.role === "teacher") {
                        navigate('/teacherDashboard')
                    } else if (localStorageData.role === "student") {
                        navigate('/studentDashboard')
                    }
                })
                .catch((error) => {
                    console.log(error)
                    toast.error(error.response.data.message)
                })
        }
    }

    const inputs = [
        {
            name: "oldPassword",
            type: "password",
            placeholder: "old password",
            lable: "Old Password :- ",
            showerrors: formErrors.oldPassword,
            onChange: resetPasswordChange,
            value: resetPasswordField.oldPassword,
        },
        {
            name: "Password",
            type: "password",
            placeholder: "password",
            lable: "Password :- ",
            showerrors: formErrors.Password,
            onChange: resetPasswordChange,
            value: resetPasswordField.Password,
        },
        {
            name: "ConfirmPassword",
            type: "password",
            placeholder: "confirm password",
            lable: "Confirm Password :- ",
            showerrors: formErrors.ConfirmPassword,
            onChange: resetPasswordChange,
            value: resetPasswordField.ConfirmPassword,
        },
    ]


    return (
        <>
            <div className="employee-form">
                <div className="login_container">
                    <h1 className="login_title">Reset Password</h1>
                    <form className="login_form" onSubmit={resetPasswordSubmit}>
                        <Form handleChange={resetPasswordChange} inputField={resetPasswordField} inputs={inputs} />
                        <button type="submit" className="login_btn">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
};

export default ResetPassword;
