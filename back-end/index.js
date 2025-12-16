const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'calendars.json');

const app = express();
app.use(cors());
app.use(express.json());

function readCalendars() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeCalendars(calendar) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(calendar, null, 2));
}

app.get('/calendars', (req, res) => {
  const calendars = readCalendars();
  res.json(calendars);
});

app.post('/calendars', (req, res) => {
  const calendars = readCalendars();
  const newCalendar = {
    title: req.body?.title || 'Untitled calendar',
    color: req.body?.color || '#000000',
    events: [],
    id: Date.now(),
  };
  calendars.push(newCalendar);
  writeCalendars(calendars);
  res.status(201).json({ message: 'Calendar created', calendar: newCalendar });
});

app.patch('/calendars/:id', (req, res) => {
  const calendars = readCalendars();
  const calendarId = Number(req.params.id);

  const calendar = calendars.find(calendar => calendar.id === calendarId);

  if (!calendar) return res.status(404).json({ error: 'Calendar not found' });

  if (req.body.title !== undefined) calendar.title = req.body.title;
  if (req.body.color !== undefined) calendar.color = req.body.color;
  if (req.body.event !== undefined) calendar.events.push(req.body.event);

  writeCalendars(calendars);
  res.json({ message: 'Calendar updated' });
});

app.delete('/calendars/:id', (req, res) => {
  const calendars = readCalendars();
  const idToDelete = Number(req.params.id);

  const updated = calendars.filter(calendar => calendar.id !== idToDelete);

  if (updated.length === calendars.length) return res.status(404).json('Calendar not found');
  if (updated.length === 0) return;

  writeCalendars(updated);
  res.json(updated);
});

app.listen(3000, () => {
  console.log('server is running');
});