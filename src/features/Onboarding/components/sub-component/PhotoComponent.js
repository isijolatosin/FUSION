import React, { useState } from "react";
import { Pressable, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import IconComponent from "../../../../components/icon-components/IconComponent";
import { useAppContext } from "../../../../context/ThemeContext";
import { handlePickImageAsync } from "../../../../utilities/handleUploadImage";
import Spinner from "../../../../components/general-component/Spinner";

export default function PhotoComponent({
  isUpdatingPhoto,
  dimension,
  photoUrl,
  // setPhotoUrl,
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

  async function handlePickImageAsyncOnBoarding() {
    await handlePickImageAsync(useLoadingImage);
  }

  return (
    <Pressable
      onPress={() => {
        if (!photoUrl && !isUpdatingPhoto) {
          handlePickImageAsyncOnBoarding();
          return;
        }

        if (!photoUrl && isUpdatingPhoto) {
          setOpenImageUploadModal(true);
          return;
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
            <Pressable
              style={{
                position: "absolute",
                top: theme.spaceNumber[0],
                right: theme.spaceNumber[0],
                backgroundColor: theme.colors.brand.basewhite,
                borderRadius: theme.spaceNumberBy10[9],
                padding: theme.spaceNumber[0],
              }}>
              <IconComponent
                iconFunction={() => {
                  if (deleteImageItem) setDeleteImageItem("");

                  setOpenDeleteModal(true);
                  setDeleteImageItem(photoUrl);
                }}
                iconName="close"
                IconComponent={AntDesign}
                size={15}
                color={theme.colors.brand.base}
              />
            </Pressable>
          ) : (
            <></>
          )}
        </>
      ) : isLoadingImage ? (
        <Spinner size="small" color={theme.colors.brand.brandFade} />
      ) : (
        <IconComponent
          iconFunction={() => {
            if (!photoUrl && !isUpdatingPhoto) {
              handlePickImageAsync(useLoadingImage);
              return;
            }
            if (!photoUrl && isUpdatingPhoto) {
              setOpenImageUploadModal(true);
              useLoadingImage(true);
              return;
            }
          }}
          iconName="plus"
          IconComponent={AntDesign}
          size={12}
          color={theme.colors.brand.brandFade}
        />
      )}
    </Pressable>
  );
}
