class Validation {
  static validateEmail(email) {
    const patternEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return patternEmail.test(email);
  }

  static validatePassword(password) {
    const patternPassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    return patternPassword.test(password);
  }

  static validateString(string) {
    const patternString = /^[a-zA-Z\s]*$/;
    return patternString.test(string);
  }
}

module.exports = Validation;
