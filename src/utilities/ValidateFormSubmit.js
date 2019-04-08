const validateFormSubmit = state => {
  const errorArray = state.error;

  if (state.name.length === 0) {
    errorArray.push({
      field: "name",
      message: "Name cannot be empty!"
    });
  }

  if (state.title.length === 0) {
    errorArray.push({
      field: "title",
      message: "Title cannot be empty!"
    });
  }

  if (state.startDate.length === 0) {
    errorArray.push({
      field: "gender",
      message: "Please select male or female!"
    });
  }

  if (state.gender.length === 0) {
    errorArray.push({
      field: "startDate",
      message: "Please input start date!"
    });
  }

  if (state.officePhone.length === 0) {
    errorArray.push({
      field: "officePhone",
      message: "Please input valid number!"
    });
  }

  if (state.cellPhone.length === 0) {
    errorArray.push({
      field: "cellPhone",
      message: "Please input valid number!"
    });
  }

  if (state.sms.length === 0) {
    errorArray.push({
      field: "sms",
      message: "Please input valid number!"
    });
  }

  if (state.email.length === 0) {
    errorArray.push({
      field: "email",
      message: "Please input email!"
    });
  }

  return errorArray;
};

export default validateFormSubmit;
