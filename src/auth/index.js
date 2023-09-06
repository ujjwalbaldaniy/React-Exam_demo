export const isLogginTeacher = () => {
  let data = JSON.parse(localStorage.getItem("user"));
  if (data && data.role === "teacher") {
    return true;
  } else {
    return false;
  }
};

export const isLogginStudent = () => {
  let data = JSON.parse(localStorage.getItem("user"));
  if (data && data.role === "student") {
    return true;
  } else {
    return false;
  }
};
