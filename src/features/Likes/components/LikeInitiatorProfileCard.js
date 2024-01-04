import { View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Text } from "../../../components/typography/text.component";
import calculateAge from "../../../utilities/calculateAge";

export default function LikeInitiatorProfileCard({
  data,
  theme,
  setSelectedLikedData,
  setIsYouLikedVisible,
}) {
  const age = calculateAge(
    data?.likedBy?.dob?.year,
    data?.likedBy?.dob?.month,
    data?.likedBy?.dob?.day
  );

  function handleSelectedLikedData(data) {
    setSelectedLikedData(data);
    setIsYouLikedVisible(true);
  }

  return (
    <TouchableOpacity
      onPress={() => handleSelectedLikedData(data?.likedBy)}
      style={{
        width: "100%",
        height: theme.spaceNumberBy50[4],
        position: "relative",
        backgroundColor: theme.colors.brand.white,
        borderRadius: theme.spaceNumberBy10[1],
      }}>
      <Image
        style={{
          width: "100%",
          height: "100%",
          resizeMode: "cover",
          borderRadius: theme.spaceNumberBy10[1],
          opacity: 0.7,
        }}
        source={{
          uri: `${data?.likedBy?.mediaArray?.[0]}`,
        }}
      />
      <View style={{ position: "absolute", padding: theme.spaceNumber[4] }}>
        <Text
          variant="subHeading"
          colorType="black"
          fontType="montserratBold"
          fontSize="body">
          {data?.likedBy?.firstname}, {age}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
