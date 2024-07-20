import { useState } from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { updateUserValueField } from "../../../utilities/updateFirestoreDatabaseField";
import IconComponent from "../../../components/icon-components/IconComponent";
import Button from "../../../components/utility/button.component";

export default function GymUpdateModal({
  theme,
  height,
  currentUser,
  onClose,
}) {
  const [gymPreference, setGymPreference] = useState(
    currentUser?.lifestyleHabits.gym
  );
  async function updateGym() {
    const updatedValue = {
      cannabis: currentUser?.lifestyleHabits.cannabis,
      drink: currentUser?.lifestyleHabits.drink,
      gym: gymPreference ?? currentUser?.lifestyleHabits.gym,
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
            updateGym();
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
          Gym
        </Text>
      </View>
      <HorizontalPaddingSpace space={theme.space[3]}>
        <Spacer position="top" size="xxxlarge">
          <Spacer position="top" size="xxxxlarge">
            <Button
              backgroundColor={
                gymPreference === "Active"
                  ? theme.colors.brand.base6
                  : theme.colors.brand.base8
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => setGymPreference("Active")}
              text="Active"
              textColor={theme.colors.brand.base1}
            />
          </Spacer>
          <Spacer position="top" size="small">
            <Button
              backgroundColor={
                gymPreference === "Not my thing"
                  ? theme.colors.brand.base6
                  : theme.colors.brand.base8
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => setGymPreference("Not my thing")}
              text="Not my thing"
              textColor={theme.colors.brand.base1}
            />
          </Spacer>
          <Spacer position="top" size="small">
            <Button
              backgroundColor={
                gymPreference === "Seasonal"
                  ? theme.colors.brand.base6
                  : theme.colors.brand.base8
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => setGymPreference("Seasonal")}
              text="Seasonal"
              textColor={theme.colors.brand.base1}
            />
          </Spacer>
          <Spacer position="top" size="small">
            <Button
              backgroundColor={
                gymPreference === "Sometimes"
                  ? theme.colors.brand.base6
                  : theme.colors.brand.base8
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => setGymPreference("Sometimes")}
              text="Sometimes"
              textColor={theme.colors.brand.base1}
            />
          </Spacer>
        </Spacer>
      </HorizontalPaddingSpace>
    </View>
  );
}
