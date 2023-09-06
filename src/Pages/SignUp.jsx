import React, { useState } from "react";
import Form from "../Components/Form";
import { NavLink, useNavigate } from "react-router-dom";
import { postSignupData } from "../auth/authService";

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
                            navigate('/teacherPage')
                        } else if (localStorageData.role === "student") {
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
                            <option value='DEFAULT' disabled>Select user</option>
                            <option value="teacher" >teacher</option>
                            <option value="student">student</option>
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
