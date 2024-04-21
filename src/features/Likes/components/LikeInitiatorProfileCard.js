import React from "react";
import { View, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Text } from "../../../components/typography/text.component";
import calculateAge from "../../../utilities/calculateAge";

export default function LikeInitiatorProfileCard({
  data,
  theme,
  setInitiatorProfileData,
  setShowLikeInitiatorProfile,
}) {
  const age = calculateAge(
    data?.likedBy?.dob?.year,
    data?.likedBy?.dob?.month,
    data?.likedBy?.dob?.day
  );

  function handleSelectedLikedData(data) {
    setInitiatorProfileData([data]);
    setShowLikeInitiatorProfile(true);
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
          uri: `${data?.likedBy?.mediaArray?.[0]}`,
        }}
      />
      <LinearGradient
        colors={["transparent", theme.colors.brand.basewhite]}
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
          fontType="montserratBold"
          fontSize="body">
          {data?.likedBy?.firstname}, {age}
        </Text>
      </View>
    </Pressable>
  );
}
