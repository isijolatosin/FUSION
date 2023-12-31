import calculateDistance from "./calculateDistance";

const filterUsersWithin20km = (userLocation, users, distanceValue) => {
  const usersWithin20km = users.filter((user) => {
    const distance = calculateDistance(userLocation, user.location);

    const distanceToMeters = distanceValue * 1000;

    return distance <= distanceToMeters;
  });

  return usersWithin20km;
};

export default filterUsersWithin20km;
