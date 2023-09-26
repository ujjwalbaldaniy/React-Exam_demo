import React, { useEffect, useState } from "react";
import avatar from '../images/avatar.jpeg'
import { useNavigate } from "react-router-dom";
import { getStudentProfile } from "../Services/allApi";

const StudentProfile = () => {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState("");

    useEffect(() => {
        getStudentProfile()
            .then((res) => {
                console.log(res.data.data);
                setUserInfo(res.data.data)
            }).catch((error) => {
                console.log(error);
            })
    }, [])

    return (
        <>
            <div className="teacher_container">
                <div className="teacher_mainbar">
                    <div className="profile_contailer">
                        <h1 className="title-heading">Student Profile</h1>
                        <div className="profile_div">
                            <img src={avatar} alt="avatar_image" className="avatar_image" />
                            <p>Name :- {userInfo.name}</p>
                            <p>Email :- {userInfo.email}</p>
                            <button onClick={() => navigate('/student/nameChange')}>Update Profile</button>
                            <button onClick={() => navigate('/resetPassword')}>Reset Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default StudentProfile;
