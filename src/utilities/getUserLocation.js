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

const getAddress = async (latitude, longitude) => {
  try {
    let address = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    const city = address?.[0]?.city;
    const country = address?.[0]?.country;
    const countryCode = address?.[0]?.isoCountryCode;
    const district = address?.[0]?.district;
    const postalCode = address?.[0]?.postalCode;
    const region = address?.[0]?.region;
    const street = address?.[0]?.street;
    const streetNumber = address?.[0]?.streetNumber;
    const subregion = address?.[0]?.subregion;
    const timezone = address?.[0]?.timezone;
    const addressObject = {
      city,
      country,
      countryCode,
      district,
      postalCode,
      region,
      street,
      streetNumber,
      subregion,
      timezone,
    };
    return addressObject;
  } catch (error) {
    console.error("Error fetching address:", error);
  }
};

const getCityFromAddress = async (address) => {
  if (!address) return "";

  const { longitude, latitude } = await getLocationByAddress(address);

  const _address = await getAddress(latitude, longitude);

  if (!Object.keys(_address)?.length) return "";

  return _address;
};

export {
  getUserLocation,
  requestLocationPermission,
  getLocationByAddress,
  getAddress,
  getCityFromAddress,
};
