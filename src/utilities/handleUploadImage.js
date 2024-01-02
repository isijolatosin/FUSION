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
  isToCapture
) {
  useLoadingImage(true);

  const returnUrl = isToCapture
    ? await pickImageFromCamera()
    : await pickImageAsync();

  if (!returnUrl) return;

  const returnPhotoUrl = await uploadImageToCloudinary(returnUrl);

  if (returnPhotoUrl) {
    useLoadingImage(false);
    setPhotoUrl(returnPhotoUrl);
    setOpenImageUploadModal(false);
    addToArrayField(
      "all-users",
      currentUserId,
      "mediaArray",
      returnPhotoUrl,
      setIsRetrigger
    );
  }
}

async function handleDeleteImageAsync(
  currentUserId,
  deleteImageItem,
  setIsRetrigger,
  setOpenDeleteModal
) {
  setOpenDeleteModal(false);

  removeItemFromArray(
    "all-users",
    currentUserId,
    "mediaArray",
    deleteImageItem,
    setIsRetrigger
  );
}

export { handlePickImageAsync, handleDeleteImageAsync };
