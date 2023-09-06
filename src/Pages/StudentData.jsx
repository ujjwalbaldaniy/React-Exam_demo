import React from "react";

const StudentData = ({ studentData }) => {
    return (
        <>
            <div>
                <h1>Students Data</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentData.map((element, index) => (
                            <tr key={index}>
                                <td>{element.status}</td>
                                <td>{element.name}</td>
                                <td>{element.email}</td>
                                <td>{element._id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
};

export default StudentData;
