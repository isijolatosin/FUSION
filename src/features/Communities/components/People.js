import {
  View,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import {
  MaterialCommunityIcons,
  Fontisto,
  Entypo,
  FontAwesome5,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { Text } from "../../../components/typography/text.component";
import calculateAge from "../../../utilities/calculateAge";
import { Spacer } from "../../../components/spacer/spacer.component";
import IconComponent from "../../../components/icon-components/IconComponent";
import firebase, { database } from "../../../../config";
import { addToArrayField } from "../../../utilities/updateFirestoreDatabaseField";
import { getZodiacSign } from "../../../utilities/generateZodiac";

const CompatibleContainer = styled(ImageBackground)`
  flex: 1;
  justify-content: center;
  position: relative;
`;

export default function CommunitiesComponent({
  data,
  width,
  theme,
  setSelectedFriend,
  setRequestVisible,
  currentUser,
  scrollToTop,
  setIsSelectedUserToView,
  setSelectedUserToView,
}) {
  const image = { uri: `${data?.mediaArray[0]}` };
  const lastTap = useRef(0);
  const [doubleTapWarning, setDoubleTapWarning] = useState(false);

  async function handleSendFriendRequest(profileLikedNumber) {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    setDoubleTapWarning(false);

    if (now - lastTap.current < DOUBLE_TAP_DELAY) {
      const selectedFriendNameAndPhoto = {
        name: data?.firstname,
        photo: data?.mediaArray?.[0],
      };
      setSelectedFriend(selectedFriendNameAndPhoto);
      setRequestVisible(true);

      // create friendship intend structure in firebase firestore
      database.collection("friend-request").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        friendRequestFrom: { ...currentUser },
        friendRequestToNumber: profileLikedNumber,
        flag: "community",
      });

      // add request profile number to list-of-all-liked-numbers in current user profile object
      await addToArrayField(
        "all-users",
        currentUser?.id,
        "listOfAllLikedNumbers",
        data?.phonenumber
      );

      // add current user number (request initiator) to liked-me-list in other user profile object
      await addToArrayField(
        "all-users",
        data?.id,
        "likedMeList",
        currentUser?.phonenumber
      );

      // currentSwipeIndexIsLessThanAllUsersLength && setIndex(index + 1);
      scrollToTop();
    } else {
      setDoubleTapWarning(true);
    }

    // Update the lastTap reference
    lastTap.current = now;
  }

  let iconNamePerGender = "";
  if (data?.gender === "woman") {
    iconNamePerGender = "gender-female";
  }
  if (data?.gender === "man") {
    iconNamePerGender = "gender-male";
  }
  if (data?.gender === "woman") {
    iconNamePerGender = "gender-non-binary";
  }

  const zodiacSign = getZodiacSign(+data?.dob?.day, +data?.dob?.month);

  return (
    <Pressable
      onPress={() => {
        setSelectedUserToView(data);
        setIsSelectedUserToView(true);
      }}
      style={{
        width: width,
        height:
          Platform.OS === "ios" && Platform.isPad
            ? theme.spaceNumberBy50[13]
            : theme.spaceNumberBy50[10],
      }}>
      <CompatibleContainer source={image}>
        <LinearGradient
          colors={["transparent", theme.colors.brand.highlight]}
          style={{
            height: theme.spaceNumberBy50[5],
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 1,
          }}
        />
        <View
          style={{
            flex: 1,
            marginTop: theme.spaceNumberBy10[4],
            marginBottom: theme.spaceNumberBy10[2],
            marginHorizontal: theme.spaceNumberBy10[0],
            justifyContent: "space-between",
          }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <View
              style={{
                position: "absolute",
                left: theme.spaceNumber[0],
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                width: "100%",
                padding: theme.spaceNumberBy10[0],
              }}>
              {doubleTapWarning && (
                <View
                  style={{
                    marginRight: -theme.spaceNumberBy10[4],
                    marginBottom: -theme.spaceNumber[6],
                  }}>
                  <Text
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="caption">
                    double tap to nudge
                  </Text>
                </View>
              )}
              <TouchableOpacity
                style={{
                  borderRadius: theme.spaceNumberBy50[3],
                  padding: theme.spaceNumber[3],
                  backgroundColor: theme.colors.brand.basewhite,
                }}>
                <IconComponent
                  iconFunction={() =>
                    handleSendFriendRequest(data?.phonenumber)
                  }
                  iconName="thumbs-up"
                  IconComponent={Entypo}
                  size={theme.spaceNumberBy10[2]}
                  color={theme.colors.brand.base}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Spacer position="bottom" size="xxsmall">
              <Text
                variant="custom"
                colorType="black"
                fontType="arimaMadurai"
                fontSize="h4"
                width="100%">
                {data?.firstname},{" "}
                {calculateAge(
                  data?.dob?.year,
                  data?.dob?.month,
                  data?.dob?.day
                )}
              </Text>
            </Spacer>
            <Spacer position="bottom" size="small">
              <Text
                variant="custom"
                colorType="black"
                fontType="montserratBold"
                fontSize="button">
                My Basics
              </Text>
            </Spacer>
            <View
              style={{
                flexDirection: "row",
                gap: theme.spaceNumber[3],
                flexWrap: "wrap",
              }}>
              <View
                style={{
                  backgroundColor: theme.colors.brand.basewhite,
                  paddingVertical: theme.spaceNumber[3],
                  paddingHorizontal: theme.spaceNumber[7],
                  borderRadius: theme.spaceNumberBy10[4],
                }}>
                <View
                  style={{
                    position: "absolute",
                    top: theme.spaceNumber[4],
                    left: 9,
                  }}>
                  <IconComponent
                    iconFunction={() => {}}
                    iconName={iconNamePerGender}
                    IconComponent={MaterialCommunityIcons}
                    size={15}
                    color={theme.colors.brand.base}
                  />
                </View>
                <Text
                  style={{ marginLeft: theme.spaceNumber[5] }}
                  variant="custom"
                  colorType="black"
                  fontType="montserratRegular"
                  fontSize="button">
                  {data?.gender}
                </Text>
              </View>
              {currentUser?.zodiac && zodiacSign && (
                <View
                  style={{
                    backgroundColor: theme.colors.brand.basewhite,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[7],
                    borderRadius: theme.spaceNumberBy10[4],
                  }}>
                  <View
                    style={{
                      position: "absolute",
                      top: theme.spaceNumber[4],
                      left: 9,
                    }}>
                    <IconComponent
                      iconFunction={() => {}}
                      iconName={`zodiac-${zodiacSign?.toLowerCase()}`}
                      IconComponent={MaterialCommunityIcons}
                      size={15}
                      color={theme.colors.brand.base}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: theme.spaceNumber[5] }}
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button">
                    {zodiacSign}
                  </Text>
                </View>
              )}
              {data?.sexualOrientation && (
                <View
                  style={{
                    backgroundColor: theme.colors.brand.basewhite,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[7],
                    borderRadius: theme.spaceNumberBy10[4],
                  }}>
                  <View
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 9,
                      transform: [{ rotateZ: "145deg" }],
                    }}>
                    <IconComponent
                      iconFunction={() => {}}
                      iconName="magnet"
                      IconComponent={Entypo}
                      size={12}
                      color={theme.colors.brand.base}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: 8 }}
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button">
                    {data?.sexualOrientation}
                  </Text>
                </View>
              )}
              {data?.nationality && (
                <View
                  style={{
                    backgroundColor: theme.colors.brand.basewhite,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[7],
                    borderRadius: theme.spaceNumberBy10[4],
                  }}>
                  <View style={{ position: "absolute", top: 9, left: 9 }}>
                    <IconComponent
                      iconFunction={() => {}}
                      iconName="flag"
                      IconComponent={Fontisto}
                      size={12}
                      color={theme.colors.brand.base}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: 8 }}
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button">
                    {data?.nationality}
                  </Text>
                </View>
              )}
              {data?.tribe && (
                <View
                  style={{
                    backgroundColor: theme.colors.brand.basewhite,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[7],
                    borderRadius: theme.spaceNumberBy10[4],
                  }}>
                  <View style={{ position: "absolute", top: 9, left: 9 }}>
                    <IconComponent
                      iconFunction={() => {}}
                      iconName="origin"
                      IconComponent={Fontisto}
                      size={12}
                      color={theme.colors.brand.base}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: 8 }}
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button">
                    {data?.tribe}
                  </Text>
                </View>
              )}
              {data?.religious && (
                <View
                  style={{
                    backgroundColor: theme.colors.brand.basewhite,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[7],
                    borderRadius: theme.spaceNumberBy10[4],
                  }}>
                  <View style={{ position: "absolute", top: 10.5, left: 10 }}>
                    <IconComponent
                      iconFunction={() => {}}
                      iconName="praying-hands"
                      IconComponent={FontAwesome5}
                      size={10}
                      color={theme.colors.brand.base}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: 10 }}
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button">
                    {data?.religious}
                  </Text>
                </View>
              )}
              {data?.jobtitle?.visibleOnProfile && (
                <View
                  style={{
                    backgroundColor: theme.colors.brand.basewhite,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[7],
                    borderRadius: theme.spaceNumberBy10[4],
                  }}>
                  <View
                    style={{
                      position: "absolute",
                      top: theme.spaceNumber[5],
                      left: 9,
                    }}>
                    <IconComponent
                      iconFunction={() => {}}
                      iconName="work"
                      IconComponent={MaterialIcons}
                      size={12}
                      color={theme.colors.brand.base}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: 10 }}
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button">
                    {data?.jobtitle?.job}
                  </Text>
                </View>
              )}
              {data?.workplace?.visibleOnProfile && (
                <View
                  style={{
                    backgroundColor: theme.colors.brand.basewhite,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[7],
                    borderRadius: theme.spaceNumberBy10[4],
                  }}>
                  <View style={{ position: "absolute", top: 11, left: 9 }}>
                    <IconComponent
                      iconFunction={() => {}}
                      iconName="home-work"
                      IconComponent={MaterialIcons}
                      size={12}
                      color={theme.colors.brand.base}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: 10 }}
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button">
                    {data?.workplace?.work}
                  </Text>
                </View>
              )}
              {data?.height && (
                <View
                  style={{
                    backgroundColor: theme.colors.brand.basewhite,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[7],
                    borderRadius: theme.spaceNumberBy10[4],
                  }}>
                  <View style={{ position: "absolute", top: 9, left: 9 }}>
                    <IconComponent
                      iconFunction={() => {}}
                      iconName="human-male-height"
                      IconComponent={MaterialCommunityIcons}
                      size={12}
                      color={theme.colors.brand.base}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: 10 }}
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button">
                    {data?.height?.replace("feet", "'")?.replace("inch", '"')}
                  </Text>
                </View>
              )}
              {data?.lifestyleHabits?.gym && (
                <View
                  style={{
                    backgroundColor: theme.colors.brand.basewhite,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[7],
                    borderRadius: theme.spaceNumberBy10[4],
                  }}>
                  <View
                    style={{
                      position: "absolute",
                      top: theme.spaceNumber[5],
                      left: 8,
                    }}>
                    <IconComponent
                      iconFunction={() => {}}
                      iconName="dumbbell"
                      IconComponent={FontAwesome5}
                      size={10}
                      color={theme.colors.brand.base}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: 8 }}
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button">
                    {data?.lifestyleHabits?.gym}
                  </Text>
                </View>
              )}
              {data?.preference && (
                <View
                  style={{
                    backgroundColor: theme.colors.brand.basewhite,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[7],
                    borderRadius: theme.spaceNumberBy10[4],
                  }}>
                  <View style={{ position: "absolute", top: 9, left: 10 }}>
                    <IconComponent
                      iconFunction={() => {}}
                      iconName="search"
                      IconComponent={Feather}
                      size={15}
                      color={theme.colors.brand.base}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: 15 }}
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button">
                    {data?.preference}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </CompatibleContainer>
    </Pressable>
  );
}
