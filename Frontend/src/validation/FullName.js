export const FullNameValidator = (value, setFullName) => {
  let regex = /(^\w{1})|(\s+\w{1})/g;
  value = value.toLowerCase().replace(regex, (letter) => letter.toUpperCase());

  let test = /^[a-zA-Z\s]+$/.test(value);

  if (!test && value.length > 0) {
    return;
  }
  return setFullName(value);
};


