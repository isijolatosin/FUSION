function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function validatePhoneNumber(phoneNumber) {
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");
  const phoneNumberRegex = /^\d{10}$/;
  return phoneNumberRegex.test(cleanedPhoneNumber);
}

export { validateEmail, validatePhoneNumber };
