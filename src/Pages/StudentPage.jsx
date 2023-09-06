import React, { useEffect, useState } from "react";
import { allExamForStudent } from "../Services/allApi";

const StudentPage = () => {
  const [examforStudent, setExamforStudent] = useState([]);

  useEffect(() => {
    allExamForStudent()
      .then((res) => {
        console.log(res.data.data);
        setExamforStudent(res.data.data)
      }).catch((error) => {
        console.log(error);
      })
  }, [])

  return (
    <>
      <div>
        <h1>List of Exam</h1>
        <table>
          <thead>
            <tr>
              <th>Subject Name</th>
              <th>Email</th>
              <th>Notes</th>
              <th>Id</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {examforStudent.map((element, index) => (
              <tr key={index}>
                <td>{element.subjectName}</td>
                <td>{element.email}</td>
                <td>{element.notes[0]} , {element.notes[1]}</td>
                <td>{element._id}</td>
                <td>{element.Result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
};

export default StudentPage;
