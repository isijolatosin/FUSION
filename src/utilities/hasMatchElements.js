function hasMatchingElements(array1, array2, numberOfcomparisons) {
  if (array1?.length && array2?.length) {
    const commonElements = array1?.filter((element) =>
      array2?.includes(element)
    );

    return commonElements?.length >= numberOfcomparisons;
  } else {
    return false;
  }
}
export default hasMatchingElements;
