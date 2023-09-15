import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TeacherSideBar from "../Components/TeacherSideBar";
import { editExamApi } from "../Services/allApi";

const EditExam = () => {
    const params = useParams()
    const [editExamData, setEditExamData] = useState([]);

    useEffect(() => {
        editExamApi(params.editExamId)
            .then((res) => {
                console.log(res);
                setEditExamData(res.data.data.questions)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [params.editExamId])

    return (
        <>
            <div className="teacher_container">
                <div className="teacher_sidebar">
                    <TeacherSideBar />
                </div>
                <div className="teacher_mainbar">
                    <h1>Teacher Deshboard</h1>
                    <p>{params.editExamId}</p>

                </div>
            </div>
        </>
    )
};

export default EditExam;
