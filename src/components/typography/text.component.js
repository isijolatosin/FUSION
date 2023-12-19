import styled from "styled-components/native";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const body = (theme) => `
    font-size: ${theme.fontSizes.body};
    letter-spacing: ${theme.letterSpacing[0]};
`;

const hint = (theme) => `
    font-size: ${theme.fontSizes.body};
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.brand.orange};
    `;

const error = (theme) => `
    color: ${theme.colors.text.error};
    font-family: ${theme.fonts.regular};
`;

const caption = (theme) => `
    font-family: ${theme.fonts.semibold};
    font-size: ${theme.fontSizes.caption};
`;
const captionlight = (theme) => `
    font-family: ${theme.fonts.regular};
    font-size: ${theme.fontSizes.caption};
`;

const heading = (theme) => `
    font-family: ${theme.fonts.bold};
    font-size: ${theme.fontSizes.h5};
`;

const headingSlim = (theme) => `
    font-family: ${theme.fonts.playfairbold};
    font-size: ${theme.fontSizes.h4};
`;

const subHeading = (theme) => `
    font-family: ${theme.fonts.regular};
    font-size: ${theme.fontSizes.title};
`;
const popupText = (theme) => `
    font-family: ${theme.fonts.bold};
    font-size: ${theme.fontSizes.button};
    text-align: center;
    background-color: ${theme.colors.brand.white};
    elevation: 5;
    shadowColor: ${theme.colors.text.primary};
    shadowOpacity: 0.3;
    shadowRadius: 5px;
    padding: ${theme.space[8]} ${theme.space[5]};
`;

const variants = {
	body,
	caption,
	captionlight,
	error,
	heading,
	headingSlim,
	hint,
	popupText,
	subHeading,
};

export const Text = styled.Text`
	${({ theme }) => defaultTextStyles(theme)}
	${({ variant, theme }) => variants[variant](theme)}
    width: ${(props) => props.width};
`;

Text.defaultProps = {
	variant: "body",
};
