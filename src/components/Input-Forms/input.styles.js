import styled from "styled-components/native";

const TextInputWrapper = styled.View`
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	background-color: ${(props) => props.theme.colors.brand.lightorange};
	border-radius: ${(props) => props.theme.space[1]};
	padding: ${(props) => props.theme.space[3]};
	width: ${(props) => props.width};
`;
const TextInput = styled.TextInput`
	font-size: ${(props) => props.theme.fontSizes.body};
	font-family: ${(props) => props.theme.fonts.semibold};
	width: 100%;
`;
const CodeInputWrapper = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: ${(props) => props.theme.space[5]};
`;

const CodeInput = styled.TextInput`
	font-size: ${(props) => props.theme.fontSizes.h4};
	font-family: ${(props) => props.theme.fonts.semibold};
	border-bottom-width: 1px;
	border-color: ${(props) => props.theme.colors.text.disabled};
	width: 10%;
	text-align: center;
`;

export { TextInputWrapper, CodeInputWrapper, TextInput, CodeInput };
