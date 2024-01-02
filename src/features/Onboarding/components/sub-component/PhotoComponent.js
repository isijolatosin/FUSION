import React, { useState } from "react";
import { TouchableOpacity, Image, ActivityIndicator, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import IconComponent from "../../../../components/icon-components/IconComponent";
import { useAppContext } from "../../../../context/ThemeContext";
import {
  pickImageAsync,
  uploadImageToCloudinary,
} from "../../../../utilities/pickImageAsync";

export default function PhotoComponent({
  dimension,
  photoUrl,
  setPhotoUrl,
  showDeleteIcon,
  index,
  setOpenModal,
  setDeleteImageItem,
  deleteImageItem,
}) {
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
      onPress={() => !photoUrl && handlePickImageAsync()}
      style={{
        position: "relative",
        width: dimension + "%",
        height: theme.spaceNumberBy10[9],
        borderRadius: 5,
        backgroundColor: theme.colors.brand.highlight,
        alignItems: "center",
        justifyContent: "center",
      }}>
      {photoUrl ? (
        <>
          <Image
            source={{
              uri: `${photoUrl}`,
            }}
            style={{ width: "100%", height: "100%", borderRadius: 5 }}
          />
          {showDeleteIcon ? (
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 5,
                right: 5,
                backgroundColor: theme.colors.brand.base,
                borderRadius: theme.spaceNumberBy10[9],
                padding: 5,
              }}>
              <IconComponent
                iconFunction={() => {
                  if (deleteImageItem) setDeleteImageItem("");

                  setOpenModal(true);
                  setDeleteImageItem(photoUrl);
                }}
                iconName="close"
                IconComponent={AntDesign}
                size={16}
                color={theme.colors.brand.white}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </>
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
