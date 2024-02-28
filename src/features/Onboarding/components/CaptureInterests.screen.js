import React, { useRef, useState } from "react";
import { ScrollView, Pressable, View } from "react-native";
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
  const scrollViewRef = useRef(null);
  const [interestsArray, setInterests] = useState([]);
  const [pageError, setPageError] = useState(false);
  const {
    state: { theme },
  } = useAppContext();
  const route = useRoute();
  const {
    dob,
    _height,
    religious,
    sexualOrientation,
    preference,
    nationality,
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
              if (interestsArray.length > 5 && interestsArray.length <= 6) {
                navigation.navigate("capture-lifestly-habits-screen", {
                  dob,
                  _height,
                  religious,
                  sexualOrientation,
                  preference,
                  nationality,
                  whatThreeWordsDescribeYou,
                  workplace,
                  jobtitle,
                  interestsArray,
                });
              } else {
                setPageError(true);
                if (scrollViewRef.current) {
                  scrollViewRef.current.scrollTo({
                    y: 0,
                    animated: true,
                  });
                }
              }
            }}
          />
        </NavigationBar>
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: theme.spaceNumberBy10[5] }}>
          <Spacer position="top" size="large">
            <Text
              variant="custom"
              colorType="black"
              fontType="arimaMadurai"
              fontSize="h3"
              width="100%">
              Share Your Interest
            </Text>
          </Spacer>
          <Spacer position="top" size="xsmall">
            <Text
              variant="custom"
              colorType="black"
              fontType="montserratRegular"
              fontSize="caption"
              width="95%">
              {interestInstruction}
            </Text>
          </Spacer>
          <OnboardingErrorComponent
            pageError={pageError}
            text="Please share your interests. Only 6 interests required"
            bottomSpace={false}
            size="caption"
          />
          <Spacer position="top" size="large">
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 6,
              }}>
              {interests.sort().map((interest, idx) => (
                <Pressable
                  onPress={() => handleInterest(interest.value)}
                  key={idx}
                  style={{
                    flexDirection: "row",
                    backgroundColor: interestsArray.includes(interest.value)
                      ? theme.colors.brand.base
                      : theme.colors.brand.highlight,
                    paddingHorizontal: theme.spaceNumber[7],
                    paddingVertical: theme.spaceNumber[3],
                    borderRadius: theme.spaceNumberBy10[9],
                  }}>
                  <IconComponent
                    iconFunction={() => {}}
                    iconName={interest.iconName}
                    IconComponent={interest.family}
                    size={14}
                    color={theme.colors.brand.brandFade}
                  />
                  <View>
                    <Text
                      style={{
                        marginLeft: theme.spaceNumber[1],
                        color: interestsArray.includes(interest.value)
                          ? theme.colors.brand.basewhite
                          : theme.colors.brand.black,
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
          </Spacer>
          <OnboardingErrorComponent
            pageError={pageError}
            text="Please share your interests. Only 6 interests required"
            bottomSpace={true}
            size="caption"
          />
        </ScrollView>
      </HorizontalPaddingSpace>
    </SafeArea>
  );
}
