import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TeacherSideBar from "../Components/TeacherSideBar";
import { viewStudentDetail } from "../Services/allApi";
import '../Styles/viewStudentDetails.css'
import avatar from '../images/avatar.jpeg'
import Loader from "../Components/Loader";

const studentSingleDetailList = ["No", "Subject Name", "Rank", "Result Status", "Score"]

const ViewStudentDeatils = () => {
    const params = useParams()
    const [studentSingleDetail, setStudentSingleDetail] = useState([]);
    const [studentSingleInfo, setStudentSingleInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        viewStudentDetail(params.id)
            .then((res) => {
                setStudentSingleInfo(res.data.data)
                setStudentSingleDetail(res.data.data[0]?.Result)
                setLoading(false)
            }).catch((error) => {
                console.log(error);
            })
    }, [params.id])

    console.log(studentSingleInfo, studentSingleDetail);

    return (
        <>
            <div className="teacher_container">
                <div className="teacher_sidebar">
                    <TeacherSideBar />
                </div>
                {loading ? <Loader /> : (
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
                                <h1 style={{ color: "#0c7db1" }}>List of Given Exam</h1>
                                <table>
                                    <thead>
                                        <tr >
                                            {studentSingleDetailList.map((element, index) => (
                                                <th key={index}>{element}</th>
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
                )}
            </div>
        </>
    )
};

export default ViewStudentDeatils;
