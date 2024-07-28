import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useAppContext } from "../../../context/ThemeContext";
import { getAllData } from "../../../utilities/updateFirestoreDatabaseField";
import { retrieveData } from "../../../utilities/retrieveDataFromPhoneMemory";
import { gymNutritionPlans } from "../../../constants";
import { storeData } from "../../../utilities/storeDataInPhoneMemory";
import { Text } from "../../../components/typography/text.component";
import HeaderComponent from "../../../components/general-component/HeaderComponent";
import Loading from "../../../components/general-component/Loading";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Spacer } from "../../../components/spacer/spacer.component";
import { getCurrentHour } from "../../../utilities/formatTimestamp";

const CompatibleContainer = styled(ImageBackground)`
  flex: 0.65;
  position: relative;
`;

const Index = () => {
  const { width, height } = Dimensions.get("window");
  const {
    state: { theme },
  } = useAppContext();
  const [isLoadCard, setIsLoadCard] = useState(true);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    (async () => {
      const phoneValueFromPhoneMemory = await retrieveData("phonenumber");

      const newData = await getAllData("all-users");
      const currentUserData = newData.find(
        (data) => data.phonenumber === phoneValueFromPhoneMemory
      );
      setCurrentUser(currentUserData);

      const mealID = setTimeout(() => {
        setIsLoadCard(false);
      }, 2000);

      storeData("last-screen-visit", "meal-plan");
      return () => clearTimeout(mealID);
    })();
  }, []);

  if (isLoadCard) {
    return <Loading theme={theme} width={width} />;
  }

  const currentHour = getCurrentHour(new Date());
  let greeting = `It's Dawn ${currentUser?.firstname}`;
  let mealName = "Breakfast";
  if (currentHour >= 12) {
    greeting = `It's Daytime ${currentUser?.firstname}`;
    mealName = "Lunch";
  }
  if (currentHour >= 17) {
    greeting = `It's Dusk ${currentUser?.firstname}`;
    mealName = "Dinner";
  }

  return (
    <View
      style={{
        backgroundColor: theme.colors.brand.base,
        position: "relative",
        height: height,
      }}>
      <ScrollView showsVerticalScrollIndicator={false} horizontal pagingEnabled>
        <View style={{ flexDirection: "row" }}>
          {currentUser?.gymGoals?.map((goal, idx) => (
            <View
              key={idx}
              style={{
                width: width,
                height: height,
                position: "relative",
              }}>
              <CompatibleContainer
                source={{
                  uri:
                    `${gymNutritionPlans?.[goal]?.["diet plan"]?.breakfast?.imageurl}` ??
                    "https://meatified.com/wp-content/uploads/2018/06/Cherry-Lavender-Milk-3-WM.png",
                }}>
                <LinearGradient
                  colors={[
                    theme.colors.brand.base,
                    "transparent",
                    theme.colors.brand.base,
                  ]}
                  style={{
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    opacity: 1,
                  }}
                />
              </CompatibleContainer>
              <View
                style={{
                  top: -(theme.spaceNumberBy50[0] + theme.spaceNumberBy50[0]),
                  width: width,
                }}>
                <HeaderComponent
                  title={greeting}
                  theme={theme}
                  size="h5"
                  transform="capitalize"
                  LeftComp={() => <></>}
                  RightComp={() => <></>}
                />
                <View style={{ marginTop: -theme.spaceNumber[4] }}>
                  <Text
                    style={{ textAlign: "center" }}
                    variant="custom"
                    colorType="teal"
                    fontType="montserratBold"
                    fontSize="caption">
                    {`Your ${mealName} meal option ${idx + 1}`}
                  </Text>
                </View>
              </View>
              <HorizontalPaddingSpace
                space={theme.space[4]}
                style={{
                  backgroundColor: theme.colors.brand.base1,
                  flex: 0.35,
                  top: -(theme.spaceNumberBy50[0] + theme.spaceNumberBy10[2]),
                  borderTopRightRadius: theme.spaceNumberBy10[2],
                  borderTopLeftRadius: theme.spaceNumberBy10[2],
                  paddingVertical: theme.spaceNumberBy10[0],
                }}>
                <Spacer position="top" size="large">
                  <View
                    style={{
                      borderBottomWidth: 0.5,
                      borderBottomColor: theme.colors.brand.base4,
                      paddingBottom: theme.spaceNumber[2],
                      marginBottom: theme.spaceNumber[2],
                    }}>
                    <Text
                      variant="custom"
                      colorType="base"
                      fontType="montserratBold"
                      fontSize="body">
                      Nutrition Plan
                    </Text>
                  </View>
                  <View>
                    <Text
                      variant="custom"
                      colorType="base6"
                      fontType="montserratRegular"
                      fontSize="caption">
                      {gymNutritionPlans?.[goal]?.["nutrition plan"]}
                    </Text>
                  </View>
                </Spacer>
                <Spacer position="top" size="medium">
                  <View
                    style={{
                      borderBottomWidth: 0.5,
                      borderBottomColor: theme.colors.brand.base4,
                      borderTopWidth: 0.5,
                      borderTopColor: theme.colors.brand.base4,
                      paddingVertical: theme.spaceNumber[0],
                      marginBottom: theme.spaceNumber[2],
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}>
                    <View>
                      <Text
                        variant="custom"
                        colorType="base"
                        fontType="montserratBold"
                        fontSize="body">
                        Meal
                      </Text>
                    </View>
                    <View>
                      <Text
                        variant="custom"
                        colorType="base6"
                        fontType="montserratRegular"
                        fontSize="xcaption">
                        Goal: {goal}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "start" }}>
                    <View
                      style={{
                        marginRight: theme.spaceNumber[3],
                        width: theme.spaceNumber[1],
                        height: theme.spaceNumber[1],
                        backgroundColor: theme.colors.brand.base6,
                        marginTop: theme.spaceNumber[2],
                        borderRadius: theme.spaceNumberBy10[2],
                      }}
                    />
                    <Text
                      variant="custom"
                      colorType="base6"
                      fontType="montserratRegular"
                      fontSize="caption">
                      {
                        gymNutritionPlans?.[goal]?.["diet plan"]?.breakfast
                          ?.meal
                      }
                    </Text>
                  </View>
                </Spacer>
                {idx === 0 ? (
                  <View
                    style={{
                      position: "absolute",
                      bottom: theme.spaceNumber[5],
                      left: theme.spaceNumber[10],
                    }}>
                    <View>
                      <Text
                        style={{ textAlign: "left" }}
                        variant="custom"
                        colorType="base6"
                        fontType="montserratRegular"
                        fontSize="xcaption">
                        Option is based on fitness goals.
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{ textAlign: "left" }}
                        variant="custom"
                        colorType="base"
                        fontType="montserratBold"
                        fontSize="xcaption">
                        Swipe left to see morre options
                      </Text>
                    </View>
                  </View>
                ) : (
                  <></>
                )}
              </HorizontalPaddingSpace>
            </View>
          ))}
        </View>
      </ScrollView>

      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Index;
