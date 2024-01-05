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
  const urlRegex = text.match(/^(https:\/\/|www\.)/i);

  return urlRegex;
}

function handleUrlPress(url) {
  if (url) {
    Linking.openURL(url);
  }
}

function detectImageUrl(text) {
  const imageRegex = /\.(jpeg|jpg|gif|png)$/i;
  return imageRegex.test(text);
}
//
// function handleImageUrlPress(url) {
//   if (detectImageUrl(url)) {
//     Linking.openURL(url);
//   }
// }

function shortenText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - 3) + "...";
}

export {
  detectPhoneNumber,
  handleCallPress,
  detectUrl,
  handleUrlPress,
  detectImageUrl,
  shortenText,
  //   handleImageUrlPress,
};
