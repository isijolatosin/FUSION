import React from "react";
import { useNavigation } from "@react-navigation/native";

import { useAppContext } from "../../context/ThemeContext";
import { SafeArea } from "../utility/safe-area.component";
import { Text } from "../typography/text.component";
import { HorizontalPaddingSpace } from "../utility/space-area.component";
import Button from "../utility/button.component";
import BrandAvatar from "./BrandAvatar";
import { Spacer } from "../spacer/spacer.component";

export default function CustomUseCardWithCTA({ text, buttonText, route }) {
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
      <HorizontalPaddingSpace
        style={{ alignItems: "center", gap: theme.spaceNumberBy10[3] }}
        space={theme.space[5]}>
        <Spacer position="bottom" size="large">
          <BrandAvatar noFlex={true} width={150} />
        </Spacer>
        <Text
          style={{ textAlign: "center" }}
          variant="title"
          colorType="black"
          fontType="montserratRegular"
          fontSize="caption">
          {text}
        </Text>
        <Button
          backgroundColor={theme.colors.brand.base}
          isBorder={false}
          borderColor="transparent"
          buttonFunction={() => navigation.navigate(route)}
          text={buttonText}
          textColor={theme.colors.brand.basewhite}
          width="80%"
        />
      </HorizontalPaddingSpace>
    </SafeArea>
  );
}
