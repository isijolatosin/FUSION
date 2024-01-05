import { Linking } from "react-native";

function detectPhoneNumber(text) {
  const phoneRegex =
    /^(\+?\d{1,4}?)?[-. ]?(\(\d{1,}\))?[.\- ]?\d{1,}([.\-]?\d{1,}){1,}$/;
  return phoneRegex.test(text);
}

function handleCallPress(text) {
  if (detectPhoneNumber(text)) {
    const phoneNumber = text.replace(/[^0-9]/g, ""); // Extract only digits
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl);
  }
}

function detectUrl(text) {
  // Regular expression to check if a string is a URL
  const urlRegex = text.match(/^(https:\/\/|www\.)/i);

  return urlRegex;
}

function handleUrlPress(url) {
  if (url) {
    Linking.openURL(url);
  }
}

export { detectPhoneNumber, handleCallPress, detectUrl, handleUrlPress };
