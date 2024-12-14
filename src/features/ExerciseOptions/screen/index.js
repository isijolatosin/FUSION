import React, { useEffect, useMemo, useState } from "react";
import { Dimensions, ScrollView, TouchableOpacity, View } from "react-native";
import { useAppContext } from "../../../context/ThemeContext";
import {
  getAllData,
  updateUserValueField,
} from "../../../utilities/updateFirestoreDatabaseField";
import { retrieveData } from "../../../utilities/retrieveDataFromPhoneMemory";
import { storeData } from "../../../utilities/storeDataInPhoneMemory";
import { Text } from "../../../components/typography/text.component";
import Loading from "../../../components/general-component/Loading";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { StatusBar } from "expo-status-bar";
import { Spacer } from "../../../components/spacer/spacer.component";
import { useFocusEffect } from "@react-navigation/native";
import ImageViewer from "../../../components/general-component/ImageViewer";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import ThreeByTwoGridTable from "../components/ThreeByTwoGridTable";
import TimeCountdown from "../components/TimeCountdown";
import AnimatedModal from "../../../components/general-component/AnimatedModal";
import TimerWatch from "../components/TimerWatch";

const Index = () => {
  const { width, height } = Dimensions.get("window");
  const {
    state: { theme },
  } = useAppContext();
  const [selectedMuscleType, setSelectedMuscleType] = useState("");
  const [selectedExerciseType, setSelectedExerciseType] = useState("");
  const [isLoadCard, setIsLoadCard] = useState(true);
  const [showExercisePlan, setShowExercisePlan] = useState(false);
  const [isRetrigger, setIsRetrigger] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [muscleOptions, setMuscleOptions] = useState([]);
  const [muscleExerciseBodyPart, setMuscleExerciseBodyPart] = useState({});
  const [userGymLevel, setUserGymLevel] = useState("beginner");
  const [weekInFocus, setWeekInFocuse] = useState("week-1");
  const [showTimer, setShowTimer] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);
  const [showStopWatch, setShowStopWatch] = useState(false);

  const [setsChecked, setSetsChecked] = useState({
    1: false,
    2: false,
    3: false,
  });

  const weeksByGymLevel = {
    beginner: ["week-1", "week-2", "week-3", "week-4"],
    intermediate: ["week-5", "week-6", "week-7", "week-8"],
    advanced: ["week-9"],
  };

  async function fetchData() {
    const phoneValueFromPhoneMemory = await retrieveData("phonenumber");

    const newData = await getAllData("all-users");
    const _muscleOptions = await getAllData("muscle options");
    const _muscleExerciseBodyPart = await getAllData(
      "muscle-exercise-body-part"
    );
    const currentUserData = newData.find(
      (data) => data.phonenumber === phoneValueFromPhoneMemory
    );
    setCurrentUser(currentUserData);
    setMuscleOptions(_muscleOptions?.[0]?.["list"]);
    setMuscleExerciseBodyPart({ ..._muscleExerciseBodyPart[0] });

    if (currentUserData?.dailyMuscleWorkout) {
      setSelectedMuscleType(currentUserData?.dailyMuscleWorkout);
      setSelectedExerciseType(
        _muscleExerciseBodyPart[0]?.[currentUserData?.dailyMuscleWorkout]
          ?.exerciseTypes?.[0]
      );
    }

    const mealID = setTimeout(() => {
      setIsLoadCard(false);
    }, 2000);

    storeData("last-screen-visit", "exercise");
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

  // Memoize the asyncFunctionCall function
  const memoizedFetchData = useMemo(() => fetchData, []);

  useEffect(() => {
    fetchData();
    const compatibleSubscriptionId = setTimeout(() => {
      setIsRetrigger(false);
    }, 1000);

    return () => clearTimeout(compatibleSubscriptionId);
  }, [isRetrigger, memoizedFetchData]);

  if (isLoadCard) {
    return <Loading theme={theme} width={width} />;
  }

  async function handleShowExercise() {
    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "dailyMuscleWorkout",
      selectedMuscleType,
      setIsRetrigger
    );

    setShowExercisePlan(true);
  }

  const sets =
    muscleExerciseBodyPart?.[currentUser?.dailyMuscleWorkout]?.[
      selectedExerciseType
    ]?.[currentUser?.gymLevel ?? userGymLevel]?.sets;

  const reps =
    muscleExerciseBodyPart?.[currentUser?.dailyMuscleWorkout]?.[
      selectedExerciseType
    ]?.[currentUser?.gymLevel ?? userGymLevel]?.reps;

  const weight =
    muscleExerciseBodyPart?.[currentUser?.dailyMuscleWorkout]?.[
      selectedExerciseType
    ]?.[currentUser?.gymLevel ?? userGymLevel]?.weight;

  const rir =
    muscleExerciseBodyPart?.[currentUser?.dailyMuscleWorkout]?.[
      selectedExerciseType
    ]?.[currentUser?.gymLevel ?? userGymLevel]?.rir;

  const rest =
    muscleExerciseBodyPart?.[currentUser?.dailyMuscleWorkout]?.[
      selectedExerciseType
    ]?.[currentUser?.gymLevel ?? userGymLevel]?.rest;

  const instruction =
    muscleExerciseBodyPart?.[currentUser?.dailyMuscleWorkout]?.[
      selectedExerciseType
    ]?.[currentUser?.gymLevel ?? userGymLevel]?.instruction;

  if (showExercisePlan) {
    return (
      <View
        style={{
          backgroundColor: theme.colors.brand.base,
          width: width,
          height: height,
          position: "relative",
          display: "flex",
        }}>
        <HorizontalPaddingSpace
          space={theme.space[4]}
          style={{
            backgroundColor: theme.colors.brand.black,
            flex: 0.12,
            paddingTop: theme.spaceNumberBy10[4],
          }}>
          <Spacer position="top" size="large">
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottomWidth: 0.5,
                borderBottomColor: theme.colors.brand.base7,
                paddingBottom: theme.spaceNumber[2],
                marginBottom: theme.spaceNumber[2],
                paddingLeft: theme.spaceNumberBy10[4],
                height: theme.spaceNumberBy10[2],
              }}>
              <View>
                <Text
                  variant="custom"
                  colorType="base1"
                  fontType="montserratBold"
                  fontSize="body"
                  transform="capitalize">
                  {currentUser?.dailyMuscleWorkout}
                </Text>
              </View>
              {showTimer && (
                <TimeCountdown
                  initialTimeInSeconds={showTimer ? rest.max : 0}
                />
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: theme.spaceNumber[3],
                paddingLeft: theme.spaceNumberBy10[4],
              }}>
              <View>
                <Text
                  variant="custom"
                  colorType="base6"
                  fontType="montserratRegular"
                  fontSize="caption"
                  transform="capitalize">
                  muscle group:
                </Text>
              </View>
              {muscleExerciseBodyPart[
                currentUser?.dailyMuscleWorkout
              ]?.bodyParts?.map((bodyPart, idx) => (
                <View key={idx}>
                  <Text
                    variant="custom"
                    colorType="base6"
                    fontType="montserratRegular"
                    fontSize="caption"
                    transform="capitalize">
                    {bodyPart}
                  </Text>
                </View>
              ))}
            </View>
          </Spacer>
        </HorizontalPaddingSpace>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            flex: 0.25,
            backgroundColor: theme.colors.brand.black2,
            paddingVertical: theme.spaceNumberBy10[1],
          }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            style={{
              flex: 0.2,
              marginLeft: theme.spaceNumber[5],
              borderRadius: theme.spaceNumberBy10[1],
              backgroundColor: theme.colors.brand.black2,
            }}>
            {muscleExerciseBodyPart[currentUser?.dailyMuscleWorkout]?.[
              selectedExerciseType
            ]?.image?.map((img, idx) => (
              <View key={idx}>
                <ImageViewer
                  url={img}
                  style={{
                    width: width / 2,
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </View>
            ))}
          </ScrollView>
          <HorizontalPaddingSpace
            space={theme.space[1]}
            style={{
              flex: 0.75,
              flexDirection: "row",
              flexWrap: "wrap",
            }}>
            {muscleExerciseBodyPart?.[
              currentUser?.dailyMuscleWorkout
            ]?.exerciseTypes?.map((type, idx) => (
              <TouchableOpacity
                onPress={() => setSelectedExerciseType(type)}
                key={idx}
                style={{
                  paddingHorizontal: theme.spaceNumber[3],
                  paddingVertical: theme.spaceNumber[2],
                  borderWidth: selectedExerciseType === type ? 0.5 : 0,
                  borderColor:
                    selectedExerciseType === type
                      ? theme.colors.brand.base6
                      : theme.colors.brand.base8,
                  borderRadius: theme.spaceNumberBy10[1],
                }}>
                <Text
                  variant="custom"
                  colorType={selectedExerciseType === type ? "base1" : "base6"}
                  fontType="montserratBold"
                  fontSize="subcaption"
                  transform="capitalize">
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </HorizontalPaddingSpace>
        </View>

        <HorizontalPaddingSpace
          space={theme.space[4]}
          style={{
            flex: 0.8,
            backgroundColor: theme.colors.brand.black2,
            paddingTop: theme.spaceNumberBy10[1],
            marginTop: theme.spaceNumber[1],
            marginBottom: theme.spaceNumber[1],
          }}>
          <Spacer
            position="top"
            size="xsmall"
            style={{
              flexDirection: "row",
              gap: 5,
              width: "100%",
              justifyContent: "space-around",
            }}>
            {["beginner", "intermediate", "advanced"].map((level, index) => (
              <TouchableOpacity
                key={index}
                onPress={async () => {
                  await updateUserValueField(
                    "all-users",
                    currentUser?.id,
                    "gymLevel",
                    level,
                    setIsRetrigger
                  );
                  setUserGymLevel(level);
                }}
                style={{
                  backgroundColor:
                    (currentUser?.gymLevel || userGymLevel) === level
                      ? theme.colors.brand.tealLight
                      : theme.colors.brand.black,
                  paddingHorizontal: theme.spaceNumber[7],
                  paddingVertical: theme.spaceNumber[4],
                  marginBottom: theme.spaceNumber[2],
                  borderRadius: theme.spaceNumberBy10[1],
                }}>
                <Text
                  variant="custom"
                  colorType={
                    (currentUser?.gymLevel || userGymLevel) === level
                      ? "teal"
                      : "base7"
                  }
                  fontType={
                    (currentUser?.gymLevel || userGymLevel) === level
                      ? "montserratExtrabold"
                      : "montserratLight"
                  }
                  fontSize="button"
                  transform="capitalize">
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </Spacer>
          <Spacer position="top" size="large">
            <Spacer
              position="bottom"
              size="xlarge"
              style={{
                flexDirection: "row",
                gap: 5,
                width: "100%",
                justifyContent: "space-between",
              }}>
              {weeksByGymLevel[userGymLevel].map((week, index) => (
                <TouchableOpacity
                  onPress={async () => {
                    await updateUserValueField(
                      "all-users",
                      currentUser?.id,
                      "weekInFocus",
                      week,
                      setIsRetrigger
                    );

                    setWeekInFocuse(week);
                  }}
                  key={index}
                  style={{
                    paddingBottom: theme.spaceNumber[2],
                    marginBottom: theme.spaceNumber[2],
                  }}>
                  <Text
                    variant="custom"
                    colorType={
                      (currentUser.weekInFocus || weekInFocus) === week
                        ? "teal"
                        : "base7"
                    }
                    fontType={
                      (currentUser.weekInFocus || weekInFocus) === week
                        ? "montserratExtrabold"
                        : "montserratLight"
                    }
                    fontSize="button"
                    transform="capitalize">
                    {week}
                  </Text>
                </TouchableOpacity>
              ))}
            </Spacer>
          </Spacer>
          <ThreeByTwoGridTable
            theme={theme}
            sets={sets}
            reps={reps}
            weight={weight}
            rir={rir}
            setsChecked={setsChecked}
            setShowTimer={setShowTimer}
            setSetsChecked={setSetsChecked}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              width: "100%",
              marginTop: theme.spaceNumber[16],
              marginBottom: theme.spaceNumberBy50[1],
            }}>
            <Spacer
              position="top"
              size="small"
              style={{ position: "relative" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: theme.spaceNumber[2],
                }}>
                <IconComponent
                  iconFunction={() => {}}
                  iconName="dot-fill"
                  IconComponent={Octicons}
                  size={theme.spaceNumber[4]}
                  color={theme.colors.brand.base6}
                />
                <TouchableOpacity
                  onPress={() => setShowInstruction(!showInstruction)}>
                  <Text
                    variant="custom"
                    colorType="base5"
                    fontType="montserratBold"
                    fontSize="caption"
                    transform="capitalize">
                    Instruction
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 1,
                  backgroundColor: theme.colors.brand.linesLight,
                  height: theme.spaceNumberBy10[2],
                }}
              />
            </Spacer>
          </ScrollView>
        </HorizontalPaddingSpace>

        <TouchableOpacity
          onPress={() => {
            setShowExercisePlan(false);
          }}
          style={{
            position: "absolute",
            top: theme.spaceNumberBy10[6],
            left: theme.spaceNumberBy10[0],
            backgroundColor: theme.colors.brand.base,
            padding: theme.spaceNumberBy10[0],
            borderRadius: theme.spaceNumberBy10[2],
          }}>
          <IconComponent
            iconFunction={() => {
              setShowExercisePlan(false);
              setSetsChecked({
                1: false,
                2: false,
                3: false,
              });
              setShowTimer(false);
            }}
            iconName="keyboard-arrow-left"
            IconComponent={MaterialIcons}
            size={theme.spaceNumberBy10[2]}
            color={theme.colors.brand.base1}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowExercisePlan(false);
          }}
          style={{
            position: "absolute",
            width: theme.spaceNumberBy10[8],
            height: theme.spaceNumberBy10[8],
            bottom: theme.spaceNumberBy10[6],
            left: "80%",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <IconComponent
            iconFunction={() => setShowStopWatch(true)}
            iconName="timer-outline"
            IconComponent={Ionicons}
            size={theme.spaceNumberBy10[2]}
            color={theme.colors.brand.base5}
          />
        </TouchableOpacity>

        <AnimatedModal
          isVisible={showInstruction}
          onClose={() => setShowInstruction(false)}
          theme={theme}
          isJustifyContent="center"
          width="100%">
          <HorizontalPaddingSpace
            space={theme.space[3]}
            style={{ width: "100%" }}>
            <Spacer
              position="bottom"
              size="large"
              style={{
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.brand.linesLighter,
                paddingBottom: theme.spaceNumber[5],
              }}>
              <Text
                variant="custom"
                colorType="base4"
                fontType="montserratLight"
                fontSize="h4"
                transform="capitalize"
                lineHeight={theme.lineHeights[14]}>
                Instruction
              </Text>
            </Spacer>
            {instruction?.map((instruct, index) => (
              <Spacer
                position="bottom"
                size="large"
                key={index}
                style={{ width: "100%" }}>
                <Text
                  variant="custom"
                  colorType="base4"
                  fontType="montserratLight"
                  fontSize="caption"
                  transform="capitalize"
                  lineHeight={theme.lineHeights[14]}>
                  {instruct}
                </Text>
              </Spacer>
            ))}
          </HorizontalPaddingSpace>
        </AnimatedModal>
        <AnimatedModal
          isVisible={showStopWatch}
          theme={theme}
          isJustifyContent="start"
          backgroundColor={theme.colors.brand.black3}
          width="100%">
          <TimerWatch theme={theme} setShowStopWatch={setShowStopWatch} />
        </AnimatedModal>
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: theme.colors.brand.base,
        width: width,
        height: height,
        position: "relative",
      }}>
      <HorizontalPaddingSpace
        space={theme.space[2]}
        style={{ marginTop: theme.spaceNumberBy10[4] }}>
        <View
          style={{
            marginBottom: theme.spaceNumber[3],
            backgroundColor: theme.colors.brand.black1,
            padding: theme.spaceNumber[5],
            borderTopLeftRadius: theme.spaceNumberBy10[0],
            borderTopRightRadius: theme.spaceNumberBy10[1],
          }}>
          <View>
            <Text
              variant="custom"
              colorType="base6"
              fontType="montserratBold"
              fontSize="body">
              {`Hey ${currentUser?.firstname}`}
            </Text>
          </View>
          <Spacer position="top" size="xxsmall">
            <Text
              variant="custom"
              colorType="base6"
              fontType="montserratRegular"
              fontSize="caption">
              Select your muscle type for your work out
            </Text>
          </Spacer>
        </View>
        <View
          style={{
            width: "100%",
            backgroundColor: theme.colors.brand.black1,
            paddingTop: theme.spaceNumber[5],
            paddingLeft: theme.spaceNumber[5],
            paddingBottom: theme.spaceNumber[10],
          }}>
          {muscleOptions?.map((muscle, idx) => (
            <TouchableOpacity
              onPress={() => setSelectedMuscleType(muscle)}
              key={idx}
              style={{
                paddingVertical: theme.spaceNumber[1],
                borderBottomWidth: 0.5,
                borderBottomColor: theme.colors.brand.linesFaint,
                backgroundColor:
                  selectedMuscleType === muscle
                    ? theme.colors.brand.black2
                    : "transparent",
                paddingLeft:
                  selectedMuscleType === muscle ? theme.spaceNumber[5] : 0,
              }}>
              <Text
                variant="custom"
                colorType={selectedMuscleType === muscle ? "teal" : "base3"}
                fontType="montserratRegular"
                fontSize="button"
                transform="capitalize">
                {muscle}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {selectedMuscleType ? (
          <HorizontalPaddingSpace
            space={theme.space[2]}
            style={{ marginTop: theme.spaceNumber[10] }}>
            <TouchableOpacity onPress={handleShowExercise}>
              <Text
                variant="custom"
                colorType="teal"
                fontType="montserratRegular"
                fontSize="button">
                View exercise...
              </Text>
            </TouchableOpacity>
          </HorizontalPaddingSpace>
        ) : (
          <></>
        )}
      </HorizontalPaddingSpace>
    </View>
  );
};

export default Index;
