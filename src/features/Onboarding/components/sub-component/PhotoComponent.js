import React, { useState } from "react";
import { Pressable, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import IconComponent from "../../../../components/icon-components/IconComponent";
import { useAppContext } from "../../../../context/ThemeContext";
import { handlePickImageAsync } from "../../../../utilities/handleUploadImage";
import Spinner from "../../../../components/general-component/Spinner";
import { isImageOrVideo } from "../../../../utilities/getMediaFileType";
import VideoPlayer from "../../../../components/general-component/VideoPlayer";
import ImageViewer from "../../../../components/general-component/ImageViewer";

export default function PhotoComponent({
  isUpdatingPhoto,
  dimension,
  photoUrl,
  showDeleteIcon,
  setOpenDeleteModal,
  setDeleteImageItem,
  deleteImageItem,
  setOpenImageUploadModal,
  width,
  borderRadius,
  videoRef,
  isGrayscale,
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
        width: dimension ? dimension + "%" : width - 10,
        height: width ? width : theme.spaceNumberBy10[9],
        borderRadius: borderRadius ? borderRadius : 5,
        backgroundColor: theme.colors.brand.highlight,
        alignItems: "center",
        justifyContent: "center",
      }}>
      {photoUrl ? (
        <>
          {isImageOrVideo(photoUrl) === "image" ? (
            <ImageViewer
              url={photoUrl}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: borderRadius ? borderRadius : 5,
              }}
              isGrayscale={isGrayscale}
            />
          ) : (
            <></>
          )}
          {isImageOrVideo(photoUrl) === "video" ? (
            <VideoPlayer
              videoRef={videoRef}
              url={photoUrl}
              shouldPlay={false}
              isLooping={true}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: borderRadius ? borderRadius : 5,
              }}
            />
          ) : (
            <></>
          )}
          {showDeleteIcon ? (
            <Pressable
              style={{
                position: "absolute",
                top:
                  isImageOrVideo(photoUrl) === "video"
                    ? theme.spaceNumberBy10[5]
                    : theme.spaceNumber[5],
                right: theme.spaceNumber[5],
                backgroundColor: theme.colors.brand.basewhite,
                borderRadius: borderRadius
                  ? borderRadius
                  : theme.spaceNumberBy10[9],
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
                size={isImageOrVideo(photoUrl) === "video" ? 25 : 15}
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
