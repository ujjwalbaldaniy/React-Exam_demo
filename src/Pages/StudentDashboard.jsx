import React, { useEffect, useState } from "react";
import { allExamForStudent } from "../Services/allApi";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import { toast } from "react-toastify";

const studnetTableList = ["No", "Subject Name", "Email", "Id"]

const StudentDashboard = () => {
    const navigate = useNavigate()
    const [examforStudent, setExamforStudent] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        allExamForStudent()
            .then((res) => {
                console.log(res.data.data);
                if (res.data.statusCode === 401) {
                    toast.error(res.data.message)
                    navigate('/signin')
                } else {
                    setExamforStudent(res.data.data)
                    setLoading(false)
                }
            }).catch((error) => {
                console.log(error);
            })
    }, [navigate])

    const givenExam = (id) => {
        navigate(`/student/dashboard/${id}`)
    }

    const viewExamResult = (data) => {
        navigate('/student/result', { state: data })
    }

    const [selectedCategory, setSelectedCategory] = useState('All');

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const filteredData = selectedCategory === 'All' ? examforStudent : selectedCategory === 'Declared' ? examforStudent.filter(item => item.Result[0]?.resultStatus === selectedCategory) : selectedCategory === 'Result' ? examforStudent.filter(item => item.Result[0]?.resultStatus !== selectedCategory) : null

    return (
        <>
            <div className="teacher_container">
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
                                        <th><label>
                                            Filter by Category:
                                            <select value={selectedCategory} onChange={handleCategoryChange}>
                                                <option value="All">All</option>
                                                <option value="Declared">Result</option>
                                                <option value="Result">Give Exam</option>
                                            </select>
                                        </label></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData && filteredData.map((element, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{element.subjectName}</td>
                                            <td>{element.email}</td>
                                            <td>{element._id}</td>
                                            <td>{selectedCategory !== "Result" && <button className="table-btn" onClick={() => viewExamResult(element)} disabled={!element.Result[0]?._id}>Result</button>} {selectedCategory !== "Declared" && <button className="table-btn" onClick={() => givenExam(element._id)} disabled={element.Result[0]?._id}>Give Exam</button>}</td>
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
