import { useState } from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { updateUserValueField } from "../../../utilities/updateFirestoreDatabaseField";
import IconComponent from "../../../components/icon-components/IconComponent";
import InputComponent from "../../../components/Input-Forms/InputComponent";

export default function EmailUpdateModal({ theme, currentUser, onClose }) {
  const [workplace, setEmail] = useState(currentUser?.email);

  async function updateWorkPlace(value) {
    setEmail(value.toLowerCase());

    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "email",
      value.toLowerCase(),
      () => {}
    );
  }

  return (
    <HorizontalPaddingSpace
      style={{
        marginTop: -theme.spaceNumberBy50[10] + theme.spaceNumberBy10[5],
      }}
      space={theme.space[4]}>
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
            Email
          </Text>
        </View>
        <Spacer position="top" size="xlarge">
          <HorizontalPaddingSpace space={theme.space[4]}>
            <InputComponent
              includeIcon={false}
              keyboardType="default"
              setValue={updateWorkPlace}
              value={workplace}
              width="100%"
              isCountryCode={false}
              isBackgroundColor={false}
              fontSize={theme.fontSizes.title}
              fontType={theme.fonts.montserratBold}
              placeholder="Enter your email address"
            />
          </HorizontalPaddingSpace>
        </Spacer>
      </Spacer>
    </HorizontalPaddingSpace>
  );
}
