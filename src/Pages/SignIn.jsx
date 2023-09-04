import React, { useState } from "react";
import Form from "../Components/Form";
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
                .then((res) => console.log(res))
                .catch((error) => console.log(error))

            setSigninField({
                email: "",
                password: ""
            })
        }
    }

    return (
        <>
            <Form handleChange={handleSigninChange} handleSubmit={handleSigninSubmit} inputField={signinField} inputs={inputs} titleName={"Sign In"} />
        </>
    )
};

export default SignIn;
