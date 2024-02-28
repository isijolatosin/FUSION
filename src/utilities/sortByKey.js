function sortByKey(array) {
  return array.sort((a, b) => {
    const valueA = a.value;
    const valueB = b.value;

    if (valueA < valueB) {
      return -1;
    }
    if (valueA > valueB) {
      return 1;
    }
    return 0;
  });
}

export default sortByKey;
