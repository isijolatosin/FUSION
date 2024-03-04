import { useState } from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { updateUserValueField } from "../../../utilities/updateFirestoreDatabaseField";
import IconComponent from "../../../components/icon-components/IconComponent";
import Button from "../../../components/utility/button.component";

export default function DrinkUpdateModal({
  theme,
  height,
  currentUser,
  onClose,
  myDrinkingPreference,
}) {
  const [preference, setPreference] = useState(
    myDrinkingPreference
      ? currentUser.preferredDrinking ?? "Open to all"
      : currentUser.lifestyleHabits.drink
  );

  async function updateSmoke() {
    if (myDrinkingPreference) {
      await updateUserValueField(
        "all-users",
        currentUser?.id,
        myDrinkingPreference,
        preference,
        () => {}
      );
    } else {
      const updatedValue = {
        cannabis: currentUser?.lifestyleHabits.cannabis,
        drink: preference ?? currentUser?.lifestyleHabits.drink,
        gym: currentUser?.lifestyleHabits.gym,
        smoke: currentUser?.lifestyleHabits.smoke,
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
          iconFunction={() => {
            updateSmoke();
            onClose();
          }}
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
          {myDrinkingPreference ? "Drinking Preference" : "Drinking"}
        </Text>
      </View>
      <HorizontalPaddingSpace space={theme.space[3]}>
        <Spacer position="top" size="xxxlarge">
          <Spacer position="top" size="xxxxlarge">
            <Button
              backgroundColor={
                preference === "Not my thing"
                  ? theme.colors.brand.base
                  : theme.colors.brand.highlight
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => setPreference("Not my thing")}
              text="Not my thing"
              textColor={
                preference === "Not my thing"
                  ? theme.colors.brand.basewhite
                  : theme.colors.brand.black
              }
            />
          </Spacer>
          <Spacer position="top" size="small">
            <Button
              backgroundColor={
                preference === "Socially"
                  ? theme.colors.brand.base
                  : theme.colors.brand.highlight
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => setPreference("Socially")}
              text="Socially"
              textColor={
                preference === "Socially"
                  ? theme.colors.brand.basewhite
                  : theme.colors.brand.black
              }
            />
          </Spacer>
          <Spacer position="top" size="small">
            <Button
              backgroundColor={
                preference === "Frequently"
                  ? theme.colors.brand.base
                  : theme.colors.brand.highlight
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => setPreference("Frequently")}
              text="Frequently"
              textColor={
                preference === "Frequently"
                  ? theme.colors.brand.basewhite
                  : theme.colors.brand.black
              }
            />
          </Spacer>
          <Spacer position="top" size="small">
            <Button
              backgroundColor={
                preference === "Sometimes"
                  ? theme.colors.brand.base
                  : theme.colors.brand.highlight
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => setPreference("Sometimes")}
              text="Sometimes"
              textColor={
                preference === "Sometimes"
                  ? theme.colors.brand.basewhite
                  : theme.colors.brand.black
              }
            />
          </Spacer>
          <Spacer position="top" size="small">
            <Button
              backgroundColor={
                preference === "Open to all"
                  ? theme.colors.brand.base
                  : theme.colors.brand.highlight
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => setPreference("Open to all")}
              text="Open to all"
              textColor={
                preference === "Open to all"
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
