import { emailRegex, nameRegex, passwordRegex } from "./regex";
import {
  ConfirmPassword,
  Password,
  email,
  name,
  oldPassword,
  password,
} from "./validationConstants";

const formValidation = (pattern, value, passwordValue) => {
  switch (pattern) {
    case name:
      if (value.trim().length < 2) {
        return "Name must be at least 2 characters";
      } else if (!nameRegex.test(value)) {
        return "Name cannot contain numbers or special characters";
      }
      break;

    case email:
      if (!emailRegex.test(value)) {
        return "Invalid email format";
      }
      break;

    case Password:
      if (!passwordRegex.test(value)) {
        return "The password should be at least 8 characters long & password should contain at least one uppercase letter, one lowercase letter, and one number. ";
      }
      break;

    case oldPassword:
      if (!passwordRegex.test(value)) {
        return "The password should be at least 8 characters long & password should contain at least one uppercase letter, one lowercase letter, and one number. ";
      }
      break;

    //for signin & signup
    case password:
      if (!passwordRegex.test(value)) {
        return "The password should be at least 8 characters long & password should contain at least one uppercase letter, one lowercase letter, and one number. ";
      }
      break;

    case ConfirmPassword:
      if (value !== passwordValue) {
        return "Passwords do not match";
      }
      break;

    default:
      return false;
  }
};

export default formValidation;
