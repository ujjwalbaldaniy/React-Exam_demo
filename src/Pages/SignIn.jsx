import React, { useState } from "react";
import Form from "../Components/Form";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { postSigninData } from "../auth/authService";
import { toast } from "react-toastify";

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

    const handleSigninSubmit = async (e) => {
        e.preventDefault()
        if (signinField.email && signinField.password) {
            console.log(signinField);
            try {
                await postSigninData(signinField)
                    .then(() => {
                        const localStorageData = JSON.parse(localStorage.getItem("user"));
                        if (localStorageData.role === "teacher") {
                            toast.success("Login Successful")
                            navigate('/teacherDeshboard')
                        } else if (localStorageData.role === "student") {
                            toast.success("Login Successful")
                            navigate('/studentPage')
                        }
                    }).catch((error) => {
                        console.log(error);
                    })
            } catch (error) {
                console.log(error);
            }

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
