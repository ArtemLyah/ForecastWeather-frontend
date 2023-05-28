export function getCurrentDate() {
  const currentDate = new Date().setHours(0, 0, 0, 0);
  return new Date(currentDate);
}

export function setCurrentDate(date) {
  const newDate = new Date(date).setHours(3, 0, 0, 0);
  return new Date(newDate);
}