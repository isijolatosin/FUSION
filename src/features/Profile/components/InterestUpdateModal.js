import { useState } from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { updateUserValueField } from "../../../utilities/updateFirestoreDatabaseField";
import IconComponent from "../../../components/icon-components/IconComponent";
import Button from "../../../components/utility/button.component";

export default function InterestUpdateModal({
  theme,
  height,
  currentUser,
  onClose,
}) {
  const [genderInterest, setGenderInterest] = useState(currentUser?.interest);
  async function updateHeight(value) {
    if (!value) return;

    setGenderInterest(value);

    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "interest",
      value,
      () => {}
    );
  }

  return (
    <View style={{ height: height }}>
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 0.5,
          borderBottomColor: theme.colors.brand.linesLighter,
          paddingBottom: theme.spaceNumber[5],
        }}>
        <IconComponent
          iconFunction={onClose}
          iconName="keyboard-arrow-left"
          IconComponent={MaterialIcons}
          size={theme.spaceNumberBy10[2]}
          color={theme.colors.brand.brandFade}
          horizontalLeftSpace={`-${theme.spaceNumberBy10[0]}px`}
        />
        <Text
          style={{ textAlign: "center", width: "90%" }}
          variant="custom"
          colorType="black"
          fontType="montserratBold"
          fontSize="title">
          Interest In
        </Text>
      </View>
      <HorizontalPaddingSpace space={theme.space[3]}>
        <Spacer position="top" size="xxxlarge">
          <Spacer position="top" size="xxxxlarge">
            <Button
              backgroundColor={
                genderInterest === "woman"
                  ? theme.colors.brand.base
                  : theme.colors.brand.highlight
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => updateHeight("woman")}
              text="Women"
              textColor={
                genderInterest === "woman"
                  ? theme.colors.brand.basewhite
                  : theme.colors.brand.black
              }
            />
          </Spacer>
          <Spacer position="top" size="small">
            <Button
              backgroundColor={
                genderInterest === "man"
                  ? theme.colors.brand.base
                  : theme.colors.brand.highlight
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => updateHeight("man")}
              text="Men"
              textColor={
                genderInterest === "man"
                  ? theme.colors.brand.basewhite
                  : theme.colors.brand.black
              }
            />
          </Spacer>
          <Spacer position="top" size="small">
            <Button
              backgroundColor={
                genderInterest === "both"
                  ? theme.colors.brand.base
                  : theme.colors.brand.highlight
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => updateHeight("both")}
              text="Both"
              textColor={
                genderInterest === "both"
                  ? theme.colors.brand.basewhite
                  : theme.colors.brand.black
              }
            />
          </Spacer>
        </Spacer>
      </HorizontalPaddingSpace>
    </View>
  );
}
