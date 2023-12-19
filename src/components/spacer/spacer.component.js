import styled from "styled-components/native";

const sizeVariant = {
	xsmall: 1,
	small: 2,
	medium: 3,
	large: 4,
	xlarge: 5,
	xxlarge: 6,
	xxxlarge: 7,
	xxxxlarge: 8,
	xxxxlarge: 9,
};

const positionVariant = {
	top: "marginTop",
	left: "marginLeft",
	right: "marginRight",
	bottom: "marginBottom",
};

const getVariant = (position, size, theme) => {
	const sizeIndex = sizeVariant[size];
	const property = positionVariant[position];
	const value = theme.space[sizeIndex];

	return `${property}:${value}`;
};

export const Spacer = styled.View`
	${({ position, size, theme }) => getVariant(position, size, theme)}
`;

Spacer.defaultProps = {
	position: "top",
	size: "small",
};
