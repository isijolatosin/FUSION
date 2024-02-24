import calculateDistance from "./calculateDistance";

const filterUsersWithinDistanceRange = (
  currentUserLocation,
  dataArray,
  distanceValue
) => {
  const usersWithinDistanceRange = dataArray.filter((user) => {
    const targetUserLocation = {
      longitude: user?.longitude,
      latitude: user?.latitude,
    };

    const distance = Math.ceil(
      calculateDistance(currentUserLocation, targetUserLocation)
    );
    return distance <= distanceValue;
  });

  return usersWithinDistanceRange;
};

export default filterUsersWithinDistanceRange;
