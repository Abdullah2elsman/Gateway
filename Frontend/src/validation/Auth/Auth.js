export const validationLogin = (
  email,
  password,
  setEmailError,
  setPasswordError
) => {
  let isValid = true;

  // || !/\S+@\S+\.\S+/.test(email.value)

  if (!email.value) {
    setEmailError({
      status: true,
      message: "Please enter a valid email address.",
    });
    isValid = false;
  } else {
    setEmailError({
      status: false,
      message: "",
    });
  }

  if (!password.value || password.value.length < 6) {
    setPasswordError({
      status: true,
      message: "Password must be at least 6 characters long.",
    });
    isValid = false;
  } else {
    setPasswordError({
      status: false,
      message: "",
    });
  }

  return isValid;
};

export const validationSignUp = (
  name,
  email,
  branch,
  phoneNumber,
  PasswordMatch,
  setNameError,
  setEmailError,
  setPasswordError,
  setConfirmPasswordError,
  setPhoneError,
  setBranchError
) => {
  let isValid = true;

  if (!email.value) {
    setEmailError({
      status: true,
      message: "Please enter a valid email address.",
    });
    isValid = false;
  } else {
    setEmailError({
      status: false,
      message: "",
    });
  }

  if (!PasswordMatch) {
    setPasswordError({
      status: true,
      message: "Password is required.",
    });

    setConfirmPasswordError({
      status: true,
      message: "Confirm Password is required.",
    });

    isValid = false;
  } else {
    setPasswordError({
      status: false,
      message: "",
    });
    setConfirmPasswordError({
      status: false,
      message: "",
    });
  }

  if (!name.value || name.value.length < 1) {
    setNameError({
      status: true,
      message: "Name is required.",
    });

    isValid = false;
  } else {
    setNameError({
      status: false,
      message: "",
    });
  }

  if (!phoneNumber.value || phoneNumber.value.length < 5) {
    setPhoneError({
      status: true,
      message: "Please enter a valid phone number.",
    });

    isValid = false;
  } else {
    setPhoneError({
      status: false,
      message: "",
    });
  }

  if (!branch.value || branch.value.length < 1) {
    {
      setBranchError &&
        setBranchError({
          status: true,
          message: "Branch is required.",
        });

      isValid = false;
    }
  } else {
    {
      setBranchError &&
        setBranchError({
          status: false,
          message: "",
        });
    }
  }

  return isValid;
};
