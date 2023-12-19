import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const IconComponentWrapeer = styled(TouchableOpacity)`
	margin: 0 ${(props) => props.horizontalSpace};
`;

export default function IconComponent({
	horizontalSpace,
	IconComponent,
	iconFunction,
	iconName,
	size,
	color,
}) {
	return (
		<IconComponentWrapeer horizontalSpace={horizontalSpace}>
			<IconComponent
				name={iconName}
				size={size}
				color={color}
				onPress={iconFunction}
			/>
		</IconComponentWrapeer>
	);
}
