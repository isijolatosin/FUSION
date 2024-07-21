import { imageExtensions, videoExtensions } from "../constants";

const isImageOrVideo = (fileName) => {
  // Extract the file extension
  const extension = fileName.split(".").pop().toLowerCase();

  // Check if the extension is in the image or video extensions arrays
  if (imageExtensions.includes(extension)) {
    return "image";
  } else if (videoExtensions.includes(extension)) {
    return "video";
  } else {
    return "unknown";
  }
};

export { isImageOrVideo };
