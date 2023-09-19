import authHeader from "../auth/authHeader";
import createApi from "./createApi";

// **************** USER API **************** //

const postSigninData = (value) => {
  return createApi.post("/users/Login", JSON.stringify(value));
};

const postSignupData = (value) => {
  return createApi.post("/users/SignUp", JSON.stringify(value));
};

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

const createExamPost = (value) => {
  return createApi.post("/dashboard/Teachers/Exam", JSON.stringify(value), {
    headers: authHeader(),
  });
};

const viewExam = () => {
  return createApi.get("/dashboard/Teachers/viewExam", {
    headers: authHeader(),
  });
};

const deleteExamApi = (id) => {
  return createApi.delete(`/dashboard/Teachers/deleteExam?id=${id}`, {
    headers: authHeader(),
  });
};

const editExamApi = (id) => {
  return createApi.get(`/dashboard/Teachers/examDetail?id=${id}`, {
    headers: authHeader(),
  });
};

const putExamDataApi = (value, id) => {
  return createApi.put(
    `dashboard/Teachers/editExam?id=${id}`,
    JSON.stringify(value),
    {
      headers: authHeader(),
    }
  );
};

// **************** STUDENT API **************** //

const allExamForStudent = () => {
  return createApi.get("/student/studentExam", { headers: authHeader() });
};
const studentExamPaper = (id) => {
  return createApi.get(`/student/examPaper?id=${id}`, {
    headers: authHeader(),
  });
};

const getStudentProfile = () => {
  return createApi.get("/student/getStudentDetail", { headers: authHeader() });
};
const putStudentProfile = (value) => {
  return createApi.put("/student/studentProfile", JSON.stringify(value), {
    headers: authHeader(),
  });
};
const postGiveExam = (id, value) => {
  return createApi.post(`/student/giveExam?id=${id}`, JSON.stringify(value), {
    headers: authHeader(),
  });
};

export {
  postSigninData,
  postSignupData,
  forgotPassword,
  confirmPassword,
  userResetPassword,
  showAllStudentData,
  allExamForStudent,
  verifiedStudentDataForGiveExam,
  viewStudentDetail,
  createExamPost,
  viewExam,
  deleteExamApi,
  editExamApi,
  putExamDataApi,
  studentExamPaper,
  getStudentProfile,
  putStudentProfile,
  postGiveExam,
};
