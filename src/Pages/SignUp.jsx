import React, { useState } from "react";
import Form from "../Components/Form";
import { postSignupData } from "../Services/allApi";

const inputs = [
    {
        name: "name",
        type: "text",
        placeholder: "name",
        lable: "Name :- "
    },
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
    {
        name: "role",
        type: "text",
        placeholder: "role",
        lable: "Role :- "
    },
]


const SignUp = () => {
    const [signupField, setSignupField] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });

    const handleSignupChange = (e) => {
        const { name, value } = e.target
        setSignupField({
            ...signupField,
            [name]: value
        })
    }

    const handleSignupSubmit = (e) => {
        e.preventDefault()
        if (signupField.name && signupField.email && signupField.password && signupField.role) {
            e.preventDefault()
            console.log(signupField);
            // debugger
            postSignupData(signupField)
                .then((res) => console.log(res))
                .catch((error) => console.log(error))
            setSignupField({
                name: "",
                email: "",
                password: "",
                role: ""
            })
        }
    }

    return (
        <>
            <Form handleChange={handleSignupChange} handleSubmit={handleSignupSubmit} inputField={signupField} inputs={inputs} titleName={"Sign Up"} />
        </>
    )
};

export default SignUp;
