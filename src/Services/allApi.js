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

// **************** TEACHER API **************** //

const showAllStudentData = () => {
  return createApi.get("/dashboard/Teachers", { headers: authHeader() });
};

export {
  postSigninData,
  postSignupData,
  forgotPassword,
  confirmPassword,
  showAllStudentData,
};
