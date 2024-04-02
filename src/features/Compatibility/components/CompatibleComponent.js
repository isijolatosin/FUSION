import { View, ImageBackground, Pressable } from "react-native";
import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { Text } from "../../../components/typography/text.component";
import calculateAge from "../../../utilities/calculateAge";
import { Spacer } from "../../../components/spacer/spacer.component";
import IconComponent from "../../../components/icon-components/IconComponent";
import firebase, { database } from "../../../../config";
import { addToArrayField } from "../../../utilities/updateFirestoreDatabaseField";
import getInterestMapObject from "../../../utilities/getInterestMapObject";

const CompatibleContainer = styled(ImageBackground)`
  flex: 1;
  justify-content: center;
  position: relative;
`;

export default function CompatibleComponent({
  data,
  width,
  theme,
  setLikedUser,
  setIsYouLikedVisible,
  currentUser,
  setIsRetrigger,
  scrollToTop,
  setIsSelectedUserToView,
  setSelectedUserToView,
}) {
  const image = { uri: `${data?.mediaArray[0]}` };
  const lastTap = useRef(0);
  const [doubleTapWarning, setDoubleTapWarning] = useState(false);

  async function handleYouLikedAUser(profileLikedNumber) {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    setDoubleTapWarning(false);

    if (now - lastTap.current < DOUBLE_TAP_DELAY) {
      const likedUserNameAndPhoto = {
        name: data?.firstname,
        photo: data?.mediaArray?.[0],
      };
      setLikedUser(likedUserNameAndPhoto);
      setIsYouLikedVisible(true);

      // create match intend structure in firebase firestore
      database.collection("all-likes").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        likedBy: {
          ...currentUser,
        }, // the number who liked another profile
        profileLikedNumber: profileLikedNumber, // profile number that was liked
      });

      // add liked profile number to list-of-all-liked-numbers in current user profile object
      await addToArrayField(
        "all-users",
        currentUser?.id,
        "listOfAllLikedNumbers",
        data?.phonenumber,
        setIsRetrigger
      );

      // add current user number (like initiator) to liked-me-list in other user profile object
      await addToArrayField(
        "all-users",
        data?.id,
        "likedMeList",
        currentUser?.phonenumber,
        setIsRetrigger
      );

      // currentSwipeIndexIsLessThanAllUsersLength && setIndex(index + 1);
      scrollToTop();
    } else {
      setDoubleTapWarning(true);
    }

    // Update the lastTap reference
    lastTap.current = now;
  }

  return (
    <Pressable
      onPress={() => {
        setSelectedUserToView(data);
        setIsSelectedUserToView(true);
      }}
      style={{
        width: width,
        height: theme.spaceNumberBy50[10],
      }}>
      <CompatibleContainer source={image}>
        <LinearGradient
          colors={["transparent", theme.colors.brand.basewhite]}
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
            marginHorizontal: theme.spaceNumberBy10[2],
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
                    marginBottom: -theme.spaceNumber[3],
                  }}>
                  <Text
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="caption">
                    double tap
                  </Text>
                </View>
              )}
              <Pressable>
                <IconComponent
                  iconFunction={() => handleYouLikedAUser(data?.phonenumber)}
                  iconName="heart"
                  IconComponent={MaterialCommunityIcons}
                  size={50}
                  color={theme.colors.brand.base}
                />
              </Pressable>
            </View>
          </View>
          <View>
            <Spacer position="bottom" size="small">
              <Text
                variant="custom"
                colorType="black"
                fontType="montserratBold"
                fontSize="h5"
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
                fontSize="title">
                My Interest
              </Text>
            </Spacer>
            <View
              style={{
                flexDirection: "row",
                gap: theme.spaceNumber[3],
                flexWrap: "wrap",
                marginBottom: theme.spaceNumberBy10[5],
              }}>
              {data?.interestsArray?.map((interest, idx) => {
                const interestMapObject = getInterestMapObject(interest);
                if (!interestMapObject?.family || !interestMapObject?.iconName)
                  return;
                return (
                  <View
                    key={idx}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: theme.colors.brand.highlight,
                      paddingVertical: theme.spaceNumber[2],
                      paddingRight: theme.spaceNumber[7],
                      paddingLeft: theme.spaceNumber[4],
                      borderRadius: theme.spaceNumberBy10[4],
                      elevation: 5,
                      shadowColor: theme.colors.brand.black,
                      shadowOpacity: 0.12,
                      shadowRadius: theme.spaceNumber[2],
                    }}>
                    <IconComponent
                      iconFunction={() => {}}
                      iconName={interestMapObject?.iconName}
                      IconComponent={interestMapObject?.family}
                      size={14}
                      color={theme.colors.brand.base}
                    />
                    <View style={{ marginLeft: theme.spaceNumber[1] }}>
                      <Text
                        variant="custom"
                        colorType="black"
                        fontType="montserratRegular"
                        fontSize="caption"
                        width="100%">
                        {interest}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </CompatibleContainer>
    </Pressable>
  );
}
