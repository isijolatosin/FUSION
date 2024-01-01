function calculateAge(year) {
  const currentYear = new Date().getFullYear();

  return currentYear - year;
}

export default calculateAge;
