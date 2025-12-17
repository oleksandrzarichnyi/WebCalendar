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

export async function deleteCalendar(id) {
  const response = await fetch(`${BASE_URL}/calendars/${id}`, {
    method: 'DELETE',
    headers:  { 'Content-Type': 'application/json' }
  });

  if (!response.ok) throw new Error('Failed to delete');

  return response.json();
}

export async function updateCalendar({ id, data }) {
  const res = await fetch(`${BASE_URL}/calendars/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to update');

  return res.json();
}

export async function updateEvent({ calendarId, eventId, data }) {
  const res = await fetch(`${BASE_URL}/calendars/${calendarId}/events/${eventId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error('Failed to update event');

  return res.json();
}
