import firebase from "firebase/compat/app";

import verifyUserInDatabaseBeforeSignin from "./verifyUserInDatabaseBeforeSignIn";
import { storeData } from "./storeDataInPhoneMemory";

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
        navigation.navigate("otp-screen", {
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
    .then(async (_res) => {
      // Check for an existing profile only once the user is signed in,
      // so the Firestore rules can require sign-in to read profiles.
      const isExistingUser = await verifyUserInDatabaseBeforeSignin(phonenumber);

      if (isExistingUser) {
        storeData("phonenumber", phonenumber);
        navigation.navigate("main", { phonenumber });
      } else {
        navigation.navigate(`${destination}`, { phonenumber });
      }
    })
    .catch((error) => {
      setVerificationErrorMessage(error.message);
    })
    .finally(() => {
      setVerificationCode("");
    });
};
