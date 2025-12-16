const fillHours = () => {
  const hours = [];

  for (let h = 0; h < 24; h++) {
    hours.push(`${h.toString().padStart(2, '0')}:00`);
  }

  return hours;
};

export const TIME_HOURS = fillHours();