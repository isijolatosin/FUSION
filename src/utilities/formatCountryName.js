import {
  asianCountries,
  europeanCountries,
  middleEasternCountries,
} from "../constants";

function formatCountryName(country) {
  let _country = country;

  if (middleEasternCountries?.includes(country)) {
    _country = "middleeast";
  } else if (country?.toLowerCase() === "israel") {
    _country = "innerheightisrael";
  } else if (europeanCountries?.includes(country)) {
    _country = "europe";
  } else if (asianCountries?.includes(country)) {
    _country = "asia";
  }

  const cleanedName = _country?.replace(/[^A-Za-z0-9]/g, "");
  return cleanedName?.toLowerCase();
}

export { formatCountryName };
