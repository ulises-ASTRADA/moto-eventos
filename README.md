# Moto Eventos

A React prototype for discovering motorcycle events and allowing organizers to create event listings. Visitors can browse a list, switch to a calendar, and open individual event details through a Spanish-language interface.

## Implemented experience

- Event list, calendar, and detail routes built with React Router.
- An organizer event form that updates shared React state.
- Firebase email/password sign-in and account creation.
- User and organizer interface paths, with Chakra UI components and motorcycle-themed styling.

**Stack:** React 18, JavaScript, React Router 6, Chakra UI 2, Firebase Authentication, React Big Calendar, Moment, and Create React App.

## Architecture

`src/App.js` owns event and role state and passes it to route components. `CalendarPage.jsx` renders the calendar, `EventDetailsPage.jsx` handles detail views, and `LoginPage.jsx` integrates Firebase Authentication. Firebase initialization lives in `src/firebaseConfig.js`.

| Review area | Entry point |
| --- | --- |
| Routing and shared state | `src/App.js` |
| Event creation | `src/components/AddEventForm.jsx` |
| Calendar and event details | `src/components/CalendarPage.jsx`, `src/components/EventDetailsPage.jsx` |
| Authentication flow | `src/components/LoginPage.jsx` |

## Run locally

```bash
git clone https://github.com/ulises-ASTRADA/moto-eventos.git
cd moto-eventos
npm ci
npm start
```

Open `http://localhost:3000`. To exercise authentication, configure a Firebase project you control in `src/firebaseConfig.js`, enable email/password sign-in, and configure authorized domains. Firebase web configuration is shipped to browsers; privileged service account credentials must never be placed in this file.

```bash
npm run build
CI=true npm test -- --watchAll=false
```

The project retains Create React App test scaffolding. Its presence does not establish coverage of authentication or event workflows.

## Current status and limitations

This is a frontend prototype. Events are held in memory and reset on page reload. Organizer roles are selected or inferred in client code and are not enforced by a trusted backend. The route guard controls the interface; it must not be treated as a security boundary.

Before a production launch, persist events in a backend, enforce organizer permissions there, restore authenticated sessions reliably, and replace the generated test with workflow coverage. Any future Firebase database or storage integration must have independently reviewed access rules.

The repository is useful for reviewing component composition, client-side routing, form flows, and an initial authentication integration.
