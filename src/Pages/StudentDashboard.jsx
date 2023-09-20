import React, { useEffect, useState } from "react";
import StudentSideBar from "./StudentSideBar";
import { allExamForStudent } from "../Services/allApi";
import { useNavigate } from "react-router-dom";

const studnetTableList = [
    {
        name: "No."
    },
    {
        name: "Subject Name"
    },
    {
        name: "Email"
    },
    {
        name: "Id"
    },
    {
        name: "Result"
    },
    {
        name: "Action"
    },
]

const StudentDashboard = () => {
    const navigate = useNavigate()
    const [examforStudent, setExamforStudent] = useState([]);
    const [studentSingleDetail, setStudentSingleDetail] = useState([]);

    useEffect(() => {
        allExamForStudent()
            .then((res) => {
                console.log(res.data.data);
                setExamforStudent(res.data.data)
                setStudentSingleDetail(res.data.data[0]?.Result)
            }).catch((error) => {
                console.log(error);
            })
    }, [])
    console.log(studentSingleDetail);

    const givenExam = (id) => {
        navigate(`/studentDashboard/${id}`)
    }

    return (
        <>
            <div className="teacher_container">
                <div className="teacher_sidebar">
                    <StudentSideBar />
                </div>
                <div className="teacher_mainbar">
                    <h1>Student Dashboard</h1>
                    <div>
                        <h3>List of Exam</h3>
                        <table>
                            <thead>
                                <tr>
                                    {studnetTableList.map((element, index) => (
                                        <th key={index}>{element.name}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {examforStudent.map((element, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{element.subjectName}</td>
                                        <td>{element.email}</td>
                                        <td>{element._id}</td>
                                        <td><button>Details</button></td>
                                        <td><button onClick={() => givenExam(element._id)}>Give Exam</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
};

export default StudentDashboard;
