import React, { useState } from "react";
import Form from "../Components/Form";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postSigninData } from "../Services/allApi";

const inputs = [
    {
        name: "email",
        type: "email",
        placeholder: "email",
        lable: "Email Id :- "
    },
    {
        name: "password",
        type: "password",
        placeholder: "password",
        lable: "Password :- "
    },
]

const SignIn = () => {
    const navigate = useNavigate()
    const [signinField, setSigninField] = useState({
        email: "",
        password: ""
    });

    const handleSigninChange = (e) => {
        const { name, value } = e.target
        setSigninField({
            ...signinField,
            [name]: value
        })
    }

    const handleSigninSubmit = (e) => {
        e.preventDefault()
        if (signinField.email && signinField.password) {
            console.log(signinField);

            postSigninData(signinField)
                .then((res) => {
                    console.log(res);
                    if (res.data.statusCode === 500) {
                        toast.error(res.data.message)
                    } else {
                        if (res.data.data.token) {
                            localStorage.setItem("user", JSON.stringify(res.data.data));
                            if (res.data.data.role === "teacher") {
                                toast.success(res.data.message)
                                navigate('/teacherDeshboard')
                            } else if (res.data.data.role === "student") {
                                toast.success(res.data.message)
                                navigate('/studentPage')
                            }
                        } else {
                            return res.data.data;
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                    toast.error(error.message)
                })

            setSigninField({
                email: "",
                password: ""
            })
        }
    }

    return (
        <>
            <div className="employee-form">
                <div className="login_container">
                    <h1 className="login_title">Sign In</h1>
                    <form className="login_form" onSubmit={handleSigninSubmit}>
                        <Form handleChange={handleSigninChange} inputField={signinField} inputs={inputs} />
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
