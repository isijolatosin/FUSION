import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAppContext } from "../../context/ThemeContext";
import { SafeArea } from "../utility/safe-area.component";
import { Text } from "../typography/text.component";
import { HorizontalPaddingSpace } from "../utility/space-area.component";
import Button from "../utility/button.component";
import { Spacer } from "../spacer/spacer.component";
import { storeData } from "../../utilities/storeDataInPhoneMemory";
import HeaderComponent from "./HeaderComponent";
import IllustrationContainer from "./IllustrationContainer";

export default function CustomUseCardWithCTA({
  buttonSecondText,
  buttonText,
  cardFunction,
  headingTitle,
  ImageComponent,
  setIndex,
  showSecondButton,
  spaceSize,
  text,
}) {
  const navigation = useNavigation();
  const {
    state: { theme },
  } = useAppContext();
  const hasChildren = React.Children.count(ImageComponent) > 0;

  return (
    <SafeArea
      style={{
        backgroundColor: theme.colors.brand.base,
        justifyContent: "center",
      }}>
      <HeaderComponent
        title={headingTitle}
        theme={theme}
        LeftComp={() => <></>}
        RightComp={() => <></>}
      />
      <View style={{ flex: 1, marginTop: theme.spaceNumberBy10[5] }}>
        {hasChildren && (
          <IllustrationContainer
            ImageComponent={ImageComponent}
            spaceSize={spaceSize}
            theme={theme}
          />
        )}

        <HorizontalPaddingSpace
          style={{ alignItems: "center", gap: theme.spaceNumberBy10[3] }}
          space={theme.space[7]}>
          <Text
            style={{ textAlign: "center" }}
            variant="custom"
            colorType="base1"
            fontType="montserratRegular"
            fontSize="caption">
            {text}
          </Text>
        </HorizontalPaddingSpace>
        <Spacer position="top" size="xxlarge">
          <HorizontalPaddingSpace
            style={{ alignItems: "center" }}
            space={theme.space[2]}>
            <Button
              backgroundColor={theme.colors.brand.base7}
              isBorder={true}
              borderColor={theme.colors.brand.base}
              buttonFunction={cardFunction}
              text={buttonText}
              textColor={theme.colors.brand.basewhite}
              width="80%"
            />
          </HorizontalPaddingSpace>
        </Spacer>
        <Spacer position="top" size="small">
          <HorizontalPaddingSpace
            style={{ alignItems: "center" }}
            space={theme.space[2]}>
            {buttonSecondText && (
              <Button
                backgroundColor={theme.colors.brand.base8}
                isBorder={true}
                borderColor={theme.colors.brand.base}
                buttonFunction={() => {
                  setIndex(0);
                  storeData("swipe-index", 0);
                }}
                text={buttonSecondText}
                textColor={theme.colors.brand.basewhite}
                width="80%"
              />
            )}
          </HorizontalPaddingSpace>
        </Spacer>
      </View>
    </SafeArea>
  );
}
