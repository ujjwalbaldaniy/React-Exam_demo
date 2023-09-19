import React, { useState } from "react";
import StudentSideBar from "./StudentSideBar";
import Form from "../Components/Form";
import { putStudentProfile } from "../Services/allApi";
import { toast } from "react-toastify";

const studentNameChangeList = [
    {
        name: "name",
        type: "text",
        placeholder: "name",
        lable: "Name :- "
    },
]

const StudentNameChange = () => {
    const [studentName, setStudentName] = useState({
        name: ""
    });

    const studentNameChange = (e) => {
        const { name, value } = e.target
        setStudentName({
            ...studentName,
            [name]: value
        })
    }

    const studentNameSubmit = (e) => {
        e.preventDefault()
        putStudentProfile(studentName)
            .then((res) => {
                console.log(res);
                toast.success(res.data.message)

            }).catch((error) => {
                console.log(error);
                toast.error(error.response.data.message)
            })
        setStudentName({
            name: ""
        })
    }

    return (
        <>
            <div className="teacher_container">
                <div className="teacher_sidebar">
                    <StudentSideBar />
                </div>
                <div className="teacher_mainbar">
                    <div className="profile_contailer">
                        <div className="employee-form">
                            <div className="login_container">
                                <h1 className="login_title">Student Name Change</h1>
                                <form className="login_form" onSubmit={studentNameSubmit}>
                                    <Form handleChange={studentNameChange} inputField={studentName} inputs={studentNameChangeList} />
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
