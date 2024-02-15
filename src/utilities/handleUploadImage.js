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
  setPhotoUrl,
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
    } else {
      setPhotoUrl(returnPhotoUrl);
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

async function handleDeleteImageAsync(
  currentUser,
  deleteImageItem,
  setIsTrigger
) {
  const deletedImageItemIndex = currentUser?.mediaArray.findIndex(
    (el) => el === deleteImageItem
  );

  const returnUrl = await pickImageAsync();
  if (!returnUrl) return;
  const returnPhotoUrl = await uploadImageToCloudinary(returnUrl);

  currentUser?.mediaArray.splice(deletedImageItemIndex, 1, returnPhotoUrl);
  setIsTrigger(true);

  await updateUserValueField(
    "all-users",
    currentUser?.id,
    "mediaArray",
    currentUser?.mediaArray
  );
}

export {
  handlePickImageAsync,
  handlePickImageAsyncPhotoScreen,
  handleDeleteImageAsync,
};
