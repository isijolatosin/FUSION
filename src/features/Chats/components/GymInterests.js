import React from "react";
import { Pressable } from "react-native";
import ImageViewer from "../../../components/general-component/ImageViewer";

export default function GymInterests({
  data,
  theme,
  width,
  height,
  setInitiatorProfileData,
  setShowLikeInitiatorProfile,
}) {
  function handleSelectedLikedData(data) {
    setInitiatorProfileData([data]);
    setShowLikeInitiatorProfile(true);
  }

  return (
    <Pressable onPress={() => handleSelectedLikedData(data)}>
      <ImageViewer
        style={{
          width: width,
          height: height,
          resizeMode: "cover",
          borderRadius: theme.spaceNumberBy10[1],
        }}
        url={data?.likedBy?.mediaArray?.[0]}
      />
    </Pressable>
  );
}
