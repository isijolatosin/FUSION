import React, { useState } from "react";
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
import { useFocusEffect } from "@react-navigation/native";
import { getWeekOfMonth } from "../../../utilities/getWeekOfMonth";

const GradientContainer = styled(ImageBackground)`
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
  const [dietPlansArray, setDietPlans] = useState({});

  async function fetchData() {
    const phoneValueFromPhoneMemory = await retrieveData("phonenumber");

    const newData = await getAllData("all-users");
    const dietPlans = await getAllData("diet plans");
    const currentUserData = newData.find(
      (data) => data.phonenumber === phoneValueFromPhoneMemory
    );
    setCurrentUser(currentUserData);
    setDietPlans({ ...dietPlans[0] });

    const mealID = setTimeout(() => {
      setIsLoadCard(false);
    }, 2000);

    storeData("last-screen-visit", "meal-plan");
    return () => clearTimeout(mealID);
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      return () => {
        // Cleanup function if needed
      };
    }, [])
  );

  if (isLoadCard) {
    return <Loading theme={theme} width={width} />;
  }

  const currentHour = getCurrentHour(new Date());
  let greeting = `It's Snack Time ${currentUser?.firstname}`;
  let mealName = "snacks";

  const breakfastFrom = currentUser?.breakfastTime?.from
    ? currentUser?.breakfastTime?.from
    : 5;
  const breakfastTo = currentUser?.breakfastTime?.to
    ? currentUser?.breakfastTime?.to
    : 12;

  const lunchFrom = currentUser?.lunchTime?.from
    ? currentUser?.lunchTime?.from
    : 12;
  const lunchTo = currentUser?.lunchTime?.to ? currentUser?.lunchTime?.to : 17;

  const dinnerFrom = currentUser?.dinnerTime?.from
    ? currentUser?.dinnerTime?.from
    : 17;
  const dinnerTo = currentUser?.dinnerTime?.to
    ? currentUser?.dinnerTime?.to
    : 20;

  if (currentHour >= breakfastFrom && currentHour < breakfastTo) {
    greeting = `It's Dawn ${currentUser?.firstname}`;
    mealName = "breakfast";
  }
  if (currentHour >= lunchFrom && currentHour < lunchTo) {
    greeting = `It's Daytime ${currentUser?.firstname}`;
    mealName = "lunch";
  }
  if (currentHour >= dinnerFrom && currentHour < dinnerTo) {
    greeting = `It's Dusk ${currentUser?.firstname}`;
    mealName = "dinner";
  }

  return (
    <View
      style={{
        backgroundColor: theme.colors.brand.base,
        position: "relative",
        height: height,
      }}>
      {mealName ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          horizontal
          pagingEnabled>
          <View style={{ flexDirection: "row" }}>
            {currentUser?.gymGoals?.map((goal, idx) => (
              <View
                key={idx}
                style={{
                  width: width,
                  height: height,
                  position: "relative",
                }}>
                <GradientContainer
                  source={{
                    uri:
                      `${
                        dietPlansArray?.[goal]?.["diet plan"]?.[mealName]?.[
                          getWeekOfMonth() - 1
                        ]?.imageurl
                      }` ||
                      "https://merokinmel.com/storage/placeholder/placeholder-web.png",
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
                </GradientContainer>
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
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    horizontal={false}
                    contentContainerStyle={{
                      paddingLeft: theme.spaceNumber[0],
                      paddingBottom: theme.spaceNumberBy10[3],
                    }}>
                    <Spacer position="top" size="medium">
                      <View
                        style={{
                          borderBottomWidth: 0.5,
                          borderBottomColor: theme.colors.brand.base4,
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
                      <View
                        style={{ flexDirection: "row", alignItems: "start" }}>
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
                            dietPlansArray?.[goal]?.["diet plan"]?.[mealName]?.[
                              getWeekOfMonth() - 1
                            ]?.meal
                          }
                        </Text>
                      </View>
                      {dietPlansArray?.[goal]?.["diet plan"]?.[mealName]?.[
                        getWeekOfMonth() - 1
                      ]?.description ? (
                        <Spacer position="top" size="large">
                          <Spacer position="bottom" size="xsmall">
                            <Text
                              variant="custom"
                              colorType="base6"
                              fontType="montserratBold"
                              fontSize="caption">
                              Description:
                            </Text>
                          </Spacer>
                          <View
                            style={{
                              width: "100%",
                            }}>
                            <Text
                              variant="custom"
                              colorType="base6"
                              fontType="montserratRegular"
                              fontSize="caption">
                              {
                                dietPlansArray?.[goal]?.["diet plan"]?.[
                                  mealName
                                ]?.[getWeekOfMonth() - 1]?.description
                              }
                            </Text>
                          </View>
                        </Spacer>
                      ) : (
                        <></>
                      )}
                    </Spacer>
                  </ScrollView>
                  {idx === 0 ? (
                    <View
                      style={{
                        position: "absolute",
                        bottom: theme.spaceNumber[4],
                        left: theme.spaceNumber[10],
                        backgroundColor: theme.colors.brand.base1,
                        width: "100%",
                      }}>
                      <Spacer position="bottom" size="large">
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
                            fontSize="caption">
                            Nutrition Plan
                          </Text>
                        </View>
                        <View>
                          <Text
                            variant="custom"
                            colorType="base6"
                            fontType="montserratRegular"
                            fontSize="xcaption">
                            {dietPlansArray?.[goal]?.["nutrition plan"]}
                          </Text>
                        </View>
                      </Spacer>
                      <View>
                        <Text
                          style={{ textAlign: "left" }}
                          variant="custom"
                          colorType="base6"
                          fontType="montserratRegular"
                          fontSize="xcaption">
                          Options are based on your fitness goals.
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{ textAlign: "left" }}
                          variant="custom"
                          colorType="base"
                          fontType="montserratBold"
                          fontSize="xcaption">
                          Swipe left to see more options
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
      ) : (
        <View
          style={{
            width: width,
            height: height,
            justifyContent: "center",
            marginTop: -theme.spaceNumberBy10[5],
          }}>
          <HeaderComponent
            title={greeting}
            theme={theme}
            size="h5"
            transform="capitalize"
            LeftComp={() => <></>}
            RightComp={() => <></>}
          />
        </View>
      )}

      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Index;
