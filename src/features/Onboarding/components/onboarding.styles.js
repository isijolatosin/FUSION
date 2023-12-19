import styled from "styled-components/native";

const NavigationBar = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const InputWarraper = styled.View`
	display: flex;
	flex-direction: row;
	align-items: "center";
	justify-content: "space-between";
	gap: ${(props) => props.theme.space[2]};
`;

const PopupModal = styled.View`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 10;
	background-color: ${(props) => props.theme.colors.brand.white};
	opacity: 0.7;
	height: ${(props) => `${props.height}px`};
`;

const ViewContainer = styled.View`
	position: "relative";
	width: 100%;
`;

export { NavigationBar, InputWarraper, PopupModal, ViewContainer };
