import React, { useState } from "react";
import Form from "../Components/Form";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { postSignupData } from "../Services/allApi";
import formValidation from "../utils/validation";
import Navbar from "../Components/Navbar";
import { signUpFieldList } from "../utils/description";

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
            toast.error("Please fill out all fields");
        } else {
            postSignupData(signupField)
                .then((res) => {
                    console.log(res);
                    if (res.data.statusCode === 500) {
                        toast.error(res.data.message)
                    } else {
                        toast.success(res.data.message)
                    }
                }).catch((error) => {
                    console.log(error);
                    toast.error(error.message)
                })
        }
    }

    const signUpList = signUpFieldList(formErrors, handleSignupChange, signupField)

    return (
        <>
            <Navbar />
            <div className="employee-form">
                <div className="login_container">
                    <h1 className="login_title">Sign Up</h1>
                    <form className="login_form" onSubmit={handleSignupSubmit}>
                        <Form inputs={signUpList} />
                        <select value={dropdown.role} onChange={(e) => setDropdown(e.target.value)} defaultValue={'DEFAULT'} required className="select_dropdown" >
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
