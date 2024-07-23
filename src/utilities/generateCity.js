import { getCityFromAddress } from "./getUserLocation";

function generateCity(setCall, address) {
  (async () => {
    const _address = await getCityFromAddress(address);

    setCall(`${_address?.city}. ${_address?.region}`);
  })();
}

export { generateCity };
