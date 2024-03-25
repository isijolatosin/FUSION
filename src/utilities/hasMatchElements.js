function hasMatchingElements(array1, array2, numberOfcomparisons) {
  const commonElements = array1?.filter((element) => array2?.includes(element));

  return commonElements?.length >= numberOfcomparisons;
}
export default hasMatchingElements;
