function groupDataByKey(data) {
  const groupedData = {};
  const groupedDataKeys = [];

  if (!data.length) return;

  data?.forEach((item) => {
    const date = new Date(item?.timestamp?.seconds * 1000);
    const formattedDate = `${date?.getFullYear()}-${(date?.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    if (!groupedData[formattedDate]) {
      groupedData[formattedDate] = [];
    }

    if (!groupedDataKeys.includes(formattedDate)) {
      groupedDataKeys.push(formattedDate);
    }

    groupedData[formattedDate].push(item);
  });

  return { groupedDataKeys, groupedData };
}

export { groupDataByKey };
