import React, { useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
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
import { Fontisto } from "@expo/vector-icons";

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
      setShowExercisePlan(true);
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

  if (!showExercisePlan) {
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
  }

  return (
    <View
      style={{
        backgroundColor: theme.colors.brand.base,
        width: width,
        height: height,
        position: "relative",
      }}>
      <View
        style={{
          flex: 0.7,
          height: "100%",
          width: width,
          backgroundColor: "#fff",
          paddingTop: theme.spaceNumberBy50[1],
        }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          style={{ height: "100%", width: "100%" }}>
          {muscleExerciseBodyPart[currentUser?.dailyMuscleWorkout]?.[
            selectedExerciseType
          ]?.image?.map((img, idx) => (
            <View key={idx}>
              <ImageViewer
                key={idx}
                url={img}
                style={{
                  width: width,
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </View>
          ))}
        </ScrollView>
      </View>
      <HorizontalPaddingSpace
        space={theme.space[3]}
        style={{
          flex: 0.27,
          backgroundColor: theme.colors.brand.base1,
          flexDirection: "row",
          flexWrap: "wrap",
          gap: theme.spaceNumber[4],
        }}>
        {muscleExerciseBodyPart?.[
          currentUser?.dailyMuscleWorkout
        ]?.exerciseTypes?.map((type, idx) => (
          <TouchableOpacity
            onPress={() => setSelectedExerciseType(type)}
            key={idx}
            style={{
              paddingHorizontal: theme.spaceNumber[5],
              paddingVertical: theme.spaceNumber[3],
              backgroundColor:
                selectedExerciseType === type
                  ? theme.colors.brand.base8
                  : theme.colors.brand.base3,
              borderRadius: theme.spaceNumberBy10[1],
            }}>
            <Text
              variant="custom"
              colorType={selectedExerciseType === type ? "base1" : "base"}
              fontType="montserratBold"
              fontSize="caption"
              transform="capitalize">
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </HorizontalPaddingSpace>
      <HorizontalPaddingSpace
        space={theme.space[4]}
        style={{
          backgroundColor: theme.colors.brand.base,
          flex: 0.13,
          top: -(theme.spaceNumberBy50[0] + theme.spaceNumberBy10[3]),
          borderTopRightRadius: theme.spaceNumberBy10[2],
          borderTopLeftRadius: theme.spaceNumberBy10[2],
          paddingVertical: theme.spaceNumberBy10[0],
        }}>
        <Spacer position="top" size="large">
          <View
            style={{
              borderBottomWidth: 0.5,
              borderBottomColor: theme.colors.brand.base7,
              paddingBottom: theme.spaceNumber[2],
              marginBottom: theme.spaceNumber[2],
            }}>
            <Text
              variant="custom"
              colorType="base1"
              fontType="montserratBold"
              fontSize="body"
              transform="capitalize">
              {currentUser?.dailyMuscleWorkout}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: theme.spaceNumber[3],
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
          {selectedExerciseType ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: theme.spaceNumber[3],
              }}>
              <View>
                <Text
                  variant="custom"
                  colorType="base6"
                  fontType="montserratRegular"
                  fontSize="caption"
                  transform="capitalize">
                  Exercise:
                </Text>
              </View>
              <View>
                <Text
                  variant="custom"
                  colorType="base6"
                  fontType="montserratRegular"
                  fontSize="caption"
                  transform="capitalize">
                  {selectedExerciseType}
                </Text>
              </View>
            </View>
          ) : (
            <></>
          )}
        </Spacer>
      </HorizontalPaddingSpace>
      <TouchableOpacity
        onPress={() => {
          setShowExercisePlan(false);
        }}
        style={{
          position: "absolute",
          top: theme.spaceNumberBy10[7],
          left: theme.spaceNumberBy10[1],
          backgroundColor: theme.colors.brand.base,
          padding: theme.spaceNumber[6],
          borderRadius: theme.spaceNumberBy10[2],
        }}>
        <IconComponent
          iconFunction={() => {
            setShowExercisePlan(false);
          }}
          iconName="close-a"
          IconComponent={Fontisto}
          size={theme.spaceNumber[8]}
          color={theme.colors.brand.base1}
        />
      </TouchableOpacity>
      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Index;
