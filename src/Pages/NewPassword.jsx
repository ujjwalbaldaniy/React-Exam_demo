import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Form from "../Components/Form";
import { confirmPassword } from "../Services/allApi";
import { toast } from "react-toastify";
import formValidation from "../utils/validation";
import Navbar from "../Components/Navbar";
import { confirmPasswordFieldList } from "../utils/description";

const NewPassword = () => {
    const location = useLocation();

    const [confirmPasswordField, setConfirmPasswordField] = useState({
        Password: "",
        ConfirmPassword: "",
    });
    const [formErrors, setFormErrors] = useState({
        Password: "",
        ConfirmPassword: "",
    });

    const confirmPasswordChange = (e) => {
        const { name, value } = e.target
        const error = formValidation(name, value, confirmPasswordField.Password);
        setFormErrors({
            ...formErrors,
            [name]: error,
        });
        setConfirmPasswordField({
            ...confirmPasswordField,
            [name]: value
        })
    }

    const confirmPasswordSubmit = (e) => {
        e.preventDefault()
        if (Object.values(confirmPasswordField).some((value) => value === "")) {
            toast.error("Please enter all Fields");
        } else {
            confirmPassword(location.search, confirmPasswordField)
                .then((res) => {
                    console.log(res)
                    toast.success(res.data.message)
                    setConfirmPasswordField({
                        Password: "",
                        ConfirmPassword: "",
                    })
                })
                .catch((error) => {
                    console.log(error)
                    toast.error(error.response.data.message)
                })
        }
    }

    const confirmPasswordList = confirmPasswordFieldList(formErrors, confirmPasswordChange, confirmPasswordField)

    return (
        <>
            <Navbar />
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
