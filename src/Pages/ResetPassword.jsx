import React, { useState } from "react";
import Form from "../Components/Form";
import { userResetPassword } from "../Services/allApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import formValidation from "../utils/validation";
import Navbar from "../Components/Navbar";
import { resetPasswordFieldList } from "../utils/description";

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
        if (Object.values(resetPasswordField).some((value) => value.trim() === "")) {
            toast.error("Please fill out all fields");
        } else {
            userResetPassword(resetPasswordField)
                .then((res) => {
                    console.log(res)
                    toast.success(res.data.message)
                    if (localStorageData.role === "teacher") {
                        navigate('/teacher/dashboard')
                    } else if (localStorageData.role === "student") {
                        navigate('/student/dashboard')
                    }
                })
                .catch((error) => {
                    console.log(error)
                    toast.error(error.response.data.message)
                })
        }
    }

    const resetPasswordList = resetPasswordFieldList(formErrors, resetPasswordChange, resetPasswordField)

    return (
        <>
            <Navbar />
            <div className="employee-form">
                <div className="login_container">
                    <h1 className="login_title">Reset Password</h1>
                    <form className="login_form" onSubmit={resetPasswordSubmit}>
                        <Form handleChange={resetPasswordChange} inputField={resetPasswordField} inputs={resetPasswordList} />
                        <button type="submit" className="login_btn">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
};

export default ResetPassword;
