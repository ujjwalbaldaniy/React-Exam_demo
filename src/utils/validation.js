export const validation = ({ values }) => {
  const formError = {};

  if (values.email === "") {
    formError.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    formError.email = "Invalid email address";
  }

  if (values.password === "") {
    formError.password = "Password is Required";
  } else if (values.password.length < 6) {
    formError.password = "password should be at least 6 char";
  }

  return formError;
};
