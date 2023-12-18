import { View } from "react-native";
import styled from "styled-components/native";

export const SpaceArea = styled(View)`
	padding-left: ${(props) => props.theme.space[3]};
	padding-right: ${(props) => props.theme.space[3]};
`;
