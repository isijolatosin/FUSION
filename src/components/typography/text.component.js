import styled from "styled-components/native";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.brand.black};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
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

const title = (
  theme,
  colorType,
  fontType,
  fontSize,
  textAlignment,
  transform
) => `
    font-family: ${
      fontType ? theme.fonts[fontType] : theme.fonts.montserratRegular
    };
    font-size: ${fontSize ? theme.fontSizes[fontSize] : theme.fontSizes.title};
    color: ${
      colorType ? theme.colors.brand[colorType] : theme.colors.brand.base
    };
    text-transform: ${transform ? transform : "none"};
    text-align: ${textAlignment ? textAlignment : "left"};
`;
const popupText = (theme) => `
    font-family: ${theme.fonts.montserratRegular};
    font-size: ${theme.fontSizes.caption};
    text-align: center;
    background-color: ${theme.colors.brand.basewhite};
    elevation: 5;
    shadowColor: ${theme.colors.brand.black};
    shadowOpacity: 0.1;
    shadowRadius: 10px;
    padding: ${theme.space[8]} ${theme.space[5]};
`;

const variants = {
  popupText,
  title,
  loading,
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({
    variant,
    theme,
    colorType,
    fontType,
    fontSize,
    textAlignment,
    transform,
  }) =>
    variants[variant](
      theme,
      colorType,
      fontType,
      fontSize,
      textAlignment,
      transform
    )}
    width: ${(props) => (props.width ? props.width : "100%")};
`;

Text.defaultProps = {
  variant: "body",
};
