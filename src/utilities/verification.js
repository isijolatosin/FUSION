import firebase from "firebase/compat/app";

export const sendVerification = (
  phonenumber,
  recaptchaVerifier,
  setPhonenumber,
  setCountryCode,
  navigation
) => {
  const phoneProvider = new firebase.auth.PhoneAuthProvider();
  phoneProvider
    .verifyPhoneNumber(phonenumber, recaptchaVerifier?.current)
    .then((response) => {
      if (response) {
        navigation.navigate("otp-page", {
          phonenumber,
          response,
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
  dispatch,
  phonenumberPlusCountryCode,
  setVerificationErrorMessage
) => {
  const credential = new firebase.auth.PhoneAuthProvider.credential(
    verificationId,
    verificationCode
  );

  firebase
    .auth()
    .signInWithCredential(credential)
    .then((res) => {
      console.log("res message", res);
      setVerificationCode("");
      navigation.navigate("bio-page", { isNewUser: res.isNewUser });

      dispatch({ type: "SET_USER_PHONE", payload: phonenumberPlusCountryCode });
    })
    .catch((error) => {
      setVerificationErrorMessage(error.message);
    });
};
