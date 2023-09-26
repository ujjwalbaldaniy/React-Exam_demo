const createExamValidation = (
  examFormValidation,
  setExamFormValidation,
  questions,
  activeQuestion,
  examState,
  selectRadioBtnAnswer
) => {
  const activeQues = questions[activeQuestion];
  let error = {};

  if (!examState.subjectName) {
    error.subjectName = "Please Fill Subject Name";
  }

  if (!activeQues.question) {
    error.question = "Please Fill Question Name";
  } else {
    const currentQue = activeQues?.question;
    const filtered = questions?.filter(
      (item, index) => item?.question === currentQue && index !== activeQuestion
    );
    if (filtered.length !== 0) {
      error.question = "Please Enter unique question";
    }
  }

  if (!activeQues.options.map((item) => item).every((item) => item !== "")) {
    error.options = "Please Fill Options Name";
  } else {
    const questionOptions = activeQues?.options;
    const filtered = questionOptions.some(
      (option, index) => questionOptions.indexOf(option) !== index
    );
    if (filtered) {
      error.options = "Please Enter unique options";
    }
  }

  if (!selectRadioBtnAnswer[activeQuestion]) {
    error.answer = "Please Select the Answer";
  }

  if (!examState.notes) {
    error.notes = "Please Fill Notes Name";
  }
  setExamFormValidation({ ...error });
  return Object.keys(error).length < 1;
};

export default createExamValidation;

const studentExamValidation = (
  examFormValidation,
  setExamFormValidation,
  selectRadioBtnAnswer,
  activeQuestion
) => {
  let error = {};
  if (!selectRadioBtnAnswer[activeQuestion]) {
    error.answer = "Please Select the Answer";
  }
  setExamFormValidation({ ...error });
  return Object.keys(error).length < 1;
};

export { studentExamValidation };
