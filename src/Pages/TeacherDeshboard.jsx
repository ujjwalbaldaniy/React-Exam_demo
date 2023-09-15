import React, { useEffect, useState } from "react";
import '../Styles/teacherDeshboard.css'
import TeacherSideBar from "../Components/TeacherSideBar";
import { deleteExamApi, viewExam } from "../Services/allApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const viewExmaTableList = [
    {
        name: "No"
    },
    {
        name: "Subject Name"
    },
    {
        name: "Notes"
    },
    {
        name: "Email id"
    },
    {
        name: "Actions"
    },
]

const TeacherDeshboard = () => {
    const navigate = useNavigate()
    const [viewExamData, setViewExamData] = useState([]);

    useEffect(() => {
        viewExam()
            .then((res) => {
                console.log(res.data.data)
                setViewExamData(res.data.data)
            }).catch((error) => {
                console.log(error);
            })
    }, [])

    const deleteExam = (id) => {
        console.log(id);
        deleteExamApi(id)
            .then((res) => {
                console.log(res);
                toast.success(res.data.message)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const editExam = (id) => {
        console.log(id);
        navigate(`/editExam/${id}`)
    }

    return (
        <>
            <div className="teacher_container">
                <div className="teacher_sidebar">
                    <TeacherSideBar />
                </div>
                <div className="teacher_mainbar">
                    <h1>Teacher Deshboard</h1>
                    <table>
                        <thead>
                            <tr>
                                {viewExmaTableList.map((element, index) => (
                                    <th key={index}>{element.name}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {viewExamData.map((element, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{element.subjectName}</td>
                                    <td>{element.notes}</td>
                                    <td>{element.email}</td>
                                    <td><button onClick={() => editExam(element._id)}>Edit Exam</button> <button onClick={() => deleteExam(element._id)}>Delete Exam</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
};

export default TeacherDeshboard;
