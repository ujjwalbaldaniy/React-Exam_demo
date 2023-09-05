import React, { useState } from "react";
import Form from "../Components/Form";
import { postSigninData } from "../Services/allApi";
import { useNavigate } from "react-router-dom";

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
                    console.log(res)
                    console.log(res.data.data.token)
                    if (res.data.data.token) {
                        localStorage.setItem('user', JSON.stringify(res.data.data))
                    }
                    return res.data.data
                })
                .catch((error) => console.log(error))

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
                        <p onClick={() => navigate('/forgotPassword')} style={{ cursor: 'pointer' }}>Forgot your password?</p>
                        <button type="submit" className="login_btn">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
};

export default SignIn;
