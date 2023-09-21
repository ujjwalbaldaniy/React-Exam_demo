import React from "react";
import StudentSideBar from "./StudentSideBar";
import avatar from '../images/avatar.jpeg'
import { useNavigate } from "react-router-dom";

const StudentProfile = () => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate()

    return (
        <>
            <div className="teacher_container">
                <div className="teacher_sidebar">
                    <StudentSideBar />
                </div>
                <div className="teacher_mainbar">
                    <div className="profile_contailer">
                        <h1 className="title-heading">Student Profile</h1>
                        <div className="profile_div">
                            <img src={avatar} alt="avatar_image" className="avatar_image" />
                            <p>Name :- {localStorageData.name}</p>
                            <p>Email :- {localStorageData.email}</p>
                            <button onClick={()=>navigate('/studentNameChange')}>Update Profile</button>
                            <button onClick={() => navigate('/resetPassword')}>Reset Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default StudentProfile;
