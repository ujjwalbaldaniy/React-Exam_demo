export const examInputFieldList = (
  subjectName,
  handleExamStateChange,
  activeQuestion,
  examFormValidation,
  questions,
  handleActiveQuestionChange,
  handleRadioBtnChange,
  notes
) => {
  return [
    {
      label: "Subject Name :- ",
      type: "text",
      name: "subjectName",
      placeholder: "Subject name",
      value: subjectName,
      onChange: handleExamStateChange,
      disabled: activeQuestion !== 0,
      showerrors: examFormValidation.subjectName,
    },
    {
      label: "Question :- ",
      type: "text",
      placeholder: "Question name",
      name: "question",
      value: questions[activeQuestion]?.question,
      onChange: handleActiveQuestionChange,
      showerrors: examFormValidation.question,
    },
    {
      label: "Options :- ",
      type: "radio",
      options: questions[activeQuestion]?.options,
      onChange: handleRadioBtnChange,
      answer: questions[activeQuestion]?.answer,
      showerrors: examFormValidation.options,
    },
    {
      label: "Answer :- ",
      type: "text",
      placeholder: "Answer",
      value: questions[activeQuestion]?.answer,
      readOnly: true,
      showerrors: examFormValidation.answer,
    },
    {
      label: "Notes :- ",
      type: "text",
      name: "notes",
      placeholder: "Notes",
      onChange: handleExamStateChange,
      value: notes,
      disabled: activeQuestion !== 0,
      showerrors: examFormValidation.notes,
    },
  ];
};

export const forgotPasswordFieldList = (
  formErrors,
  forgotPwChange,
  forgotPwField
) => {
  return [
    {
      name: "email",
      type: "email",
      placeholder: "email",
      lable: "Email Id :- ",
      showerrors: formErrors.email,
      onChange: forgotPwChange,
      value: forgotPwField.email,
    },
  ];
};

export const confirmPasswordFieldList = (
  formErrors,
  confirmPasswordChange,
  confirmPasswordField
) => {
  return [
    {
      name: "Password",
      type: "password",
      placeholder: "Password",
      lable: "Password :- ",
      showerrors: formErrors.Password,
      onChange: confirmPasswordChange,
      value: confirmPasswordField.Password,
    },
    {
      name: "ConfirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      lable: "Confirm Password :- ",
      showerrors: formErrors.ConfirmPassword,
      onChange: confirmPasswordChange,
      value: confirmPasswordField.ConfirmPassword,
    },
  ];
};

export const resetPasswordFieldList = (
  formErrors,
  resetPasswordChange,
  resetPasswordField
) => {
  return [
    {
      name: "oldPassword",
      type: "password",
      placeholder: "old password",
      lable: "Old Password :- ",
      showerrors: formErrors.oldPassword,
      onChange: resetPasswordChange,
      value: resetPasswordField.oldPassword,
    },
    {
      name: "Password",
      type: "password",
      placeholder: "password",
      lable: "Password :- ",
      showerrors: formErrors.Password,
      onChange: resetPasswordChange,
      value: resetPasswordField.Password,
    },
    {
      name: "ConfirmPassword",
      type: "password",
      placeholder: "confirm password",
      lable: "Confirm Password :- ",
      showerrors: formErrors.ConfirmPassword,
      onChange: resetPasswordChange,
      value: resetPasswordField.ConfirmPassword,
    },
  ];
};

export const signInFieldList = (
  formErrors,
  handleSigninChange,
  signinField
) => {
  return [
    {
      name: "email",
      type: "email",
      placeholder: "email",
      lable: "Email Id :- ",
      showerrors: formErrors.email,
      onChange: handleSigninChange,
      value: signinField.email,
    },
    {
      name: "password",
      type: "password",
      placeholder: "password",
      lable: "Password :- ",
      showerrors: formErrors.password,
      onChange: handleSigninChange,
      value: signinField.password,
    },
  ];
};

export const signUpFieldList = (
  formErrors,
  handleSignupChange,
  signupField
) => {
  return [
    {
      name: "name",
      type: "text",
      placeholder: "name",
      lable: "Name :- ",
      showerrors: formErrors.name,
      onChange: handleSignupChange,
      value: signupField.name,
    },
    {
      name: "email",
      type: "email",
      placeholder: "email",
      lable: "Email Id :- ",
      showerrors: formErrors.email,
      onChange: handleSignupChange,
      value: signupField.email,
    },
    {
      name: "password",
      type: "password",
      placeholder: "password",
      lable: "Password :- ",
      showerrors: formErrors.password,
      onChange: handleSignupChange,
      value: signupField.password,
    },
  ];
};

export const studentExamInputFieldList = (
  questions,
  activeQuestion,
  handleRadioBtnChange,
  selectRadioBtnAnswer,
  examFormValidation
) => {
  return [
    {
      label: "Question :- ",
      type: "text",
      value: questions[activeQuestion]?.question,
      readOnly: true,
    },
    {
      label: "Options :- ",
      type: "radio",
      options: questions[activeQuestion]?.options,
      onChange: handleRadioBtnChange,
      answer: questions[activeQuestion]?.answer,
    },
    {
      label: "Answer :- ",
      type: "text",
      placeholder: "answer",
      value: selectRadioBtnAnswer[activeQuestion],
      readOnly: true,
      showerrors: examFormValidation.answer,
    },
  ];
};

export const studentNameChangeFieldList = (
  formErrors,
  studentNameChange,
  studentName
) => {
  return [
    {
      name: "name",
      type: "text",
      placeholder: "name",
      lable: "Name :- ",
      showerrors: formErrors.name,
      onChange: studentNameChange,
      value: studentName.name,
    },
  ];
};
