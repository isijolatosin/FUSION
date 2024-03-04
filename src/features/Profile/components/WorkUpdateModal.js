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

export default function WorkUpdateModal({ theme, currentUser, onClose }) {
  const [workplace, setWorkplace] = useState(currentUser?.workplace?.work);
  const [isVisibleOnProfile, setIsVisibleOnProfile] = useState(
    currentUser?.workplace?.visibleOnProfile
  );

  async function updateWorkPlace() {
    updatedValue = {
      visibleOnProfile: isVisibleOnProfile,
      work: workplace,
    };

    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "workplace",
      updatedValue,
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
              updateWorkPlace();
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
            Work
          </Text>
        </View>
        <Spacer position="top" size="xxxlarge">
          <InputComponent
            includeIcon={false}
            keyboardType="default"
            setValue={setWorkplace}
            value={workplace}
            width="100%"
            isCountryCode={false}
            isBackgroundColor={false}
            fontSize={theme.fontSizes.h5}
            fontType={theme.fonts.montserratBold}
          />
        </Spacer>
        <Spacer position="top" size="xxxxlarge">
          <CheckBox
            title="Visible on your profile"
            checked={isVisibleOnProfile}
            onPress={() => setIsVisibleOnProfile(!isVisibleOnProfile)}
            checkedColor={theme.colors.brand.base}
            uncheckedColor={theme.colors.brand.brandFade}
            titleProps={{
              style: {
                fontWeight: "thin",
                fontFamily: theme.fonts.montserratRegular,
              },
            }}
            wrapperStyle={{
              margin: -20,
            }}
            containerStyle={{
              backgroundColor: theme.colors.brand.basewhite,
              borderColor: theme.colors.brand.basewhite,
            }}
          />
        </Spacer>
      </Spacer>
    </HorizontalPaddingSpace>
  );
}
