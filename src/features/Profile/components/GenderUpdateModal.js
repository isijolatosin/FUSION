import { useState } from "react";
import { View } from "react-native";
import { CheckBox } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { updateUserValueField } from "../../../utilities/updateFirestoreDatabaseField";
import IconComponent from "../../../components/icon-components/IconComponent";

export default function GenderUpdateModal({ theme, currentUser, onClose }) {
  const [selectedInterest, setSelectedInterest] = useState(currentUser?.gender);
  const [clickedIndex, setIndex] = useState(null);

  async function handleInterestToggle(id, value) {
    setIndex(id);
    setSelectedInterest(value);

    if (value) {
      await updateUserValueField(
        "all-users",
        currentUser?.id,
        "gender",
        value,
        () => {}
      );
    }
  }

  const genderRray = [
    {
      key: "man",
      value: "man",
    },
    {
      key: "woman",
      value: "woman",
    },
    {
      key: "non-binary",
      value: "non-binary",
    },
  ];

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
            Gender
          </Text>
        </View>
      </Spacer>
      {genderRray.map((interest, idx) => (
        <Spacer
          key={idx}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          position="top"
          size="xxxlarge">
          <View>
            <Text
              onPress={() => handleInterestToggle(idx, interest.key)}
              style={{ textTransform: "capitalize" }}
              variant="loading"
              colorType="black"
              fontType="montserratLight"
              fontSize="body">
              {interest.value}
            </Text>
          </View>
          <CheckBox
            checked={selectedInterest === interest.key || clickedIndex === idx}
            onPress={() => handleInterestToggle(idx, interest.key)}
            checkedColor={theme.colors.brand.base}
            uncheckedColor={theme.colors.brand.linesLight}
            size={35}
            containerStyle={{
              padding: 0,
              margin: 0,
            }}
            wrapperStyle={{
              marginBottom: -10,
              marginRight: -10,
            }}
          />
        </Spacer>
      ))}
    </HorizontalPaddingSpace>
  );
}
