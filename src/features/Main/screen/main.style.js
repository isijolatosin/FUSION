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
  bottom: 160px;
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

export {
  FilterWrapper,
  FilterText,
  CloseButton,
  RangeCompoentSection,
  InterestWrapper,
};
