import {
  pickImageAsync,
  pickImageFromCamera,
  uploadImageToCloudinary,
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
    ? await pickImageFromCamera(noAllowEditingForPhotoMessage)
    : await pickImageAsync(noAllowEditingForPhotoMessage);

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
async function handleDeleteImageAsync(
  currentUser,
  deleteImageItem,
  setIsTrigger
) {
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

export {
  handlePickImageAsync,
  handlePickImageAsyncPhotoScreen,
  handleDeleteImageAsync,
  handleReplaceImageAsync,
};
