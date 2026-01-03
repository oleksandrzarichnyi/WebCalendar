const fillDays = (number) => {
  let days = [];

  for (let i = 1; i <= number; i++) {
    days.push(i);
  }
  
  return days;
}

export const MONTHS = [
  { name: 'January', days: fillDays(31) },
  { name: 'February', days: fillDays(28) },
  { name: 'March', days: fillDays(31) },
  { name: 'April', days: fillDays(30) },
  { name: 'May', days: fillDays(31) },
  { name: 'June', days: fillDays(30) },
  { name: 'July', days: fillDays(31) },
  { name: 'August', days: fillDays(31) },
  { name: 'September', days: fillDays(30) },
  { name: 'October', days: fillDays(31) },
  { name: 'November', days: fillDays(30) },
  { name: 'December', days: fillDays(31) },
];