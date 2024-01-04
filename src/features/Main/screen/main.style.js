import styled from "styled-components/native";

const FilterWrapper = styled.TouchableOpacity`
  border-radius: ${(props) => props.theme.space[1]};
  margin-left: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.brand.highlight};
`;

const FilterText = styled.Text`
  padding-left: ${(props) => props.theme.sizes[1]};
  padding-right: ${(props) => props.theme.sizes[1]};
  padding-top: ${(props) => props.theme.sizes[0]};
  padding-bottom: ${(props) => props.theme.sizes[0]};
`;

const CloseButton = styled.View`
  position: fixed;
  z-index: 10;
  bottom: ${(props) => (props.spaceBottom ? props.spaceBottom : "160px")};
  width: 60px;
  height: 60px;
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

export {
  FilterWrapper,
  FilterText,
  CloseButton,
  RangeCompoentSection,
  InterestWrapper,
  ButtonAction,
};
