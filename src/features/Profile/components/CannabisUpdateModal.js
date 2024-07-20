import { useState } from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { updateUserValueField } from "../../../utilities/updateFirestoreDatabaseField";
import IconComponent from "../../../components/icon-components/IconComponent";
import Button from "../../../components/utility/button.component";

export default function CannabisUpdateModal({
  theme,
  height,
  currentUser,
  onClose,
  myCannabisPreference,
}) {
  const [preference, setPreference] = useState(
    myCannabisPreference
      ? currentUser.preferredCannabis ?? "Open to all"
      : currentUser?.lifestyleHabits.cannabis
  );

  async function updateCannabis() {
    if (myCannabisPreference) {
      await updateUserValueField(
        "all-users",
        currentUser?.id,
        myCannabisPreference,
        preference ?? "",
        () => {}
      );
    } else {
      const updatedValue = {
        cannabis: preference ?? currentUser?.lifestyleHabits.cannabis,
        drink: currentUser?.lifestyleHabits.drink,
        gym: currentUser?.lifestyleHabits.gym,
        smoke: currentUser?.lifestyleHabits.smoke,
      };

      await updateUserValueField(
        "all-users",
        currentUser?.id,
        "lifestyleHabits",
        updatedValue ?? "",
        () => {}
      );
    }
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
            updateCannabis();
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
          {myCannabisPreference ? "Cannabis Preference" : "Cannabis"}
        </Text>
      </View>
      <HorizontalPaddingSpace space={theme.space[3]}>
        <Spacer position="top" size="xxxlarge">
          <Spacer position="top" size="xxxxlarge">
            <Button
              backgroundColor={
                preference === "Not my thing"
                  ? theme.colors.brand.base6
                  : theme.colors.brand.base8
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => setPreference("Not my thing")}
              text="Not my thing"
              textColor={theme.colors.brand.base1}
            />
          </Spacer>
          <Spacer position="top" size="small">
            <Button
              backgroundColor={
                preference === "Socially"
                  ? theme.colors.brand.base6
                  : theme.colors.brand.base8
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => setPreference("Socially")}
              text="Socially"
              textColor={theme.colors.brand.base1}
            />
          </Spacer>
          <Spacer position="top" size="small">
            <Button
              backgroundColor={
                preference === "Frequently"
                  ? theme.colors.brand.base6
                  : theme.colors.brand.base8
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => setPreference("Frequently")}
              text="Frequently"
              textColor={theme.colors.brand.base1}
            />
          </Spacer>
          <Spacer position="top" size="small">
            <Button
              backgroundColor={
                preference === "Sometimes"
                  ? theme.colors.brand.base6
                  : theme.colors.brand.base8
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => setPreference("Sometimes")}
              text="Sometimes"
              textColor={theme.colors.brand.base1}
            />
          </Spacer>
          <Spacer position="top" size="small">
            <Button
              backgroundColor={
                preference === "Open to all"
                  ? theme.colors.brand.base6
                  : theme.colors.brand.base8
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => setPreference("Open to all")}
              text="Open to all"
              textColor={theme.colors.brand.base1}
            />
          </Spacer>
        </Spacer>
      </HorizontalPaddingSpace>
    </View>
  );
}
