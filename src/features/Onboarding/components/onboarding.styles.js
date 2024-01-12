import styled from "styled-components/native";

const NavigationBar = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const InputWarraper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: "center";
  justify-content: "space-between";
  gap: ${(props) =>
    props.gap ? props.gap : `${props.theme.spaceNumberBy10[0]}px`};
`;

const PopupModal = styled.View`
  position: absolute;
  display: flex;
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "rgba(255, 255, 255, 0.7)"};
  height: ${(props) => (props.height ? `${props.height}px` : "100%")};
`;

const ViewContainer = styled.View`
  position: "relative";
  width: 100%;
`;

const IconAndText = styled.View`
  flex-direction: row;
`;

const LocationButtonWrapper = styled.Pressable`
  padding-top: ${(props) => props.theme.space[4]};
  padding-bottom: ${(props) => props.theme.space[4]};
  border-bottom-width: ${(props) => (props.noBorderBottom ? 0 : "1px")};
  border-color: ${(props) => props.theme.colors.brand.lines};
  width: 100%;
`;

const LocationButtonText = styled.Text`
  font-family: ${(props) => props.theme.fonts.montserratSemibold};
  text-align: center;
`;

const YouAreSpecialCircleWrapper = styled.View`
  background-color: ${(props) =>
    props.color
      ? props.theme.colors.brand[props.color]
      : props.theme.colors.brand.highlight};
  width: ${(props) => (props.width ? props.width + "px" : "300px")};
  height: ${(props) => (props.width ? `${props.width}px` : "300px")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => (props.width ? `${props.width}px` : "150px")};
  padding: 30px;
`;

const YouAreSpecialCircleText = styled.Text`
  font-family: ${(props) => props.theme.fonts.playfairbold};
  font-size: ${(props) => props.theme.fontSizes.h4};
  width: 85%;
  text-align: left;
`;

export {
  NavigationBar,
  InputWarraper,
  PopupModal,
  ViewContainer,
  IconAndText,
  LocationButtonWrapper,
  LocationButtonText,
  YouAreSpecialCircleWrapper,
  YouAreSpecialCircleText,
};
