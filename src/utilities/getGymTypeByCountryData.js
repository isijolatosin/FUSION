import { gymTypesByCountry } from "../constants";
import { formatCountryName } from "./formatCountryName";

function getGymTypeByCountryData(country) {
  if (!country) return;

  let userFormattedCountry = formatCountryName(country);
  let returnArray = [];

  if (userFormattedCountry === "nigeria") {
    userFormattedCountry = "worldwide";

    returnArray = gymTypesByCountry?.[userFormattedCountry];
  } else {
    returnArray = [
      ...gymTypesByCountry?.[userFormattedCountry],
      ...gymTypesByCountry?.["worldwide"],
    ];
  }

  return returnArray;
}

export { getGymTypeByCountryData };
