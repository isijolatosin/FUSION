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
  setPinReady,
  code,
  setCode,
  maxlength,
  verificationId,
  navigation,
  phonenumberPlusCountryCode,
  setVerificationErrorMessage,
}) {
  const textInputRef = useRef(null);
  const codeDigitsArray = new Array(maxlength).fill(0);
  const {
    state: { theme },
    dispatch,
  } = useAppContext();

  const [inputContainerIsFocused, setInputContainerIsFocused] = useState(false);

  function handleOnPress() {
    setInputContainerIsFocused(true);
    textInputRef?.current?.focus();
  }
  if (code.length === maxlength) {
    confirmVerificationCode(
      verificationId,
      code,
      setCode,
      navigation,
      dispatch,
      phonenumberPlusCountryCode,
      setVerificationErrorMessage
    );
  }

  function handleOnBlur() {
    setInputContainerIsFocused(false);
  }

  useEffect(() => {
    setPinReady(code.length === maxlength);

    return () => setPinReady(false);
  }, [code]);

  function toCodeDigitInput(_value, index) {
    const emptyInputChar = " ";
    const digit = code[index] || emptyInputChar;

    const isCurrentDigit = index === code.length;
    const isLastDigit = index === maxlength - 1;
    const isInputMaxed = code.length === maxlength;

    const isDigitFocused = isCurrentDigit || (isLastDigit && isInputMaxed);

    const StyledOTPInput =
      inputContainerIsFocused && isDigitFocused ? OTPInputFocused : OTPInput;

    return (
      <StyledOTPInput key={index}>
        <OTPInputText>{digit}</OTPInputText>
      </StyledOTPInput>
    );
  }

  return (
    <CodeInputWrapper>
      <OTPInputContainer onPress={handleOnPress}>
        {codeDigitsArray.map(toCodeDigitInput)}
      </OTPInputContainer>
      <HiddenCodeTextInput
        onChangeText={setCode}
        value={code}
        keyboardType={keyboardType}
        maxLength={maxlength}
        theme={theme}
        width={width}
        ref={textInputRef}
        onBlur={handleOnBlur}
      />
    </CodeInputWrapper>
  );
}
