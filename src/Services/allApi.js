import authHeader from "../auth/authHeader";
import createApi from "./createApi";

// **************** USER API **************** //

const forgotPassword = (value) => {
  return createApi.post("/users/ForgotPassword", JSON.stringify(value));
};

const confirmPassword = (token, value) => {
  return createApi.post(
    `/users/ForgotPassword/Verify${token}`,
    JSON.stringify(value)
  );
};

// **************** TEACHER API **************** //

const showAllStudentData = () => {
  return createApi.get("/dashboard/Teachers", { headers: authHeader() });
};

// **************** STUDENT API **************** //

const allExamForStudent = () => {
  return createApi.get("/student/studentExam", { headers: authHeader() });
};

export {
  forgotPassword,
  confirmPassword,
  showAllStudentData,
  allExamForStudent,
};
