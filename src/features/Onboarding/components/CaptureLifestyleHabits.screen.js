import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import { NavigationBar } from "./onboarding.styles";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import NextNavigation from "../../../components/Next-navigation";
import { lifestlyHabitsInstruction, LifestyleHabits } from "../../../constants";
import OnboardingErrorComponent from "./OnboardingErrorComponent";

export default function CaptureLifestyleHabits({ navigation }) {
  const [lifestyleHabits, setLifestyleHabits] = useState({
    smoke: "",
    drink: "",
  });
  const [pageError, setPageError] = useState(false);
  const {
    state: { theme },
  } = useAppContext();
  const route = useRoute();
  const {
    dob,
    _height,
    religious,
    country,
    sexualOrientation,
    preference,
    whatThreeWordsDescribeYou,
    workplace,
    jobtitle,
    interestsArray,
  } = route.params || {};

  function handleLifestyleHabits(habt, id) {
    setLifestyleHabits({ ...lifestyleHabits, ...lifestyleHabits, [id]: habt });
  }

  let checkInput = false;

  if (lifestyleHabits.smoke && lifestyleHabits.drink) checkInput = true;

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
              if (checkInput) {
                navigation.navigate("capture-photos-screen", {
                  dob,
                  _height,
                  religious,
                  country,
                  sexualOrientation,
                  preference,
                  whatThreeWordsDescribeYou,
                  workplace,
                  jobtitle,
                  interestsArray,
                  lifestyleHabits,
                });
              } else {
                setPageError(true);
              }
            }}
          />
        </NavigationBar>
        <Spacer position="top" size="large">
          <Text
            variant="custom"
            colorType="black"
            fontType="playfairbold"
            fontSize="h4"
            width="100%">
            What are your lifestyle habits?
          </Text>
        </Spacer>
        <Spacer position="top" size="xsmall">
          <Text
            variant="custom"
            colorType="black"
            fontType="montserratRegular"
            fontSize="caption"
            width="95%">
            {lifestlyHabitsInstruction}
          </Text>
        </Spacer>
        <Spacer
          style={{ flexDirection: "row", alignItems: "flex-end" }}
          position="top"
          size="xlarge">
          <IconComponent
            iconFunction={() => {}}
            iconName="cigar"
            IconComponent={MaterialCommunityIcons}
            size={25}
            color={theme.colors.brand.black}
          />
          <Text
            variant="custom"
            colorType="black"
            fontType="montserratSemibold"
            width="95%">
            How often do you smoke?
          </Text>
        </Spacer>
        <Spacer position="top" size="small">
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: theme.spaceNumber[5],
            }}>
            {LifestyleHabits.smoke.map((smoke, idx) => (
              <Pressable
                onPress={() => handleLifestyleHabits(smoke, "smoke")}
                key={idx}
                style={{
                  backgroundColor:
                    lifestyleHabits.smoke === smoke
                      ? theme.colors.brand.base
                      : theme.colors.brand.highlight,
                  paddingHorizontal: theme.spaceNumber[7],
                  paddingVertical: theme.spaceNumber[3],
                  borderRadius: theme.spaceNumberBy10[9],
                }}>
                <Text
                  style={{
                    color:
                      lifestyleHabits.smoke === smoke
                        ? theme.colors.brand.basewhite
                        : theme.colors.brand.black,
                  }}
                  variant="custom"
                  colorType="black"
                  fontType="montserratRegular"
                  fontSize="button">
                  {smoke}
                </Text>
              </Pressable>
            ))}
          </View>
        </Spacer>
        <Spacer
          style={{ flexDirection: "row", alignItems: "flex-end" }}
          position="top"
          size="xlarge">
          <IconComponent
            iconFunction={() => {}}
            iconName="glass-wine"
            IconComponent={MaterialCommunityIcons}
            size={25}
            color={theme.colors.brand.black}
          />
          <Text
            variant="custom"
            colorType="black"
            fontType="montserratSemibold"
            width="95%">
            How often do you drink?
          </Text>
        </Spacer>
        <Spacer position="top" size="small">
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: theme.spaceNumber[5],
            }}>
            {LifestyleHabits.drink.map((drink, idx) => (
              <Pressable
                onPress={() => handleLifestyleHabits(drink, "drink")}
                key={idx}
                style={{
                  backgroundColor:
                    lifestyleHabits.drink === drink
                      ? theme.colors.brand.base
                      : theme.colors.brand.highlight,
                  paddingHorizontal: theme.spaceNumber[7],
                  paddingVertical: theme.spaceNumber[3],
                  borderRadius: theme.spaceNumberBy10[9],
                }}>
                <Text
                  style={{
                    color:
                      lifestyleHabits.drink === drink
                        ? theme.colors.brand.basewhite
                        : theme.colors.brand.black,
                  }}
                  variant="custom"
                  colorType="black"
                  fontType="montserratRegular"
                  fontSize="button">
                  {drink}
                </Text>
              </Pressable>
            ))}
          </View>
        </Spacer>
        <OnboardingErrorComponent
          pageError={pageError}
          text="Please share your lifestyle habits"
        />
      </HorizontalPaddingSpace>
    </SafeArea>
  );
}
