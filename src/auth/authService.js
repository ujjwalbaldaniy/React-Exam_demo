import createApi from "../Services/createApi";

const postSigninData = (value) => {
  return createApi
    .post("/users/Login", JSON.stringify(value))
    .then((res) => {
      console.log(res);
      console.log(res.data.data.token);
      if (res.data.data.token) {
        localStorage.setItem("user", JSON.stringify(res.data.data));
      } else {
        return res.data.data;
      }
    })
    .catch((error) => console.log(error));
};

const postSignupData = (value) => {
  return createApi
    .post("/users/SignUp", JSON.stringify(value))
    .then((res) => {
      console.log(res);
      console.log(res.data.data.token);
      if (res.data.data.token) {
        localStorage.setItem("user", JSON.stringify(res.data.data));
      } else {
        return res.data.data;
      }
    })
    .catch((error) => console.log(error));
};

const getLocatStorageData = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const logout = () => {
  return localStorage.removeItem("user");
};

export { postSigninData, postSignupData, getLocatStorageData, logout };
