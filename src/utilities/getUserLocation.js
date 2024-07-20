import * as Location from "expo-location";

const requestLocationPermission = async (setResponseMessage) => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.error("Location permission not granted");
    setResponseMessage({
      message: "Permission to access location was denied",
      code: "failed",
    });
    return;
  }

  return status;
};

const getUserLocation = async () => {
  let location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });
  const { latitude, longitude } = location.coords;

  return { latitude, longitude };
};

const getLocationByAddress = async (address) => {
  try {
    // Geocode address
    let geocode = await Location.geocodeAsync(address);
    if (geocode.length > 0) {
      return geocode[0];
    } else {
      return { status: "Failed to retrieve gym location! Check gym address" };
    }
  } catch (error) {
    return error.message;
  }
};

export { getUserLocation, requestLocationPermission, getLocationByAddress };
