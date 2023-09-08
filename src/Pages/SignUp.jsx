import React, { useState } from "react";
import Form from "../Components/Form";
import { NavLink, useNavigate } from "react-router-dom";
import { postSignupData } from "../auth/authService";
import { toast } from "react-toastify";

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
]

const dropdownList = [
    {
        name: "Select user",
        value: 'DEFAULT',
        disabled: true
    },
    {
        name: "teacher",
        value: 'teacher',
        disabled: false
    },
    {
        name: "student",
        value: 'student',
        disabled: false
    },
]

const SignUp = () => {
    const navigate = useNavigate()

    const [signupField, setSignupField] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [dropdown, setDropdown] = useState("");

    const handleSignupChange = (e) => {
        const { name, value } = e.target
        setSignupField({
            ...signupField,
            [name]: value
        })
    }

    const handleSignupSubmit = async (e) => {
        e.preventDefault()
        signupField.role = dropdown;
        if (signupField.name && signupField.email && signupField.password && signupField.role) {
            console.log(signupField);

            try {
                await postSignupData(signupField)
                    .then((res) => {
                        const localStorageData = JSON.parse(localStorage.getItem("user"));
                        if (localStorageData.role === "teacher") {
                            toast.success("Signup Successful")
                            navigate('/teacherDeshboard')
                        } else if (localStorageData.role === "student") {
                            toast.success("Signup Successful")
                            navigate('/studentPage')
                        }
                    })
                    .catch((error) => console.log(error))
            } catch (error) {
                console.log(error);
            }

            setSignupField({
                name: "",
                email: "",
                password: "",
            })
        }
    }

    return (
        <>
            <div className="employee-form">
                <div className="login_container">
                    <h1 className="login_title">Sign Up</h1>
                    <form className="login_form" onSubmit={handleSignupSubmit}>
                        <Form handleChange={handleSignupChange} inputField={signupField} inputs={inputs} />
                        <select value={dropdown.role} onChange={(e) => setDropdown(e.target.value)} defaultValue={'DEFAULT'} className="select_dropdown" >
                            {dropdownList.map((element, index) => (
                                <option key={index + 1} {...element}>{element.name}</option>
                            ))}
                        </select>
                        <button type="submit" className="login_btn">Submit</button>
                    </form>
                    <p style={{ cursor: 'pointer', marginTop: '2rem' }}>Already have an account? <NavLink to='/signin'>Signin hear</NavLink></p>
                </div>
            </div >
        </>
    )
};

export default SignUp;
