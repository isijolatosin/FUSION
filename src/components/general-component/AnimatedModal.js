import React from "react";
import { Platform } from "react-native";
import Modal from "react-native-modal";

export default function AnimatedModal({
  children,
  isAlignItems,
  isPaddingBottom,
  isPaddingTop,
  isVisible,
  onClose,
  theme,
  width,
  isTransparent,
}) {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      onBackdropPress={onClose}
      style={{
        backgroundColor: isTransparent
          ? theme.colors.brand.basewhitelighter
          : theme.colors.brand.basewhite,
        margin: 0,
        paddingTop: isPaddingTop ? (Platform.OS === "ios" ? 150 : 100) : 0,
        position: "relative",
        alignItems: isAlignItems ? "flex-end" : "",
        paddingBottom: isPaddingBottom ? theme.spaceNumberBy10[0] : 0,
        width: width,
      }}>
      {children}
    </Modal>
  );
}
