import styled from "styled-components/native";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.brand.black};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const body = (theme) => `
    font-size: ${theme.fontSizes.body};
    letter-spacing: ${theme.letterSpacing[0]};
    font-family: ${theme.fonts.montserratRegular};
`;

const bodyBold = (theme) => `
    font-size: ${theme.fontSizes.button};
    font-family: ${theme.fonts.montserratSemibold};
`;

const bodyBoldBold = (theme) => `
    font-size: ${theme.fontSizes.title};
    font-family: ${theme.fonts.montserratBold};
`;

const loading = (theme, colorType, fontType, fontSize) => `
    font-size: ${fontSize ? theme.fontSizes[fontSize] : theme.fontSizes.title};
    font-family: ${
      fontType ? theme.fonts[fontType] : theme.fonts.montserratRegular
    };
    color: ${
      colorType ? theme.colors.brand[colorType] : theme.colors.brand.base
    };
    `;

const hint = (theme) => `
    font-size: ${theme.fontSizes.body};
    font-family: ${theme.fonts.montserratRegular};
    color: ${theme.colors.brand.base};
    `;

const error = (theme) => `
    color: ${theme.colors.brand.error};
    font-family: ${theme.fonts.montserratRegular};
`;

const caption = (theme) => `
    font-family: ${theme.fonts.montserratSemibold};
    font-size: ${theme.fontSizes.caption};
`;
const captionBig = (theme) => `
    font-family: ${theme.fonts.montserratSemibold};
    font-size: ${theme.fontSizes.button};
`;
const popButton = (theme) => `
    font-family: ${theme.fonts.montserratBold};
    font-size: ${theme.fontSizes.button};
`;

const captionlight = (theme) => `
    font-family: ${theme.fonts.montserratRegular};
    font-size: ${theme.fontSizes.caption};
`;

const heading = (theme) => `
    font-family: ${theme.fonts.montserratBold};
    font-size: ${theme.fontSizes.h5};
`;

const headingSlim = (theme) => `
    font-family: ${theme.fonts.playfairbold};
    font-size: ${theme.fontSizes.h4};
`;

const headingWhiteSlim = (theme) => `
    font-family: ${theme.fonts.playfairbold};
    font-size: ${theme.fontSizes.h2};
    color: ${theme.colors.brand.basewhite};
`;

const subHeading = (theme, colorType, fontType, fontSize, transform) => `
    font-family: ${
      fontType ? theme.fonts[fontType] : theme.fonts.montserratRegular
    };
    font-size: ${fontSize ? theme.fontSizes[fontSize] : theme.fontSizes.title};
    color: ${
      colorType ? theme.colors.brand[colorType] : theme.colors.brand.base
    };
    text-transform: ${transform ? transform : "none"};
    
`;
const popupText = (theme) => `
    font-family: ${theme.fonts.montserratRegular};
    font-size: ${theme.fontSizes.button};
    text-align: center;
    background-color: ${theme.colors.brand.basewhite};
    elevation: 5;
    shadowColor: ${theme.colors.brand.black};
    shadowOpacity: 0.3;
    shadowRadius: 5px;
    padding: ${theme.space[8]} ${theme.space[5]};
`;

const variants = {
  body,
  caption,
  captionlight,
  captionBig,
  popButton,
  error,
  heading,
  headingSlim,
  headingWhiteSlim,
  hint,
  popupText,
  subHeading,
  bodyBold,
  bodyBoldBold,
  loading,
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme, colorType, fontType, fontSize, transform }) =>
    variants[variant](theme, colorType, fontType, fontSize, transform)}
    width: ${(props) => (props.width ? props.width : "100%")};
`;

Text.defaultProps = {
  variant: "body",
};
