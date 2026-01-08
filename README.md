Stack: React, Zustand, Express, Tailwind, Jest

Client–server application with a Node.js backend for managing multiple calendars via a REST API.

Features

1. Calendars management: create calendars, set names and colors, edit and delete.
2. Events management: create events, set names, assign to a calendar, select a date, time, set a description, edit and delete.
3. Date selection: select dates either via the DatePicker component or header buttons. Event display updates based on the selected date.
4. Calendar filtering: select one or more calendars. Displayed events depend on the selected calendars.
5. Today shortcut: "Today" button sets the current day as the selected date.

Run the project locally:
1. cd back-end > node index.js
2. cd front-end > npm run dev
