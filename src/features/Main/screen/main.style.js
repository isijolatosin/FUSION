import styled from "styled-components/native";

const CloseButton = styled.TouchableOpacity`
  position: fixed;
  z-index: 10;
  bottom: ${(props) => (props.spaceBottom ? props.spaceBottom : "160px")};
  width: ${(props) => (props.width ? props.width : "50px")};
  height: ${(props) => (props.height ? props.height : "50px")};
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`;

const RangeCompoentSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const InterestWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ButtonAction = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.backgroundColor
      ? props.backgroundColor
      : props.theme.colors.brand.highlight};

  width: ${(props) => (props.width ? props.width : "100%")};
  padding-top: ${(props) =>
    props.paddingTop
      ? props.paddingTop + "px"
      : props.theme.spaceNumber[7] + "px"};
  padding-bottom: ${(props) =>
    props.paddingBottom
      ? props.paddingBottom + "px"
      : props.theme.spaceNumber[7] + "px"};
  align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};
  border-top-left-radius: ${(props) =>
    props.borderTopLeftRadius && props.borderTopLeftRadius + "px"};
  border-top-right-radius: ${(props) =>
    props.borderTopRightRadius && props.borderTopRightRadius + "px"};
  border-bottom-left-radius: ${(props) =>
    props.borderBottomLeftRadius && props.borderBottomLeftRadius + "px"};
  border-bottom-right-radius: ${(props) =>
    props.borderBottomRightRadius && props.borderBottomRightRadius + "px"};
  ${(props) =>
    props.borderBottomWidth &&
    `border-bottom-width: ${props.borderBottomWidth}px `};
  ${(props) =>
    props.borderBottomColor &&
    `border-bottom-color: ${props.borderBottomColor}`};
`;

const AvatarWrapper = styled.TouchableOpacity`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  border-radius: ${(props) => `${props.borderRadius}px`};
  border: ${(props) => (props.ringBorder ? "10px" : "0px")};
  border-color: ${(props) =>
    props.ringBorder ? props.theme.colors.brand.highlight : ""};
`;

const IconComponentWraper = styled.TouchableOpacity`
  margin-top: 0;
  margin-bottom: 0;
  margin-left: ${(props) =>
    props.horizontalLeftSpace ? props.horizontalLeftSpace : 0};
  margin-right: ${(props) =>
    props.horizontalRightSpace ? props.horizontalRightSpace : 0};
  ${(props) => props.centralize && `align-items: center`};
`;

export {
  CloseButton,
  RangeCompoentSection,
  InterestWrapper,
  ButtonAction,
  AvatarWrapper,
  IconComponentWraper,
};
