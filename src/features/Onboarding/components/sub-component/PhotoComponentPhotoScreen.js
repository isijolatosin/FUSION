import React, { useState } from "react";
import { Pressable, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import IconComponent from "../../../../components/icon-components/IconComponent";
import { useAppContext } from "../../../../context/ThemeContext";
import { handlePickImageAsyncPhotoScreen } from "../../../../utilities/handleUploadImage";
import Spinner from "../../../../components/general-component/Spinner";
import ImageViewer from "../../../../components/general-component/ImageViewer";

export default function PhotoComponentPhotoScreen({
  photoUrl,
  setPhotoUrl,
  dimension,
}) {
  const {
    state: { theme },
  } = useAppContext();
  const [isLoadingImage, useLoadingImage] = useState(false);

  async function handlePickImageAsyncOnBoarding() {
    await handlePickImageAsyncPhotoScreen(useLoadingImage, setPhotoUrl);
  }

  return (
    <Pressable
      onPress={handlePickImageAsyncOnBoarding}
      style={{
        position: "relative",
        width: dimension + "%",
        height: theme.spaceNumberBy10[9],
        borderRadius: 5,
        backgroundColor: theme.colors.brand.base3,
        alignItems: "center",
        justifyContent: "center",
      }}>
      {photoUrl ? (
        <ImageViewer
          url={photoUrl}
          style={{ width: "100%", height: "100%", borderRadius: 5 }}
        />
      ) : isLoadingImage ? (
        <Spinner size="small" color={theme.colors.brand.orange} />
      ) : (
        <IconComponent
          iconFunction={handlePickImageAsyncOnBoarding}
          iconName="plus"
          IconComponent={AntDesign}
          size={12}
          color={theme.colors.brand.base6}
        />
      )}
    </Pressable>
  );
}
