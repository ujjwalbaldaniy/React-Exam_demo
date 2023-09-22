const createExamValidation = (
  examFormValidation,
  setExamFormValidation,
  questions,
  activeQuestion,
  examState,
  selectRadioBtnAnswer
) => {
  const activeQues = questions[activeQuestion];

  if (!examState.subjectName) {
    setExamFormValidation({
      ...examFormValidation,
      subjectName: "Please Fill Subject Name",
    });
    return false;
  }

  if (!activeQues.question) {
    setExamFormValidation({
      ...examFormValidation,
      question: "Please Fill Question Name",
    });
    return false;
  }

  if (!activeQues.options.map((item) => item).every((item) => item !== "")) {
    setExamFormValidation({
      ...examFormValidation,
      options: "Please Fill Options Name",
    });
    return false;
  }

  if (!selectRadioBtnAnswer[activeQuestion]) {
    setExamFormValidation({
      ...examFormValidation,
      answer: "Please Select the Answer",
    });
    return false;
  }

  if (!examState.notes) {
    setExamFormValidation({
      ...examFormValidation,
      notes: "Please Fill Notes Name",
    });
    return false;
  }

  return true;
};

export default createExamValidation;
