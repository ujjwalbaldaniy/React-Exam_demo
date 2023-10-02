const newValidation = (pattern, value) => {
  switch (pattern) {
    case "subjectName":
      if (!value.trim()) {
        return "Please Fill Subject Name";
      }
      break;

    case "notes":
      if (!value.trim()) {
        return "Please Fill Notes Name";
      }
      break;

    case "question":
      if (!value.trim()) {
        return "Please Fill question Name";
      }
      break;

    case "options":
      if (!value.trim()) {
        return "Please Fill options Name";
      }
      break;

    default:
      return false;
  }
};

export default newValidation;
