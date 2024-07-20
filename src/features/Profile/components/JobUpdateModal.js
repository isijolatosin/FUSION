import { useState } from "react";
import { View } from "react-native";
import { CheckBox } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { updateUserValueField } from "../../../utilities/updateFirestoreDatabaseField";
import IconComponent from "../../../components/icon-components/IconComponent";
import InputComponent from "../../../components/Input-Forms/InputComponent";

export default function JobUpdateModal({ theme, currentUser, onClose }) {
  const [jobtitle, setJobtitle] = useState(currentUser?.jobtitle?.job);
  const [isVisibleOnProfile, setIsVisibleOnProfile] = useState(
    currentUser?.jobtitle?.visibleOnProfile
  );

  async function updatejobtitle() {
    const updatedValue = {
      visibleOnProfile: isVisibleOnProfile,
      job: jobtitle,
    };

    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "jobtitle",
      updatedValue ?? "",
      () => {}
    );
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
              updatejobtitle();
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
            Job Title
          </Text>
        </View>
        <Spacer position="top" size="xxxlarge">
          <InputComponent
            includeIcon={false}
            keyboardType="default"
            setValue={setJobtitle}
            value={jobtitle}
            width="100%"
            isCountryCode={false}
            isBackgroundColor={false}
            fontSize={theme.fontSizes.h5}
            fontType={theme.fonts.montserratBold}
            fontColor={theme.colors.brand.base1}
          />
        </Spacer>
        <Spacer position="top" size="xxxxlarge">
          <CheckBox
            title="Visible on your profile"
            checked={isVisibleOnProfile}
            onPress={() => setIsVisibleOnProfile(!isVisibleOnProfile)}
            checkedColor={theme.colors.brand.base6}
            uncheckedColor={theme.colors.brand.base6}
            titleProps={{
              style: {
                fontWeight: "thin",
                fontFamily: theme.fonts.montserratRegular,
                color: theme.colors.brand.base6,
              },
            }}
            wrapperStyle={{
              margin: -20,
            }}
            containerStyle={{
              backgroundColor: "transparent",
              borderWidth: 0,
            }}
          />
        </Spacer>
      </Spacer>
    </HorizontalPaddingSpace>
  );
}
