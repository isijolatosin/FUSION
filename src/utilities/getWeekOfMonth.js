function getWeekOfMonth() {
  const date = new Date(); // Get the current date
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const dayOfMonth = date.getDate();
  const weekNumber = Math.ceil((dayOfMonth + firstDay.getDay()) / 7);
  return weekNumber;
}
export { getWeekOfMonth };
