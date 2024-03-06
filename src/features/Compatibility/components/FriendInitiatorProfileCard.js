import React from "react";
import { View, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Text } from "../../../components/typography/text.component";
import calculateAge from "../../../utilities/calculateAge";

export default function FriendInitiatorProfileCard({
  data,
  theme,
  setFriendRequesterProfileData,
  setShowFriendRequesterProfile,
}) {
  const age = calculateAge(
    data?.friendRequestFrom?.dob?.year,
    data?.friendRequestFrom?.dob?.month,
    data?.friendRequestFrom?.dob?.day
  );

  function handleSelectedLikedData(data) {
    setFriendRequesterProfileData([data]);
    setShowFriendRequesterProfile(true);
  }

  return (
    <Pressable
      onPress={() => handleSelectedLikedData(data)}
      style={{
        width: "100%",
        height: theme.spaceNumberBy50[3],
        position: "relative",
        backgroundColor: theme.colors.brand.basewhite,
        borderRadius: theme.spaceNumberBy10[1],
      }}>
      <Image
        style={{
          width: "100%",
          height: "100%",
          resizeMode: "cover",
          borderRadius: theme.spaceNumberBy10[1],
        }}
        source={{
          uri: `${data?.friendRequestFrom?.mediaArray?.[0]}`,
        }}
      />
      <LinearGradient
        colors={["transparent", theme.colors.brand.highlight]}
        style={{
          height: theme.spaceNumberBy50[1],
          borderRadius: theme.spaceNumberBy10[1],
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          opacity: 0.8,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          padding: theme.spaceNumber[4],
        }}>
        <Text
          variant="custom"
          colorType="black"
          fontType="arimaMadurai"
          fontSize="body">
          {data?.friendRequestFrom?.firstname}, {age}
        </Text>
      </View>
    </Pressable>
  );
}
