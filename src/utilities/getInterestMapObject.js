import { interests } from "../constants";

function getInterestMapObject(word) {
  if (!word) return;
  const returnMapObject = interests?.find(
    (interest) => interest?.value?.toLowerCase() === word?.toLowerCase()
  );
  return returnMapObject;
}

export default getInterestMapObject;
