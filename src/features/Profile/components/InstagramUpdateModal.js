import { useState } from "react";
import { View } from "react-native";
import { CheckBox } from "react-native-elements";
import { AntDesign, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { updateUserValueField } from "../../../utilities/updateFirestoreDatabaseField";
import IconComponent from "../../../components/icon-components/IconComponent";
import InputComponent from "../../../components/Input-Forms/InputComponent";

export default function InstagramUpdateModal({ theme, currentUser, onClose }) {
  const [instagram, setInstagramLink] = useState(
    currentUser?.instagram?.link ?? ""
  );
  const [isVisibleOnProfile, setIsVisibleOnProfile] = useState(
    currentUser?.instagram?.visibleOnProfile ?? false
  );

  async function updateInstagramLink(value, visibilityOption) {
    setInstagramLink(value.toLowerCase());

    const updatedValue = {
      visibleOnProfile: visibilityOption ?? isVisibleOnProfile ?? false,
      link: value.toLowerCase() ?? instagram,
    };

    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "instagram",
      updatedValue,
      () => {}
    );
  }

  async function handleCheckboxToggle() {
    setIsVisibleOnProfile(!isVisibleOnProfile);
    updateInstagramLink(instagram, !isVisibleOnProfile);
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
            color={theme.colors.brand.base1}
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
              iconName="instagram"
              IconComponent={AntDesign}
              size={30}
              color={theme.colors.brand.base6}
            />
            <View>
              <Text
                style={{
                  textAlign: "center",
                  width: "100%",
                  marginLeft: theme.spaceNumber[2],
                }}
                variant="custom"
                colorType="base6"
                fontType="montserratBold"
                fontSize="body">
                Instagram
              </Text>
            </View>
          </View>
        </View>
        <Spacer position="top" size="xxxlarge">
          <InputComponent
            includeIcon={false}
            keyboardType="default"
            setValue={updateInstagramLink}
            value={instagram}
            width="100%"
            isCountryCode={false}
            isBackgroundColor={false}
            fontSize={theme.fontSizes.title}
            fontType={theme.fonts.montserratBold}
            fontColor={theme.colors.brand.base1}
            multiline={true}
            numberOfLines={2}
          />
        </Spacer>
        <Spacer position="top" size="xxxxlarge">
          <CheckBox
            title="Visible on your profile"
            checked={isVisibleOnProfile}
            onPress={handleCheckboxToggle}
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
