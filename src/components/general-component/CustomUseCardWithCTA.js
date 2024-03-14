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

  return (
    <SafeArea
      style={{
        backgroundColor: theme.colors.brand.basewhite,
        justifyContent: "center",
      }}>
      <HeaderComponent
        title={headingTitle}
        theme={theme}
        LeftComp={() => <></>}
        RightComp={() => <></>}
      />
      <View style={{ flex: 1, marginTop: theme.spaceNumberBy10[5] }}>
        <IllustrationContainer
          ImageComponent={ImageComponent}
          spaceSize={spaceSize}
          theme={theme}
        />
        <HorizontalPaddingSpace
          style={{ alignItems: "center", gap: theme.spaceNumberBy10[3] }}
          space={theme.space[7]}>
          <Text
            style={{ textAlign: "center" }}
            variant="custom"
            colorType="black"
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
              backgroundColor={theme.colors.brand.base}
              isBorder={false}
              borderColor="transparent"
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
            {showSecondButton && (
              <Button
                backgroundColor={theme.colors.brand.basewhite}
                isBorder={true}
                borderColor={theme.colors.brand.base}
                borderRadius={theme.space[3]}
                buttonFunction={() => {
                  setIndex(0);
                  storeData("swipe-index", 0);
                }}
                text={buttonSecondText}
                textColor={theme.colors.brand.base}
                width="80%"
              />
            )}
          </HorizontalPaddingSpace>
        </Spacer>
      </View>
    </SafeArea>
  );
}
