import { isImageOrVideo } from "./getMediaFileType";
import {
  pickImageAsync,
  pickImageFromCamera,
  pickVideoAsync,
  uploadImageToCloudinary,
  uploadVideoToCloudinary,
} from "./pickImageAsync";
import {
  addToArrayField,
  updateUserValueField,
} from "./updateFirestoreDatabaseField";

async function handlePickImageAsync(
  useLoadingImage,
  setOpenImageUploadModal,
  currentUserId,
  isToCapture,
  noAllowEditingForPhotoMessage,
  sendPhotoMessage,
  isReturn,
  setIsTrigger
) {
  useLoadingImage(true);

  const returnUrl = isToCapture
    ? await pickImageFromCamera()
    : await pickImageAsync();

  if (!returnUrl) return;

  const returnPhotoUrl = await uploadImageToCloudinary(returnUrl);

  if (returnPhotoUrl) {
    useLoadingImage(false);

    if (noAllowEditingForPhotoMessage) {
      sendPhotoMessage(returnPhotoUrl);
    }

    setOpenImageUploadModal(false);
    setIsTrigger(true);
    currentUserId &&
      addToArrayField("all-users", currentUserId, "mediaArray", returnPhotoUrl);
  }
  if (isReturn) return returnPhotoUrl;
}

async function handlePickImageAsyncPhotoScreen(useLoadingImage, setPhotoUrl) {
  useLoadingImage(true);

  const returnUrl = await pickImageAsync();

  if (!returnUrl) return;

  const returnPhotoUrl = await uploadImageToCloudinary(returnUrl);

  if (returnPhotoUrl) {
    useLoadingImage(false);
    setPhotoUrl(returnPhotoUrl);
  }
}

async function handleReplaceImageAsync(
  currentUser,
  deleteImageItem,
  setIsTrigger
) {
  if (isImageOrVideo(deleteImageItem) === "video") {
    const replaceVideoItemIndex = currentUser?.videoArray.findIndex(
      (el) => el === deleteImageItem
    );

    const returnUrl = await pickVideoAsync();
    if (!returnUrl) return;
    const returnPhotoUrl = await uploadVideoToCloudinary(returnUrl);

    if (returnPhotoUrl) {
      currentUser?.videoArray.splice(replaceVideoItemIndex, 1, returnPhotoUrl);

      await updateUserValueField(
        "all-users",
        currentUser?.id,
        "videoArray",
        currentUser?.videoArray,
        () => {}
      );
      setIsTrigger(true);
    }
  } else {
    const replaceImageItemIndex = currentUser?.mediaArray.findIndex(
      (el) => el === deleteImageItem
    );

    const returnUrl = await pickImageAsync();
    if (!returnUrl) return;
    const returnPhotoUrl = await uploadImageToCloudinary(returnUrl);

    if (returnPhotoUrl) {
      currentUser?.mediaArray.splice(replaceImageItemIndex, 1, returnPhotoUrl);

      await updateUserValueField(
        "all-users",
        currentUser?.id,
        "mediaArray",
        currentUser?.mediaArray,
        () => {}
      );
      setIsTrigger(true);
    }
  }
}
async function handleDeleteImageAsync(
  currentUser,
  deleteImageItem,
  setIsTrigger
) {
  if (isImageOrVideo(deleteImageItem) === "video") {
    const deletedVideoItemIndex = currentUser?.videoArray.findIndex(
      (el) => el === deleteImageItem
    );

    if (
      deletedVideoItemIndex >= 0 &&
      deletedVideoItemIndex < currentUser?.videoArray.length
    ) {
      currentUser?.videoArray.splice(deletedVideoItemIndex, 1);

      await updateUserValueField(
        "all-users",
        currentUser?.id,
        "videoArray",
        currentUser?.videoArray,
        () => {}
      );
      setIsTrigger(true);
    }
  } else {
    const deletedImageItemIndex = currentUser?.mediaArray.findIndex(
      (el) => el === deleteImageItem
    );

    if (
      deletedImageItemIndex >= 0 &&
      deletedImageItemIndex < currentUser?.mediaArray.length
    ) {
      currentUser?.mediaArray.splice(deletedImageItemIndex, 1);

      await updateUserValueField(
        "all-users",
        currentUser?.id,
        "mediaArray",
        currentUser?.mediaArray,
        () => {}
      );
      setIsTrigger(true);
    }
  }
}

async function handlePickVideoAsync(
  noAllowEditing,
  setIsTrigger,
  currentUserId,
  setisVideoUploading
) {
  try {
    const returnUrl = await pickVideoAsync(noAllowEditing);

    if (!returnUrl) return;

    if (returnUrl) setisVideoUploading(true);

    const returnPhotoUrl = await uploadVideoToCloudinary(returnUrl);

    if (currentUserId) {
      const result = await addToArrayField(
        "all-users",
        currentUserId,
        "videoArray",
        returnPhotoUrl
      );

      if (result?.status === "ok") {
        setisVideoUploading(false);
        setIsTrigger(true);
      }
    }
  } catch (error) {
    console.log("Error uploading video:", error);
  }
}

export {
  handlePickImageAsync,
  handlePickImageAsyncPhotoScreen,
  handleDeleteImageAsync,
  handleReplaceImageAsync,
  handlePickVideoAsync,
};
