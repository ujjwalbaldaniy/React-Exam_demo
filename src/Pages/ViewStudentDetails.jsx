import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TeacherSideBar from "../Components/TeacherSideBar";
import { viewStudentDetail } from "../Services/allApi";
import '../Styles/viewStudentDetails.css'
import avatar from '../images/avatar.jpeg'

const studentSingleDetailList = [
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

const ViewStudentDeatils = () => {
    const params = useParams()
    const [studentSingleDetail, setStudentSingleDetail] = useState([]);
    const [studentSingleInfo, setStudentSingleInfo] = useState([]);

    useEffect(() => {
        viewStudentDetail(params.id)
            .then((res) => {
                setStudentSingleInfo(res.data.data)
                setStudentSingleDetail(res.data.data[0]?.Result)
            }).catch((error) => {
                console.log(error);
            })
    }, [params.id])

    console.log(studentSingleInfo);

    return (
        <>
            <div className="teacher_container">
                <div className="teacher_sidebar">
                    <TeacherSideBar />
                </div>
                <div className="teacher_mainbar">
                    <div className="singleData_container">
                        <div className="singleData_info">
                            <img src={avatar} alt="avatar_image" className="avatar_image" />
                            {studentSingleInfo.map((element, index) => (
                                <div key={index} className="singleData_div">
                                    <p>Name :- {element.name}</p>
                                    <p>Email id :- {element.email}</p>
                                </div>
                            ))}
                        </div>
                        <div className="singleData_exam">
                            <h1>List of Given Exam</h1>
                                <table>
                                    <thead>
                                        <tr >
                                            {studentSingleDetailList.map((element, index) => (
                                                <th key={index}>{element.name}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentSingleDetail.map((element, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{element.subjectName}</td>
                                                <td>{element.rank}</td>
                                                <td>{element.resultStatus}</td>
                                                <td>{element.score}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ViewStudentDeatils;
