import React from "react";
import { useLocation } from "react-router-dom";
import StudentSideBar from "./StudentSideBar";

const studentResultList = [
    {
        name: "No"
    },
    {
        name: "Subject Name"
    },
    {
        name: "Rank"
    },
    {
        name: "Result Status"
    },
    {
        name: "Score"
    },
]

const StudentResult = () => {
    const location = useLocation()
    let data = location.state.Result[0]

    return (
        <>
            <div className="teacher_container">
                <div className="teacher_sidebar">
                    <StudentSideBar />
                </div>
                <div className="teacher_mainbar">
                    <div className="singleData_exam">
                        <h1 className="title-heading">Student Given Exam Result</h1>
                        <table>
                            <thead>
                                <tr >
                                    {studentResultList.map((element, index) => (
                                        <th key={index}>{element.name}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data && (
                                    <tr >
                                        <td>{1}</td>
                                        <td>{data.subjectName}</td>
                                        <td>{data.rank}</td>
                                        <td>{data.resultStatus}</td>
                                        <td>{data.score}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    )
};

export default StudentResult;
