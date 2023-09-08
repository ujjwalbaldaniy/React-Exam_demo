import React, { useEffect, useState } from "react";
import { allExamForStudent } from "../Services/allApi";

const StudentPage = () => {
  const [examforStudent, setExamforStudent] = useState([]);

  const studnetTableList = [
    {
      name: "Subject Name"
    },
    {
      name: "Email"
    },
    {
      name: "Notes"
    },
    {
      name: "Id"
    },
    {
      name: "Result"
    },
  ]

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
              {studnetTableList.map((element, index) => (
                <th key={index}>{element.name}</th>
              ))}
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
