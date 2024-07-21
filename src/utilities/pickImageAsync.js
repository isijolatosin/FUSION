import * as ImagePicker from "expo-image-picker";
// import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import axios from "axios";

const compressImage = async (uri) => {
  const manipResult = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 400 } }], // Adjust the width as needed
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
// export const uploadAudioToCloudinary = async (audioPath) => {
//   if (!audioPath) {
//     console.error("No audio path selected for upload");
//     return;
//   }
//
//   try {
//     // Read the file data from the local audioPath
//     const fileData = await FileSystem.readAsStringAsync(audioPath, {
//       encoding: FileSystem.EncodingType.Base64,
//     });
//
//     // Upload the file data to Cloudinary
//     const response = await fetch(
//       "https://api.cloudinary.com/v1_1/dhdccvkyt/upload",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           file: `data:audio/m4a;base64,${fileData}`,
//           upload_preset: "fusion_pgas5byx",
//         }),
//       }
//     );
//
//     if (!response.ok) {
//       throw new Error("Failed to upload audio to Cloudinary");
//     }
//
//     const responseData = await response.json();
//     console.log("responseData", responseData);
//
//     // Cloudinary returns the URL of the uploaded file
//     // return responseData.secure_url;
//   } catch (error) {
//     console.error("Error uploading audio to Cloudinary:", error);
//     return null;
//   }
// };

export const pickImageAsync = async (noAllowEditingForPhotoMessage) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: noAllowEditingForPhotoMessage ? false : true,
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

export const pickImageFromCamera = async (noAllowEditingForPhotoMessage) => {
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: noAllowEditingForPhotoMessage ? false : true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    const returnUrl = result["assets"][0]["uri"];

    return returnUrl;
  } else {
    alert("You did not capture any image.");
  }
};

export const pickVideoAsync = async (noAllowEditing) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    allowsEditing: noAllowEditing ? false : true,
    quality: 1,
  });

  if (!result.canceled) {
    return result?.assets?.[0]?.uri;
  }
};

export const uploadVideoToCloudinary = async (videoUrl) => {
  if (!videoUrl) {
    console.error("No video selected for upload");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("file", {
      uri: videoUrl,
      type: "video/mp4", // Ensure the correct MIME type
      name: "video.mp4", // You can set the name to any desired value
    });
    formData.append("upload_preset", "fusion_pgas5byx");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dhdccvkyt/video/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.secure_url) {
      return response.data.secure_url; // Use secure_url to get the HTTPS URL
    }
  } catch (error) {
    console.error("Error uploading video to Cloudinary:", error);
  }
};
