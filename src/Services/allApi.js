import createApi from "./createApi";

const postSigninData = (value) => {
  return createApi.post("/users/Login", JSON.stringify(value));
};

const postSignupData = (value) => {
  return createApi.post("/users/SignUp", JSON.stringify(value));
};

export { postSigninData ,postSignupData};
