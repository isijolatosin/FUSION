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

export default function SharePlayListUpdateModal({
  theme,
  currentUser,
  onClose,
}) {
  const [playlist, setPlaylistLink] = useState(currentUser?.playlist?.link);
  const [isVisibleOnProfile, setIsVisibleOnProfile] = useState(
    currentUser?.playlist?.visibleOnProfile
  );

  async function updatePlaylistLink(value, visibilityOption) {
    setPlaylistLink(value.toLowerCase());

    updatedValue = {
      visibleOnProfile: visibilityOption ?? isVisibleOnProfile,
      link: value.toLowerCase() ?? playlist,
    };

    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "playlist",
      updatedValue,
      () => {}
    );
  }

  async function handleCheckboxToggle() {
    setIsVisibleOnProfile(!isVisibleOnProfile);
    updatePlaylistLink(playlist, !isVisibleOnProfile);
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
            Your Playlist Link
          </Text>
        </View>
        <Spacer position="top" size="xxxlarge">
          <InputComponent
            includeIcon={false}
            keyboardType="default"
            setValue={updatePlaylistLink}
            value={playlist}
            width="100%"
            isCountryCode={false}
            isBackgroundColor={false}
            fontSize={theme.fontSizes.title}
            fontType={theme.fonts.montserratBold}
            multiline={true}
            numberOfLines={2}
          />
        </Spacer>
        <Spacer position="top" size="xxxxlarge">
          <CheckBox
            title="Visible on your profile"
            checked={isVisibleOnProfile}
            onPress={handleCheckboxToggle}
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
