import { countryCodes, emailAcceptableExtensions } from "../constants";

function validateEmail(email) {
  let isValid = false;
  const domain = email.trim().toLowerCase().split("@")[1];
  if (!domain) return false;

  const domainExtension = domain.split(".").pop(); // Get the extension part

  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    pattern.test(email) &&
    emailAcceptableExtensions.includes(domainExtension)
  )
    isValid = true;

  return isValid;
}

function validatePhoneNumber(phoneNumber) {
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");
  const phoneNumberRegex = /^\d{10}$/;
  return phoneNumberRegex.test(cleanedPhoneNumber);
}

function validatePhoneCode(code) {
  return countryCodes.includes(code);
}

export { validateEmail, validatePhoneNumber, validatePhoneCode };
