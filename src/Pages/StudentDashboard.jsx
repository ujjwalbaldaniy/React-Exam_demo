import React, { useEffect, useState } from "react";
import StudentSideBar from "./StudentSideBar";
import { allExamForStudent } from "../Services/allApi";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

const studnetTableList = ["No","Subject Name","Email", "Id", "Action", "Action"]

const StudentDashboard = () => {
    const navigate = useNavigate()
    const [examforStudent, setExamforStudent] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        allExamForStudent()
            .then((res) => {
                console.log(res.data.data);
                setExamforStudent(res.data.data)
                setLoading(false)
            }).catch((error) => {
                console.log(error);
            })
    }, [])

    const givenExam = (id) => {
        navigate(`/student/dashboard/${id}`)
    }

    const viewExamResult = (data) => {
        navigate('/student/result', { state: data })
    }

    return (
        <>
            <div className="teacher_container">
                <div className="teacher_sidebar">
                    <StudentSideBar />
                </div>
                {loading ? <Loader /> : (
                    <div className="teacher_mainbar">
                        <h1 className="title-heading">Student Dashboard</h1>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        {studnetTableList.map((element, index) => (
                                            <th key={index}>{element}</th>
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
                                            <td><button className="table-btn" onClick={() => viewExamResult(element)} disabled={!element.Result[0]?._id}>Result</button></td>
                                            <td><button className="table-btn" onClick={() => givenExam(element._id)} disabled={element.Result[0]?._id}>Give Exam</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
};

export default StudentDashboard;
