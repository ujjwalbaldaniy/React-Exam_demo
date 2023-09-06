import React, { useEffect, useState } from "react";
import { showAllStudentData } from "../Services/allApi";
import StudentData from "./StudentData";
import { useNavigate } from "react-router-dom";

const TeacherPage = () => {
    const navigate = useNavigate()
    const [studentData, setStudentData] = useState([]);

    useEffect(() => {
        showAllStudentData()
            .then((res) => {
                console.log(res)
                console.log(res.data.data)
                setStudentData(res.data.data)
            })
            .catch((error) => {
                console.log(error.response.status)
                if (error.response.status === 403) {
                    navigate('/signup')
                }
            })
    }, [navigate])

    return (
        <>
            <StudentData studentData={studentData} />
        </>
    )
};

export default TeacherPage;
