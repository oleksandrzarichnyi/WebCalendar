const fillTime = () => {
  const times = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minutes = 0; minutes < 60; minutes += 15) {
      const h = hour.toString().padStart(2, '0');
      const m = minutes.toString().padStart(2, '0');
      times.push(`${h}:${m}`);
    }
  }

  return times;
}

export const TIME_INTERVALS = fillTime();