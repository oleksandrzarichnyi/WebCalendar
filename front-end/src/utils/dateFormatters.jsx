export function parseSelectedDay(dateStr) {
  if (!dateStr) return;

  const [month, day, year] = dateStr.split('-');
  const date = new Date(`${month} ${day}, ${year}`);

  if (isNaN(date)) return;

  const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'short' })
    .format(date)
    .toUpperCase();

  return {
    day: weekday,
    number: date.getDate()
  };
}

export const parseEventDate = (date) => {
  if (!date) return '';
  if (date === 'Not selected') return;

  const input = new Date(date.replace(/-/g, ' '));

  const formatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).format(input);

  return formatted;
}

export const parseHeaderDate = (date) => {
  if (!date) return '';
  if (date === 'Not selected') return '';

  const [month, day, year] = date.split('-');

  const input = new Date(`${month} ${day}, ${year}`);

  if (isNaN(input)) return ''; 

  const formatted = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(input);

  return formatted;
}