import React, { useEffect, useState } from "react";
import { TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import IconComponent from "../../../../components/icon-components/IconComponent";
import { useAppContext } from "../../../../context/ThemeContext";
import {
  pickImageAsync,
  uploadImageToCloudinary,
} from "../../../../utilities/pickImageAsync";

export default function PhotoComponent({ photoUrl, setPhotoUrl }) {
  const {
    state: { theme },
  } = useAppContext();
  const [isLoadingImage, useLoadingImage] = useState(false);

  async function handlePickImageAsync() {
    useLoadingImage(true);

    const returnUrl = await pickImageAsync();

    if (!returnUrl) return;

    const returnPhotoUrl = await uploadImageToCloudinary(returnUrl);

    if (returnPhotoUrl) {
      useLoadingImage(false);
      setPhotoUrl(returnPhotoUrl);
    }
  }

  return (
    <TouchableOpacity
      onPress={handlePickImageAsync}
      style={{
        width: 100,
        height: 100,
        borderRadius: 5,
        backgroundColor: theme.colors.brand.lightorange,
        alignItems: "center",
        justifyContent: "center",
      }}>
      {photoUrl ? (
        <Image
          source={{
            uri: `${photoUrl}`,
          }}
          style={{ width: "100%", height: "100%", borderRadius: 5 }}
        />
      ) : isLoadingImage ? (
        <ActivityIndicator size="small" color={theme.colors.brand.orange} />
      ) : (
        <IconComponent
          iconFunction={handlePickImageAsync}
          iconName="plus"
          IconComponent={AntDesign}
          size={12}
          color={theme.colors.brand.orange}
        />
      )}
    </TouchableOpacity>
  );
}
