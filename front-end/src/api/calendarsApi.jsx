const BASE_URL = 'http://localhost:3000';

export async function getCalendars() {
  return fetch(`${BASE_URL}/calendars`).then(res => res.json());
}

export async function addCalendar(calendar) {
  return fetch(`${BASE_URL}/calendars`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(calendar)
  }).then(res => res.json());
}
