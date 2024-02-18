function calculateDistance(userLocation, targetUserLocation) {
  const lat1 = userLocation?.latitude;
  const lon1 = userLocation?.longitude;
  const lat2 = targetUserLocation?.latitude;
  const lon2 = targetUserLocation?.longitude;

  // Radius of the Earth in kilometers
  const R = 6371;

  // Convert latitude and longitude from degrees to radians
  const differenceInLat = (lat2 - lat1) * (Math.PI / 180);
  const differenceInLon = (lon2 - lon1) * (Math.PI / 180);

  // Calculate Haversine formula
  const a =
    Math.sin(differenceInLat / 2) * Math.sin(differenceInLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(differenceInLon / 2) *
      Math.sin(differenceInLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Calculate distance
  const distance = R * c;

  return distance.toFixed(2);
}

export default calculateDistance;
