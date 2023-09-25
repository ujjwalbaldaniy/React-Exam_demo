import { Navigate } from "react-router-dom";
import { isLogginStudent, isLogginTeacher } from ".";
import SideBar from "../Components/SideBar";

const StudentPrivate = () => {
  return isLogginStudent() ? <SideBar /> : <Navigate to="/signin" />;
};

const TeacherPrivate = () => {
  return isLogginTeacher() ? <SideBar /> : <Navigate to="/signin" />;
};

export { StudentPrivate, TeacherPrivate };