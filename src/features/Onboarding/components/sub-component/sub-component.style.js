import styled from "styled-components/native";

const DropdownSelectionContainer = styled.View`
  height: 50%;
`;

const DropdownSelectionWrapper = styled.View`
  background-color: ${(props) =>
    props.isSelectionDisplayInput
      ? props.theme.colors.brand.orange
      : props.theme.colors.brand.lightorange};
  align-items: center;
  border-top-right-radius: ${(props) => props.theme.space[4]};
  border-top-left-radius: ${(props) => props.theme.space[4]};
  border-bottom-left-radius: ${(props) =>
    props.isOpen ? props.theme.space[0] : props.theme.space[4]};
  border-bottom-right-radius: ${(props) =>
    props.isOpen ? props.theme.space[0] : props.theme.space[4]};
`;

const DropdownSelectionText = styled.Text`
  font-family: ${(props) => props.theme.fonts.montserratBold};
  font-size: ${(props) => props.theme.fontSizes.body};
  width: 100%;
  text-align: center;
  padding-top: ${(props) =>
    props.Platform.OS === "ios" ? props.theme.space[5] : props.theme.space[4]};
  padding-bottom: ${(props) =>
    props.Platform.OS === "ios" ? props.theme.space[5] : props.theme.space[4]};
`;

const DropdowSelectionLists = styled.View`
  background-color: ${(props) => props.theme.colors.brand.lightorange};
  align-items: center;
`;

const DropdowSelectionItemWrapper = styled.TouchableOpacity`
  border-bottom-color: ${(props) =>
    props.isBorderBottom ? props.theme.colors.brand.primary : ""};
  padding-bottom: ${(props) => props.theme.space[4]};
  width: 100%;
  border-bottom-width: ${(props) =>
    props.isBorderBottom ? props.theme.letterSpacing[0] : 0};
  padding-top: ${(props) => props.theme.space[4]};
  flex-direction: row;
  justify-content: center;
`;

const DropdowSelectionItem = styled.Text`
  text-align: center;
  font-family: ${(props) => props.theme.fonts.montserratRegular};
  font-size: ${(props) => props.theme.fontSizes.title};
  color: ${(props) =>
    props.isSelectionDisplayInput
      ? props.theme.colors.brand.white
      : props.theme.colors.brand.secondary};
`;
export {
  DropdownSelectionContainer,
  DropdowSelectionItemWrapper,
  DropdownSelectionWrapper,
  DropdownSelectionText,
  DropdowSelectionLists,
  DropdowSelectionItem,
};
