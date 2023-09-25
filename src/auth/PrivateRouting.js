import { Navigate } from "react-router-dom";
import { isLogginStudent, isLogginTeacher } from ".";
import Navbar from "../Components/Navbar";

const StudentPrivate = () => {
  return isLogginStudent() ? <Navbar /> : <Navigate to="/signin" />;
};

const TeacherPrivate = () => {
  return isLogginTeacher() ? <Navbar /> : <Navigate to="/signin" />;
};

export { StudentPrivate, TeacherPrivate };