import React, { useState } from "react";
import Form from "../Components/Form";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postSigninData } from "../Services/allApi";
import formValidation from "../utils/validation";

const SignIn = () => {
    const navigate = useNavigate()
    const [signinField, setSigninField] = useState({
        email: "",
        password: ""
    });
    const [formErrors, setFormErrors] = useState({
        email: "",
        password: ""
    });

    const handleSigninChange = (e) => {
        const { name, value } = e.target
        const error = formValidation(name, value);
        setFormErrors({
            ...formErrors,
            [name]: error,
        });
        setSigninField({
            ...signinField,
            [name]: value
        })
    }

    const handleSigninSubmit = (e) => {
        e.preventDefault()
        if (Object.values(signinField).some((value) => value === "")) {
            toast.error("Please enter all Fields");
        } else {
            postSigninData(signinField)
                .then((res) => {
                    console.log(res);
                    if (res.data.statusCode === 500) {
                        toast.error(res.data.message)
                    } else {
                        if (res.data.data.token) {
                            localStorage.setItem("user", JSON.stringify(res.data.data));
                            if (res.data.data.role === "teacher") {
                                navigate('/teacherDashboard')
                            } else if (res.data.data.role === "student") {
                                navigate('/studentDashboard')
                            }
                            toast.success(res.data.message)
                        } else {
                            return res.data.data;
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                    // toast.error(error.message)
                })
        }
    }

    const inputs = [
        {
            name: "email",
            type: "email",
            placeholder: "email",
            lable: "Email Id :- ",
            showerrors: formErrors.email,
            onChange: handleSigninChange,
            value: signinField.email,
        },
        {
            name: "password",
            type: "password",
            placeholder: "password",
            lable: "Password :- ",
            showerrors: formErrors.password,
            onChange: handleSigninChange,
            value: signinField.password,
        },
    ]

    return (
        <>
            <div className="employee-form">
                <div className="login_container">
                    <h1 className="login_title">Sign In</h1>
                    <form className="login_form" onSubmit={handleSigninSubmit}>
                        <Form inputs={inputs} />
                        <Link to='/forgotPassword' style={{ cursor: 'pointer' }}>Forgot your password?</Link>
                        <button type="submit" className="login_btn">Submit</button>
                    </form>

                    <p style={{ cursor: 'pointer', marginTop: '2rem' }}>Don't have an account? <NavLink to='/signup'>Signup hear</NavLink></p>
                </div>
            </div>
        </>
    )
};

export default SignIn;
