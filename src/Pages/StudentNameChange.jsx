import React, { useState } from "react";
import Form from "../Components/Form";
import { putStudentProfile } from "../Services/allApi";
import { toast } from "react-toastify";
import formValidation from "../utils/validation";
import { studentNameChangeFieldList } from "../utils/description";
import { useNavigate } from "react-router-dom";

const StudentNameChange = () => {
    const navigate = useNavigate()
    const [studentName, setStudentName] = useState({
        name: ""
    });
    const [formErrors, setFormErrors] = useState({
        name: ""
    });

    const studentNameChange = (e) => {
        const { name, value } = e.target
        const error = formValidation(name, value);
        setFormErrors({
            ...formErrors,
            [name]: error,
        });
        setStudentName({
            ...studentName,
            [name]: value
        })
    }

    const studentNameSubmit = (e) => {
        e.preventDefault()
        if (Object.values(studentName).some((value) => value.trim() === "")) {
            toast.error("Please fill out all fields");
        } else {
            putStudentProfile(studentName)
                .then((res) => {
                    console.log(res);
                    toast.success(res.data.message)
                    navigate('/student/profile')
                }).catch((error) => {
                    console.log(error);
                    toast.error(error.response.data.message)
                })
        }
    }

    const studentNameChangeList = studentNameChangeFieldList(formErrors, studentNameChange, studentName)

    return (
        <>
            <div className="teacher_container">
                <div className="teacher_mainbar">
                    <div className="profile_contailer">
                        <div className="employee-form">
                            <div className="login_container">
                                <h1 className="login_title">Student Name Change</h1>
                                <form className="login_form" onSubmit={studentNameSubmit}>
                                    <Form inputs={studentNameChangeList} />
                                    <button type="submit" className="login_btn">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default StudentNameChange;
