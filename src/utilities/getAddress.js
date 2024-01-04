const getAddress = async (latitude, longitude) => {
  if (latitude && longitude) {
    try {
      let address = await Location.reverseGeocodeAsync({
        latitude: latitude,
        longitude: longitude,
      });

      return address;
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  }
};
