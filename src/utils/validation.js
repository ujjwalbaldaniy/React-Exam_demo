import { emailRegex, nameRegex } from "./regex";

const formValidation = (name, value, passwordValue) => {
  let error = "";

  switch (name) {
    case "name":
      if (value.trim().length < 2) {
        error = "Name must be at least 2 characters";
      } else if (!nameRegex.test(value)) {
        error = "Name cannot contain numbers or special characters";
      }
      break;

    case "email":
      if (!emailRegex.test(value)) {
        error = "Invalid email format";
      }
      break;

    case "Password":
      if (value.length < 6) {
        error = "Password must be at least 6 characters";
      }
      break;

    case "oldPassword":
      if (value.length < 6) {
        error = "Password must be at least 6 characters";
      }
      break;

    //for signin & signup
    case "password":
      if (value.length < 6) {
        error = "Password must be at least 6 characters";
      }
      break;

    case "ConfirmPassword":
      if (value !== passwordValue) {
        error = "Passwords do not match";
      }
      break;

    default:
      break;
  }

  return error;
};

export default formValidation;
