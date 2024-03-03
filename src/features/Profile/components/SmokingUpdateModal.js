import { useState } from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { updateUserValueField } from "../../../utilities/updateFirestoreDatabaseField";
import IconComponent from "../../../components/icon-components/IconComponent";
import Button from "../../../components/utility/button.component";

export default function SmokeUpdateModal({
  theme,
  height,
  currentUser,
  onClose,
  mySmokingPreference,
}) {
  const [preference, setPreference] = useState(
    currentUser?.lifestyleHabits.smoke
  );

  const [smokingPreference, setSmokingPreference] = useState(
    currentUser.preferredSmoking ?? "Open to all"
  );

  // this is to differentiate between current user smoking preference and their preferred.
  const currentPreference = mySmokingPreference
    ? smokingPreference
    : preference;

  async function updateSmoke(value) {
    if (!value) return;

    if (mySmokingPreference) {
      setSmokingPreference(value);
      await updateUserValueField(
        "all-users",
        currentUser?.id,
        mySmokingPreference,
        value,
        () => {}
      );
    } else {
      setPreference(value);

      const updatedValue = {
        cannabis: currentUser?.lifestyleHabits.cannabis,
        drink: currentUser?.lifestyleHabits.drink,
        gym: currentUser?.lifestyleHabits.gym,
        smoke: value ?? currentUser?.lifestyleHabits.smoke,
      };

      await updateUserValueField(
        "all-users",
        currentUser?.id,
        "lifestyleHabits",
        updatedValue,
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
          {mySmokingPreference ? "Smoking Preference" : "Smoking"}
        </Text>
      </View>
      <HorizontalPaddingSpace space={theme.space[3]}>
        <Spacer position="top" size="xxxlarge">
          <Spacer position="top" size="xxxxlarge">
            <Button
              backgroundColor={
                currentPreference === "Not my thing"
                  ? theme.colors.brand.base
                  : theme.colors.brand.highlight
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => updateSmoke("Not my thing")}
              text="Not my thing"
              textColor={
                currentPreference === "Not my thing"
                  ? theme.colors.brand.basewhite
                  : theme.colors.brand.black
              }
            />
          </Spacer>
          <Spacer position="top" size="small">
            <Button
              backgroundColor={
                currentPreference === "Socially"
                  ? theme.colors.brand.base
                  : theme.colors.brand.highlight
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => updateSmoke("Socially")}
              text="Socially"
              textColor={
                currentPreference === "Socially"
                  ? theme.colors.brand.basewhite
                  : theme.colors.brand.black
              }
            />
          </Spacer>
          <Spacer position="top" size="small">
            <Button
              backgroundColor={
                currentPreference === "Frequently"
                  ? theme.colors.brand.base
                  : theme.colors.brand.highlight
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => updateSmoke("Frequently")}
              text="Frequently"
              textColor={
                currentPreference === "Frequently"
                  ? theme.colors.brand.basewhite
                  : theme.colors.brand.black
              }
            />
          </Spacer>
          <Spacer position="top" size="small">
            <Button
              backgroundColor={
                currentPreference === "Sometimes"
                  ? theme.colors.brand.base
                  : theme.colors.brand.highlight
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => updateSmoke("Sometimes")}
              text="Sometimes"
              textColor={
                currentPreference === "Sometimes"
                  ? theme.colors.brand.basewhite
                  : theme.colors.brand.black
              }
            />
          </Spacer>
          <Spacer position="top" size="small">
            <Button
              backgroundColor={
                currentPreference === "Open to all"
                  ? theme.colors.brand.base
                  : theme.colors.brand.highlight
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => updateSmoke("Open to all")}
              text="Open to all"
              textColor={
                currentPreference === "Open to all"
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
