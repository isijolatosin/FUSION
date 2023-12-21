import styled from "styled-components/native";

const NavigationBar = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InputWarraper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: "center";
  justify-content: "space-between";
  gap: ${(props) => props.theme.space[2]};
`;

const PopupModal = styled.View`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  background-color: "rgba(255,255,255, 0.7)";
  height: ${(props) => (props.height ? props.height : "100%")};
`;

const ViewContainer = styled.View`
  position: "relative";
  width: 100%;
`;

const IconAndText = styled.View`
  flex-direction: row;
`;

const LocationButtonWrapper = styled.TouchableOpacity`
  padding-top: ${(props) => props.theme.space[4]};
  padding-bottom: ${(props) => props.theme.space[4]};
  border-bottom-width: ${(props) => (props.noBorderBottom ? 0 : "1px")};
  border-color: ${(props) => props.theme.colors.text.disabled};
  width: 100%;
`;

const LocationButtonText = styled.Text`
  font-family: ${(props) => props.theme.fonts.montserratSemibold};
  text-align: center;
`;

export {
  NavigationBar,
  InputWarraper,
  PopupModal,
  ViewContainer,
  IconAndText,
  LocationButtonWrapper,
  LocationButtonText,
};
