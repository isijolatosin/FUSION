import React, { useRef, useState } from "react";
import { ScrollView, Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import NextNavigation from "../../../components/Next-navigation";
import { interestInstruction, interests } from "../../../constants";
import OnboardingErrorComponent from "./OnboardingErrorComponent";
import { sortByKey } from "../../../utilities/sortByKey";
import HeaderComponent from "../../../components/general-component/HeaderComponent";

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
      <HorizontalPaddingSpace space={theme.space[2]}>
        <HeaderComponent
          title="Onboarding"
          theme={theme}
          textWidth="102%"
          topSpace="small"
          LeftComp={() => (
            <IconComponent
              iconFunction={() => navigation.goBack()}
              iconName="chevron-back"
              IconComponent={Ionicons}
              size={30}
              color={theme.colors.brand.base}
            />
          )}
          RightComp={() => (
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
                }
              }}
            />
          )}
          size="title"
        />
        <HorizontalPaddingSpace space={theme.space[2]}>
          <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            style={{ height: pageError ? "81%" : "93%" }}>
            <Spacer position="top" size="large">
              <Text
                variant="custom"
                colorType="black"
                fontType="arimaMadurai"
                lineHeight={theme.lineHeights[25]}
                fontSize="h4"
                width="100%">
                Share Your Interest
              </Text>
            </Spacer>
            <Spacer
              position="top"
              size="xsmall"
              style={{
                backgroundColor: theme.colors.brand.black,
                paddingVertical: theme.spaceNumber[1],
                paddingHorizontal: theme.spaceNumber[3],
                borderRadius: theme.spaceNumber[1],
              }}>
              <Text
                variant="custom"
                colorType="basewhite"
                fontType="montserratBold"
                lineHeight={theme.lineHeights[0]}
                fontSize="caption"
                width="95%">
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
                {sortByKey(interests).map((interest, idx) => (
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
                      color={
                        interestsArray.includes(interest.value)
                          ? theme.colors.brand.highlight
                          : theme.colors.brand.base
                      }
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
                        lineHeight={theme.lineHeights[0]}
                        fontSize="button">
                        {interest.value}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            </Spacer>
          </ScrollView>
          <OnboardingErrorComponent
            pageError={pageError}
            text="Please share your interests. Only 6 interests required"
            bottomSpace={true}
            size="body"
            classes={{
              textAlign: "left",
              color: theme.colors.brand.error,
              fontFamily: theme.fonts.montserratSemibold,
              fontSize: theme.spaceNumber[7],
              marginTop: theme.spaceNumberBy10[2],
            }}
          />
        </HorizontalPaddingSpace>
      </HorizontalPaddingSpace>
    </SafeArea>
  );
}
