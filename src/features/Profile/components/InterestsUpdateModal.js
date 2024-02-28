import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { updateUserValueField } from "../../../utilities/updateFirestoreDatabaseField";
import IconComponent from "../../../components/icon-components/IconComponent";
import { interests } from "../../../constants";

export default function InterestsUpdateModal({
  interestValue,
  theme,
  height,
  currentUser,
  onClose,
}) {
  const [initialInterest, setInitialInterest] = useState(interestValue);
  const userInterestsArray = currentUser?.interestsArray;
  const currentInterestIndex = userInterestsArray.findIndex(
    (el) => el === interestValue
  );

  async function updateInterests(value) {
    if (!value) return;
    userInterestsArray.splice(currentInterestIndex, 1, value);

    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "interestsArray",
      userInterestsArray,
      () => {}
    );
  }

  function handleInterest(int) {
    if (!int) return;

    setInitialInterest(int);
    updateInterests(int);
  }

  return (
    <View style={{ height: height }}>
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 0.5,
          borderBottomColor: theme?.colors.brand.linesLighter,
          paddingBottom: theme?.spaceNumber[5],
        }}>
        <IconComponent
          iconFunction={onClose}
          iconName="keyboard-arrow-left"
          IconComponent={MaterialIcons}
          size={theme?.spaceNumberBy10[2]}
          color={theme?.colors.brand.brandFade}
          horizontalLeftSpace={`-${theme?.spaceNumberBy10[0]}px`}
        />
        <Text
          style={{ textAlign: "center", width: "90%" }}
          variant="custom"
          colorType="black"
          fontType="montserratBold"
          fontSize="title">
          {initialInterest}
        </Text>
      </View>
      <Spacer position="top" size="xxxlarge">
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: theme?.spaceNumberBy50[3] - 40 }}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 6,
            }}>
            {interests?.sort().map((interest, idx) => (
              <Pressable
                onPress={() => handleInterest(interest.value)}
                key={idx}
                style={{
                  flexDirection: "row",
                  backgroundColor:
                    initialInterest === interest.value
                      ? theme?.colors.brand.base
                      : theme?.colors.brand.highlight,
                  paddingRight: theme?.spaceNumber[6],
                  paddingLeft: theme?.spaceNumber[3],
                  paddingVertical: theme?.spaceNumber[3],
                  borderRadius: theme?.spaceNumberBy10[9],
                }}>
                <IconComponent
                  iconFunction={() => {}}
                  iconName={interest.iconName}
                  IconComponent={interest.family}
                  size={14}
                  color={
                    initialInterest === interest.value
                      ? theme.colors.brand.highlight
                      : theme.colors.brand.brandFade
                  }
                />
                <View style={{ marginLeft: theme.spaceNumber[1] }}>
                  <Text
                    style={{
                      color:
                        initialInterest === interest.value
                          ? theme?.colors.brand.basewhite
                          : theme?.colors.brand.black,
                    }}
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button">
                    {interest.value}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </Spacer>
    </View>
  );
}
