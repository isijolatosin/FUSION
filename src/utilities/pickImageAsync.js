import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import axios from "axios";

const compressImage = async (uri) => {
  const manipResult = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 800 } }], // Adjust the width as needed
    { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
  );
  return manipResult.uri;
};

export const uploadImageToCloudinary = async (imagePath) => {
  if (!imagePath) {
    console.error("No image selected for upload");
    return;
  }

  try {
    const compressedImageUri = await compressImage(imagePath);
    const formData = new FormData();
    formData.append("file", {
      uri: compressedImageUri,
      name: "image.jpg",
      type: "image/jpg",
    });

    formData.append("upload_preset", "fusion_pgas5byx");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dhdccvkyt/image/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
  }
};

export const pickImageAsync = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    base64: true,
    exif: true,
  });

  if (!result.canceled) {
    const returnUrl = result["assets"][0]["uri"];

    return returnUrl;
  } else {
    alert("You did not select any image.");
  }
};
