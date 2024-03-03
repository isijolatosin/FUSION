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

function sortByTimestamp(array) {
  return array.sort((a, b) => {
    const valueADate = new Date(a.timestamp.seconds * 1000);
    const valueBDate = new Date(b.timestamp.seconds * 1000);
    const timestampA = valueADate.getTime();
    const timestampB = valueBDate.getTime();
    return timestampB - timestampA;
  });
}

export { sortByKey, sortByTimestamp };
