import React, { useState } from "react";
import { TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import IconComponent from "../../../../components/icon-components/IconComponent";
import { useAppContext } from "../../../../context/ThemeContext";
import handlePickImageAsync from "../../../../utilities/handleUploadImage";

export default function PhotoComponent({
  isUpdatingPhoto,
  dimension,
  photoUrl,
  setPhotoUrl,
  showDeleteIcon,
  setOpenDeleteModal,
  setDeleteImageItem,
  deleteImageItem,
  setOpenImageUploadModal,
}) {
  const {
    state: { theme },
  } = useAppContext();
  const [isLoadingImage, useLoadingImage] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        if (!photoUrl && !isUpdatingPhoto) {
          handlePickImageAsync(useLoadingImage, setPhotoUrl);
        }

        if (!photoUrl) {
          setOpenImageUploadModal(true);
        }
      }}
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

                  setOpenDeleteModal(true);
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
          iconFunction={() => {
            if (!photoUrl && !isUpdatingPhoto) {
              handlePickImageAsync(useLoadingImage, setPhotoUrl);
            }

            if (!photoUrl) {
              setOpenImageUploadModal(true);
            }
          }}
          iconName="plus"
          IconComponent={AntDesign}
          size={12}
          color={theme.colors.brand.orange}
        />
      )}
    </TouchableOpacity>
  );
}
