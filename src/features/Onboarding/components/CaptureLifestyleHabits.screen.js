import React, { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
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
    gym: "",
    smoke: "",
    cannabis: "",
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
    sexualOrientation,
    preference,
    nationality,
    whatThreeWordsDescribeYou,
    workplace,
    jobtitle,
    interestsArray,
  } = route.params || {};

  function handleLifestyleHabits(habt, id) {
    setLifestyleHabits({ ...lifestyleHabits, [id]: habt });
  }

  let checkInput = false;

  if (
    lifestyleHabits.smoke &&
    lifestyleHabits.drink &&
    lifestyleHabits.gym &&
    lifestyleHabits.cannabis
  )
    checkInput = true;

  return (
    <SafeArea>
      <HorizontalPaddingSpace space={theme.space[5]} style={{ flex: 1 }}>
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
                  sexualOrientation,
                  preference,
                  nationality,
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
            fontSize="h3"
            width="100%">
            What are your lifestyle habits?
          </Text>
        </Spacer>
        <Spacer position="top" size="xsmall">
          <Spacer position="bottom" size="small">
            <Text
              variant="custom"
              colorType="black"
              fontType="montserratRegular"
              fontSize="caption"
              width="95%">
              {lifestlyHabitsInstruction}
            </Text>
          </Spacer>
        </Spacer>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%", marginBottom: theme.spaceNumberBy10[2] }}>
          <Spacer
            style={{ flexDirection: "row", alignItems: "center" }}
            position="top"
            size="medium">
            <IconComponent
              iconFunction={() => {}}
              iconName="dumbbell"
              IconComponent={FontAwesome5}
              size={20}
              color={theme.colors.brand.black}
            />
            <Text
              style={{ paddingLeft: theme.spaceNumber[5] }}
              variant="custom"
              colorType="black"
              fontType="montserratBold"
              fontSize="body"
              width="95%">
              How frequently do you hit the gym ?
            </Text>
          </Spacer>
          <Spacer position="top" size="small">
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: theme.spaceNumber[5],
              }}>
              {LifestyleHabits.gym.map((gym, idx) => (
                <Pressable
                  onPress={() => handleLifestyleHabits(gym, "gym")}
                  key={idx}
                  style={{
                    backgroundColor:
                      lifestyleHabits.gym === gym
                        ? theme.colors.brand.base
                        : theme.colors.brand.highlight,
                    paddingHorizontal: theme.spaceNumber[7],
                    paddingVertical: theme.spaceNumber[3],
                    borderRadius: theme.spaceNumberBy10[9],
                  }}>
                  <Text
                    style={{
                      color:
                        lifestyleHabits.gym === gym
                          ? theme.colors.brand.basewhite
                          : theme.colors.brand.black,
                    }}
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button">
                    {gym}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Spacer>
          <Spacer
            style={{ flexDirection: "row", alignItems: "center" }}
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
              style={{ paddingLeft: theme.spaceNumber[5] }}
              variant="custom"
              colorType="black"
              fontType="montserratBold"
              fontSize="body"
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
            style={{ flexDirection: "row", alignItems: "center" }}
            position="top"
            size="xlarge">
            <IconComponent
              iconFunction={() => {}}
              iconName="cannabis"
              IconComponent={FontAwesome5}
              size={25}
              color={theme.colors.brand.black}
            />
            <Text
              style={{ paddingLeft: theme.spaceNumber[5] }}
              variant="custom"
              colorType="black"
              fontType="montserratBold"
              fontSize="body"
              width="95%">
              How often do you engage in 420-friendly activities ? (Marijuana)
            </Text>
          </Spacer>
          <Spacer position="top" size="small">
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: theme.spaceNumber[5],
              }}>
              {LifestyleHabits.cannabis.map((cannabis, idx) => (
                <Pressable
                  onPress={() => handleLifestyleHabits(cannabis, "cannabis")}
                  key={idx}
                  style={{
                    backgroundColor:
                      lifestyleHabits.cannabis === cannabis
                        ? theme.colors.brand.base
                        : theme.colors.brand.highlight,
                    paddingHorizontal: theme.spaceNumber[7],
                    paddingVertical: theme.spaceNumber[3],
                    borderRadius: theme.spaceNumberBy10[9],
                  }}>
                  <Text
                    style={{
                      color:
                        lifestyleHabits.cannabis === cannabis
                          ? theme.colors.brand.basewhite
                          : theme.colors.brand.black,
                    }}
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button">
                    {cannabis}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Spacer>
          <Spacer
            style={{ flexDirection: "row", alignItems: "center" }}
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
              style={{ paddingLeft: theme.spaceNumber[5] }}
              variant="custom"
              colorType="black"
              fontType="montserratBold"
              fontSize="body"
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
        </ScrollView>
        <OnboardingErrorComponent
          pageError={pageError}
          text="Please share your lifestyle habits"
          size="caption"
        />
      </HorizontalPaddingSpace>
    </SafeArea>
  );
}
