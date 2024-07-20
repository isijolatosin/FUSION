import {
  View,
  ImageBackground,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import { Entypo } from "@expo/vector-icons";

import { Text } from "../../../components/typography/text.component";
import calculateAge from "../../../utilities/calculateAge";
import IconComponent from "../../../components/icon-components/IconComponent";
import firebase, { database } from "../../../../config";
import { addToArrayField } from "../../../utilities/updateFirestoreDatabaseField";
import { Image } from "react-native-elements";

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

  return (
    <Pressable
      onPress={() => {
        setSelectedUserToView(data);
        setIsSelectedUserToView(true);
      }}
      style={{
        width: "100%",
        height: theme.spaceNumberBy50[1],
        marginBottom: theme.spaceNumberBy10[2],
        borderRadius: theme.spaceNumberBy10[1],
      }}>
      <View>
        <Image
          source={image}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: theme.spaceNumberBy10[1],
            objectFit: "cover",
          }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: theme.spaceNumberBy10[2],
          left: theme.spaceNumber[0],
          top: -theme.spaceNumber[5],
        }}>
        <View
          style={{
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
              backgroundColor: theme.colors.brand.base,
            }}>
            <IconComponent
              iconFunction={() => handleSendFriendRequest(data?.phonenumber)}
              iconName="thumbs-up"
              IconComponent={Entypo}
              size={theme.spaceNumberBy10[2]}
              color={theme.colors.brand.base1}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ position: "absolute", bottom: theme.spaceNumber[3] }}>
        <Text
          variant="custom"
          colorType="base"
          fontType="arimaMadurai"
          fontSize="title"
          width="100%">
          {data?.firstname},{" "}
          {calculateAge(data?.dob?.year, data?.dob?.month, data?.dob?.day)}
        </Text>
      </View>
    </Pressable>
  );
}
