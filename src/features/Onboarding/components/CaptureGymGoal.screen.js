import React, { useEffect, useState } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import NextNavigation from "../../../components/Next-navigation";
import OnboardingErrorComponent from "./OnboardingErrorComponent";
import HeaderComponent from "../../../components/general-component/HeaderComponent";
import { ScrollView } from "react-native-gesture-handler";
import { getAllData } from "../../../utilities/updateFirestoreDatabaseField";

export default function CaptureGymGoalScreen({ navigation }) {
  const { width } = Dimensions.get("window");
  const [gymGoalsArray, setGymGoals] = useState([]);
  const [pageError, setPageError] = useState(false);
  const [gymGoalsKey, setGymGoalsKey] = useState([]);
  const [gymGoalsObject, setGymGoalsObject] = useState({});
  const {
    state: { theme },
  } = useAppContext();

  async function fetchGymGoalsData() {
    const gymGoalKeys = await getAllData("gym-goal-keys");
    const gymGoalObject = await getAllData("gym-goals");

    setGymGoalsKey(gymGoalKeys?.[0]?.["list"]);
    setGymGoalsObject(gymGoalObject[0]);
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchGymGoalsData();
      return () => {
        // Cleanup function if needed
      };
    }, [])
  );

  useEffect(() => {
    fetchGymGoalsData();
  }, []);

  const route = useRoute();
  const { dob, _height, sexualOrientation, preference } = route.params || {};

  let checkInput = false;
  let gymGoals = [];
  if (gymGoalsArray?.length) {
    checkInput = true;
    gymGoals = [...gymGoalsArray];
  }

  function handleSelectGoals(val) {
    if (gymGoalsArray?.includes(val)) {
      const filtered = gymGoalsArray?.filter((itm) => itm !== val);
      setGymGoals(filtered);
    } else {
      setGymGoals([...gymGoalsArray, val]);
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
                if (checkInput) {
                  navigation.navigate("capture-work-place-screen", {
                    dob,
                    _height,
                    sexualOrientation,
                    preference,
                    gymGoals,
                  });
                } else {
                  setPageError(true);
                }
              }}
            />
          )}
          size="title"
        />
        <HorizontalPaddingSpace space={theme.space[3]}>
          <Spacer position="top" size="xxxxlarge">
            <Text
              variant="custom"
              colorType="lines"
              fontType="arimaMadurai"
              fontSize="h5"
              lineHeight={theme.lineHeights[25]}
              width="100%">
              Let others know
            </Text>
            <Text
              variant="custom"
              colorType="black"
              fontType="arimaMadurai"
              fontSize="h4"
              lineHeight={theme.lineHeights[25]}
              width="100%">
              your gym goals.
            </Text>
            <Text
              variant="custom"
              colorType="black"
              fontType="arimaMadurai"
              lineHeight={theme.lineHeights[0]}
              fontSize="caption"
              width="100%">
              How about you tell others of your fitness goals.
            </Text>
          </Spacer>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              width: width,
              marginTop: theme.spaceNumber[5],
              width: "100%",
              height: pageError ? "63%" : "70%",
            }}>
            <Spacer position="top" size="large">
              {gymGoalsKey.map((key) => (
                <View
                  key={key}
                  style={{
                    marginBottom: theme.spaceNumberBy10[3],
                  }}>
                  <Text
                    style={{
                      backgroundColor: theme.colors.brand.black,
                      paddingHorizontal: theme.spaceNumber[3],
                    }}
                    variant="custom"
                    colorType="base1"
                    fontType="montserratBold"
                    lineHeight={theme.lineHeights[10]}
                    fontSize="body"
                    transform="capitalize"
                    width="100%">
                    {key}
                  </Text>
                  {gymGoalsObject?.[key]?.map((goal, idx) => (
                    <TouchableOpacity
                      onPress={() => handleSelectGoals(goal)}
                      key={idx}
                      style={{
                        paddingHorizontal: theme.spaceNumber[7],
                        paddingVertical: theme.spaceNumber[0],
                        marginTop: theme.spaceNumber[1],
                        backgroundColor: gymGoalsArray?.includes(goal)
                          ? theme.colors.brand.base4
                          : "transparent",
                      }}>
                      <Text
                        variant="custom"
                        colorType="black"
                        fontType="montserratSemibold"
                        lineHeight={theme.lineHeights[10]}
                        fontSize="button"
                        transform="capitalize"
                        width="100%">
                        {goal}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </Spacer>
          </ScrollView>
          <OnboardingErrorComponent
            pageError={pageError}
            text="Please provide three words that describes you"
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
