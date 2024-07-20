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
  const [genderInterest, setGenderInterest] = useState(
    currentUser?.interest ?? ""
  );

  async function updateHeight() {
    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "interest",
      genderInterest,
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
          iconFunction={() => {
            updateHeight();
            onClose();
          }}
          iconName="keyboard-arrow-left"
          IconComponent={MaterialIcons}
          size={theme.spaceNumberBy10[2]}
          color={theme.colors.brand.base1}
          horizontalLeftSpace={`-${theme.spaceNumberBy10[0]}px`}
        />
        <Text
          style={{ textAlign: "center", width: "90%" }}
          variant="custom"
          colorType="base1"
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
                  ? theme.colors.brand.base6
                  : theme.colors.brand.base8
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => setGenderInterest("woman")}
              text="Women"
              textColor={theme.colors.brand.base1}
            />
          </Spacer>
          <Spacer position="top" size="small">
            <Button
              backgroundColor={
                genderInterest === "man"
                  ? theme.colors.brand.base6
                  : theme.colors.brand.base8
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => setGenderInterest("man")}
              text="Men"
              textColor={theme.colors.brand.base1}
            />
          </Spacer>
          <Spacer position="top" size="small">
            <Button
              backgroundColor={
                genderInterest === "both"
                  ? theme.colors.brand.base6
                  : theme.colors.brand.base8
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => setGenderInterest("both")}
              text="Both"
              textColor={theme.colors.brand.base1}
            />
          </Spacer>
        </Spacer>
      </HorizontalPaddingSpace>
    </View>
  );
}
