import { getDistance } from "geolib";

const calculateDistance = (userLocation, targetLocation) => {
  const distance = getDistance(
    { latitude: userLocation.latitude, longitude: userLocation.longitude },
    { latitude: targetLocation.latitude, longitude: targetLocation.longitude }
  );

  // Distance is in meters
  return distance;
};

export default calculateDistance;
