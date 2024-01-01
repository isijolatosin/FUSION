import calculateDistance from "./calculateDistance";

const filterUsersWithinDistanceRange = (
  currentUserLocation,
  allUsers,
  distanceValue
) => {
  const usersWithinDistanceRange = allUsers.filter((user) => {
    const targetUserLocation = {
      longitude: user?.longitude,
      latitude: user?.latitude,
    };

    const distance = calculateDistance(currentUserLocation, targetUserLocation);

    return distance <= distanceValue;
  });

  return usersWithinDistanceRange;
};

export default filterUsersWithinDistanceRange;
