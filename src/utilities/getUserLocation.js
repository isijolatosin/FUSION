import * as Location from "expo-location";

const getUserLocation = async (setResponseMessage) => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.error("Location permission not granted");
    setResponseMessage({
      message: "Permission to access location was denied",
      code: "failed",
    });
    return;
  }

  let location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });
  const { latitude, longitude } = location.coords;

  return { latitude, longitude };
};

export default getUserLocation;
