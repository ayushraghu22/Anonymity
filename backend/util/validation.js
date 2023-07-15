function isValidText(value, minLength = 1) {
  return value && value.trim().length >= minLength;
}

function isValidDate(value) {
  const date = new Date(value);
  return value && date !== "Invalid Date";
}

function isValidEmail(value) {
  return value && value.includes("@ietdavv.edu.in");
}

function isValidPassword(value, minLength = 6) {
  return value && value.trim().length >= minLength;
}

exports.isValidDate = isValidDate;
exports.isValidEmail = isValidEmail;
exports.isValidPassword = isValidPassword;
exports.isValidText = isValidText;
