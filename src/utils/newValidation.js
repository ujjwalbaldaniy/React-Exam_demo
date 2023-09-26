const newValidation = (pattern, value) => {
  switch (pattern) {
    case "subjectName":
      if (value.trim() === "") {
        return "Please Fill Subject Name";
      }
      break;

    case "notes":
      if (value.trim() === "") {
        return "Please Fill Notes Name";
      }
      break;

    default:
      return false;
  }
};

export default newValidation;
