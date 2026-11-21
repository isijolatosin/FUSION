import React, { useEffect, useRef, useState } from "react";

import { useAppContext } from "../../context/ThemeContext";
import {
  HiddenCodeTextInput,
  CodeInputWrapper,
  OTPInputContainer,
  OTPInput,
  OTPInputText,
  OTPInputFocused,
} from "./input.styles";
import { confirmVerificationCode } from "../../utilities/verification";

export default function OTPInputComponent({
  keyboardType,
  width,
  pinReady,
  setPinReady,
  verificationCode,
  setVerificationCode,
  maxlength,
  verificationId,
  navigation,
  phonenumber,
  setVerificationErrorMessage,
}) {
  const textInputRef = useRef(null);
  const codeDigitsArray = new Array(maxlength).fill(0);
  const {
    state: { theme },
  } = useAppContext();

  const [inputContainerIsFocused, setInputContainerIsFocused] = useState(false);

  function handleOnPress() {
    setInputContainerIsFocused(true);
    textInputRef?.current?.focus();
  }

  function handleOnBlur() {
    setInputContainerIsFocused(false);
  }

  useEffect(() => {
    setPinReady(verificationCode.length === maxlength);

    return () => setPinReady(false);
  }, [verificationCode]);

  function toCodeDigitInput(_value, index) {
    const emptyInputChar = " ";
    const digit = verificationCode[index] || emptyInputChar;

    const isCurrentDigit = index === verificationCode.length;
    const isLastDigit = index === maxlength - 1;
    const isInputMaxed = verificationCode.length === maxlength;

    const isDigitFocused = isCurrentDigit || (isLastDigit && isInputMaxed);

    const StyledOTPInput =
      inputContainerIsFocused && isDigitFocused ? OTPInputFocused : OTPInput;

    return (
      <StyledOTPInput key={index}>
        <OTPInputText>{digit}</OTPInputText>
      </StyledOTPInput>
    );
  }

  // New users go to onboarding. Existing users are sent to "main" by
  // confirmVerificationCode, which checks the database after sign-in.
  const destination = "capture-name-screen";

  if (pinReady) {
    confirmVerificationCode(
      verificationId,
      verificationCode,
      setVerificationCode,
      navigation,
      phonenumber,
      setVerificationErrorMessage,
      destination
    );
  }

  return (
    <CodeInputWrapper>
      <OTPInputContainer onPress={handleOnPress}>
        {codeDigitsArray.map(toCodeDigitInput)}
      </OTPInputContainer>
      <HiddenCodeTextInput
        onChangeText={setVerificationCode}
        value={verificationCode}
        keyboardType={keyboardType}
        maxLength={maxlength}
        theme={theme}
        width={width}
        ref={textInputRef}
        onBlur={handleOnBlur}
        returnKeyType="done"
        textContentType="oneTimeCode"
      />
    </CodeInputWrapper>
  );
}
