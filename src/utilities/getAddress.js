import * as Location from "expo-location";

const getAddress = async (latitude, longitude) => {
  try {
    let address = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    const city = address?.[0]?.city;
    const country = address?.[0]?.country;
    const district = address?.[0]?.district;
    const countryCode = address?.[0]?.isoCountryCode;
    const postalCode = address?.[0]?.postalCode;
    const region = address?.[0]?.region;
    const street = address?.[0]?.street;
    const streetNumber = address?.[0]?.streetNumber;
    const subregion = address?.[0]?.subregion;
    const timezone = address?.[0]?.timezone;
    const addressObject = {
      city,
      country,
      district,
      countryCode,
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
export default getAddress;
