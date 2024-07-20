import { useState } from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { updateUserValueField } from "../../../utilities/updateFirestoreDatabaseField";
import IconComponent from "../../../components/icon-components/IconComponent";
import InputComponent from "../../../components/Input-Forms/InputComponent";

export default function TribeUpdateModal({
  theme,
  currentUser,
  onClose,
  myTribePreference,
}) {
  const [tribe, setTribe] = useState(
    myTribePreference
      ? currentUser?.preferredTribe
        ? currentUser?.preferredTribe
        : "Open to all"
      : currentUser?.tribe
      ? currentUser?.tribe
      : "Update..."
  );

  async function updateTribe() {
    if (myTribePreference) {
      await updateUserValueField(
        "all-users",
        currentUser?.id,
        "preferredTribe",
        tribe,
        () => {}
      );
    } else {
      await updateUserValueField(
        "all-users",
        currentUser?.id,
        "tribe",
        tribe,
        () => {}
      );
    }
  }

  return (
    <HorizontalPaddingSpace style={{ marginBottom: 50 }} space={theme.space[0]}>
      <Spacer position="bottom" size="medium">
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 0.5,
            borderBottomColor: theme.colors.brand.linesLighter,
            paddingBottom: theme.spaceNumber[5],
          }}>
          <IconComponent
            iconFunction={() => {
              updateTribe();
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
            {myTribePreference ? "Tribe Preference" : "Tribe"}
          </Text>
        </View>
        <Spacer position="top" size="xxxlarge">
          <InputComponent
            includeIcon={false}
            keyboardType="default"
            setValue={setTribe}
            value={tribe}
            width="100%"
            isCountryCode={false}
            isBackgroundColor={false}
            fontSize={theme.fontSizes.h5}
            fontType={theme.fonts.montserratBold}
            fontColor={theme.colors.brand.base1}
            multiline={true}
            numberOfLines={2}
          />
        </Spacer>
      </Spacer>
    </HorizontalPaddingSpace>
  );
}
