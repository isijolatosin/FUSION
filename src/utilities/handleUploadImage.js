import {
  pickImageAsync,
  pickImageFromCamera,
  uploadImageToCloudinary,
} from "./pickImageAsync";
import {
  addToArrayField,
  removeItemFromArray,
} from "./updateFirestoreDatabaseField";

async function handlePickImageAsync(
  useLoadingImage,
  setPhotoUrl,
  setOpenImageUploadModal,
  currentUserId,
  setIsRetrigger,
  isToCapture,
  noAllowEditingForPhotoMessage,
  sendPhotoMessage,
  isReturn
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
    currentUserId &&
      addToArrayField(
        "all-users",
        currentUserId,
        "mediaArray",
        returnPhotoUrl,
        setIsRetrigger
      );
  }

  if (isReturn) return returnPhotoUrl;
}

async function handlePickImageAsyncPhotoScreen(
  useLoadingImage,
  setPhotoUrl,
  currentUserId
) {
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
  currentUserId,
  deleteImageItem,
  setIsRetrigger,
  setOpenDeleteModal
) {
  setOpenDeleteModal(false);

  currentUserId &&
    removeItemFromArray(
      "all-users",
      currentUserId,
      "mediaArray",
      deleteImageItem,
      setIsRetrigger
    );
}

export {
  handlePickImageAsync,
  handlePickImageAsyncPhotoScreen,
  handleDeleteImageAsync,
};
