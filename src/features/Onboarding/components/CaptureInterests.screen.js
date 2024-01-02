import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import { NavigationBar } from "./onboarding.styles";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import NextNavigation from "../../../components/Next-navigation";
import { interestInstruction, interests } from "../../../constants";
import OnboardingErrorComponent from "./OnboardingErrorComponent";

export default function CaptureInterests({ navigation }) {
  const [interestsArray, setInterests] = useState([]);
  const [pageError, setPageError] = useState(false);
  const {
    state: { theme },
  } = useAppContext();
  const route = useRoute();
  const {
    dob,
    height,
    religious,
    country,
    preference,
    whatThreeWordsDescribeYou,
    workplace,
    jobtitle,
  } = route.params || {};

  function handleInterest(int) {
    if (interestsArray.includes(int)) {
      const popedInterestsArray = interestsArray.filter((item) => item !== int);

      setInterests(popedInterestsArray);
    } else {
      setInterests([...interestsArray, int]);
    }
  }

  return (
    <SafeArea>
      <HorizontalPaddingSpace space={theme.space[5]}>
        <NavigationBar>
          <IconComponent
            iconFunction={() => navigation.goBack()}
            iconName="chevron-back"
            IconComponent={Ionicons}
            size={30}
            color={theme.colors.brand.base}
          />
          <NextNavigation
            theme={theme}
            color={theme.colors.brand.base}
            nextFunction={() => {
              if (interestsArray.length >= 6) {
                navigation.navigate("capture-lifestly-habits-screen", {
                  dob,
                  height,
                  religious,
                  country,
                  preference,
                  whatThreeWordsDescribeYou,
                  workplace,
                  jobtitle,
                  interestsArray,
                });
              } else {
                setPageError(true);
              }
            }}
          />
        </NavigationBar>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: theme.spaceNumberBy10[5] }}>
          <Spacer position="top" size="large">
            <Text variant="headingSlim" width="100%">
              Share Your Interest
            </Text>
          </Spacer>
          <Spacer position="top" size="xsmall">
            <Text variant="captionlight" width="95%">
              {interestInstruction}
            </Text>
          </Spacer>
          <Spacer position="top" size="large">
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 6,
              }}>
              {interests.map((interest, idx) => (
                <TouchableOpacity
                  onPress={() => handleInterest(interest)}
                  key={idx}
                  style={{
                    backgroundColor: interestsArray.includes(interest)
                      ? theme.colors.brand.base
                      : theme.colors.brand.highlight,
                    paddingHorizontal: theme.spaceNumber[7],
                    paddingVertical: theme.spaceNumber[3],
                    borderRadius: theme.spaceNumberBy10[9],
                  }}>
                  <Text
                    style={{
                      color: interestsArray.includes(interest)
                        ? theme.colors.brand.basewhite
                        : theme.colors.brand.black,
                    }}
                    variant="popButton">
                    {interest}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Spacer>
          <OnboardingErrorComponent
            pageError={pageError}
            text="Please share your interests. Minimum of 6 required"
            bottomSpace={true}
          />
        </ScrollView>
      </HorizontalPaddingSpace>
    </SafeArea>
  );
}
