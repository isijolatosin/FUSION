import { View } from "react-native";
import styled from "styled-components/native";

export const SpaceArea = styled(View)`
	padding-left: ${(props) => props.space};
	padding-right: ${(props) => props.space};
`;
