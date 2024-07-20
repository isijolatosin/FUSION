import { useState } from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { updateUserValueField } from "../../../utilities/updateFirestoreDatabaseField";
import IconComponent from "../../../components/icon-components/IconComponent";
import InputComponent from "../../../components/Input-Forms/InputComponent";

export default function NationalityUpdateModal({
  theme,
  currentUser,
  onClose,
  myNationalityPreference,
}) {
  const [nationality, setNationality] = useState(
    myNationalityPreference
      ? currentUser?.preferredNationality
        ? currentUser?.preferredNationality
        : "Open to all"
      : currentUser?.nationality
      ? currentUser?.nationality
      : "Update..."
  );

  async function updateNationality() {
    if (myNationalityPreference) {
      await updateUserValueField(
        "all-users",
        currentUser?.id,
        "preferredNationality",
        nationality ?? "",
        () => {}
      );
    } else {
      await updateUserValueField(
        "all-users",
        currentUser?.id,
        "nationality",
        nationality ?? "",
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
              updateNationality();
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
            {myNationalityPreference ? "Nationality preference" : "Nationality"}
          </Text>
        </View>
        <Spacer position="top" size="xxxlarge">
          <InputComponent
            includeIcon={false}
            keyboardType="default"
            setValue={setNationality}
            value={nationality}
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
