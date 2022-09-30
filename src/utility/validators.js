export const emailValidator = (value) => {
  return String(value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const passwordValidator = (value) => {
  return String(value).match(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  );
};

export const maxLength30Validator = (value) => {
  return value.length <= 30 ? true : false;
};

export const maxLength20Validator = (value) => {
  return value.length <= 20 ? true : false;
};

export const notEmptyValidator = (value) => {
  return value ? true : false;
};
