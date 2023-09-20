import React, { useState } from "react";
import Form from "../Components/Form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postSignupData } from "../Services/allApi";
import formValidation from "../utils/validation";

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
    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [dropdown, setDropdown] = useState("");

    const handleSignupChange = (e) => {
        const { name, value } = e.target
        const error = formValidation(name, value);
        setFormErrors({
            ...formErrors,
            [name]: error,
        });
        setSignupField({
            ...signupField,
            [name]: value
        })
    }

    const handleSignupSubmit = (e) => {
        e.preventDefault()
        signupField.role = dropdown;
        if (Object.values(signupField).some((value) => value === "")) {
            toast.error("Please enter all Fields");
        } else {
            postSignupData(signupField)
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
                    toast.error(error.message)
                })

            setSignupField({
                name: "",
                email: "",
                password: "",
            })
        }
    }

    const inputs = [
        {
            name: "name",
            type: "text",
            placeholder: "name",
            lable: "Name :- ",
            showerrors: formErrors.name,
            onChange: handleSignupChange,
            value: signupField.name,
        },
        {
            name: "email",
            type: "email",
            placeholder: "email",
            lable: "Email Id :- ",
            showerrors: formErrors.email,
            onChange: handleSignupChange,
            value: signupField.email,
        },
        {
            name: "password",
            type: "password",
            placeholder: "password",
            lable: "Password :- ",
            showerrors: formErrors.password,
            onChange: handleSignupChange,
            value: signupField.password,
        },
    ]


    return (
        <>
            <div className="employee-form">
                <div className="login_container">
                    <h1 className="login_title">Sign Up</h1>
                    <form className="login_form" onSubmit={handleSignupSubmit}>
                        <Form inputs={inputs} />
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
