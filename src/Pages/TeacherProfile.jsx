import React from "react";
import avatar from '../images/avatar.jpeg'
import '../Styles/teacherProfile.css'
import { useNavigate } from "react-router-dom";

const TeacherProfile = () => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate()
    return (
        <>
            <div className="teacher_container">
                <div className="teacher_mainbar">
                    <div className="profile_contailer">
                        <h1 className="title-heading">Your Profile</h1>
                        <div className="profile_div">
                            <img src={avatar} alt="avatar_image" className="avatar_image" />
                            <p>Name :- {localStorageData.name}</p>
                            <p>Email :- {localStorageData.email}</p>
                            <button onClick={() => navigate('/resetPassword')}>Reset Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default TeacherProfile;
