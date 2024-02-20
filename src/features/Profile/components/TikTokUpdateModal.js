import { useState } from "react";
import { View } from "react-native";
import { CheckBox } from "react-native-elements";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { updateUserValueField } from "../../../utilities/updateFirestoreDatabaseField";
import IconComponent from "../../../components/icon-components/IconComponent";
import InputComponent from "../../../components/Input-Forms/InputComponent";

export default function TikTokUpdateModal({ theme, currentUser, onClose }) {
  const [tiktok, setTiktokLink] = useState(currentUser?.tiktok?.link);
  const [isVisibleOnProfile, setIsVisibleOnProfile] = useState(
    currentUser?.tiktok?.visibleOnProfile
  );

  async function updateTiktokLink(value, visibilityOption) {
    setTiktokLink(value.toLowerCase());

    updatedValue = {
      visibleOnProfile: visibilityOption ?? isVisibleOnProfile ?? false,
      link: value.toLowerCase() ?? tiktok,
    };

    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "tiktok",
      updatedValue,
      () => {}
    );
  }

  async function handleCheckboxToggle() {
    setIsVisibleOnProfile(!isVisibleOnProfile);
    updateTiktokLink(tiktok, !isVisibleOnProfile);
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "90%",
              justifyContent: "center",
            }}>
            <IconComponent
              iconFunction={() => {}}
              iconName="tiktok"
              IconComponent={FontAwesome5}
              size={30}
              color={theme.colors.brand.brandTone}
            />
            <View>
              <Text
                style={{ marginLeft: theme.spaceNumber[4] }}
                variant="custom"
                colorType="black"
                fontType="montserratBold"
                fontSize="title">
                Tiktok
              </Text>
            </View>
          </View>
        </View>
        <Spacer position="top" size="xxxlarge">
          <InputComponent
            includeIcon={false}
            keyboardType="default"
            setValue={updateTiktokLink}
            value={tiktok}
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
