class XenditHelper {
  static async nameValidation(name) {
    const pattern = /^[a-zA-Z\s]*$/;
    return pattern.test(name);
  }
  static async expectedAmt(value) {
    const min = 1;
    const max = 50000000000;
    return value >= min && value <= max;
  }
  static async extIDValidationVA(id) {
    return id.length >= 1 && id.length <= 950;
  }
  static async extIDValidationDisbursement(id) {
    return id.length >= 1 && id.length <= 1000;
  }
  static async accountHolderNameValidation(name) {
    const pattern = /^[a-zA-Z\s]*$/;
    return pattern.test(name) && name.length > 0;
  }
  static async accountNumberValidationBCA(acountNumber) {
    return acountNumber.length === 10;
  }
  static accountNumberValidationGeneral(accountNumber) {
    return accountNumber.length >= 1;
  }
}

module.exports = XenditHelper;
