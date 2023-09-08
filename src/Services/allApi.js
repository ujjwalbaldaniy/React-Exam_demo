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

const userResetPassword = (value) => {
  return createApi.post("/users/ResetPassword", JSON.stringify(value), {
    headers: authHeader(),
  });
};

// **************** TEACHER API **************** //

const showAllStudentData = () => {
  return createApi.get("/dashboard/Teachers", { headers: authHeader() });
};

const verifiedStudentDataForGiveExam = () => {
  return createApi.get("/dashboard/Teachers/StudentForExam", {
    headers: authHeader(),
  });
};

const viewStudentDetail = (id) => {
  return createApi.get(`/dashboard/Teachers/viewStudentDetail?id=${id}`, {
    headers: authHeader(),
  });
};

// **************** STUDENT API **************** //

const allExamForStudent = () => {
  return createApi.get("/student/studentExam", { headers: authHeader() });
};

export {
  forgotPassword,
  confirmPassword,
  userResetPassword,
  showAllStudentData,
  allExamForStudent,
  verifiedStudentDataForGiveExam,
  viewStudentDetail,
};
