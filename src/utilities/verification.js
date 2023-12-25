import firebase from "firebase/compat/app";

export const sendVerification = (
  phonenumber,
  recaptchaVerifier,
  setPhonenumber,
  setCountryCode,
  navigation,
  isToLogin
) => {
  const phoneProvider = new firebase.auth.PhoneAuthProvider();
  phoneProvider
    .verifyPhoneNumber(phonenumber, recaptchaVerifier?.current)
    .then((response) => {
      if (response) {
        navigation.navigate("otp-screen", {
          phonenumber,
          response,
          isToLogin,
        });

        setPhonenumber("");
        setCountryCode("");
      }
    });
};

export const confirmVerificationCode = (
  verificationId,
  verificationCode,
  setVerificationCode,
  navigation,
  phonenumber,
  setVerificationErrorMessage,
  destination
) => {
  const credential = new firebase.auth.PhoneAuthProvider.credential(
    verificationId,
    verificationCode
  );

  firebase
    .auth()
    .signInWithCredential(credential)
    .then((res) => {
      navigation.navigate(`${destination}`, { phonenumber });
    })
    .catch((error) => {
      setVerificationErrorMessage(error.message);
    })
    .finally(() => {
      setVerificationCode("");
    });
};
