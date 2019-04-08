const validateFormInput = (field, value, optiaonal) => {
  const error = {
    field,
    message: ""
  };

  if (field === "name") {
    if (value.length === 0) return null;
    else if (/[^A-Za-z]/.test(value))
      error.message = "Name should only contain English alphabet letters!";
    else if (/^[a-z]+[A-Za-z]*$/.test(value))
      error.message = "First letter should be uppercase!";
    else if (/[A-Z][a-z]*[A-Z]/.test(value))
      error.message = "Only first letter should be uppercase!";
    else if (/^[A-Z][a-z]*$/.test(value)) return null;
  } else if (
    field === "officePhone" ||
    field === "cellPhone" ||
    field === "sms"
  ) {
    if (value.length === 0 || /^[0-9]+$/.test(value)) return null;
    else error.message = "Please input valid number!";
  } else if (field === "email") {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(value).toLowerCase())) return null;
    else error.message = "Please input valid email!";
  } else return null;

  return error;
};

export default validateFormInput;
