import { Navigate, Outlet } from "react-router-dom";
import { isLogginStudent, isLogginTeacher } from ".";

const StudentPrivate = () => {
  return isLogginStudent() ? <Outlet /> : <Navigate to="/signin" />;
};

const TeacherPrivate = () => {
  return isLogginTeacher() ? <Outlet /> : <Navigate to="/signin" />;
};

export { StudentPrivate, TeacherPrivate };
