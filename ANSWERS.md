# ApplyTrack Assessment Answers

- Project: ApplyTrack
- Stack: React, Vite, JavaScript, CSS, localStorage
- Description: A persistent mini-app for tracking internship and job applications with CRUD, search, filter, stats, and responsive design.

## Notes

1. The app uses localStorage for persistence.
2. Required fields are validated.
3. The UI supports mobile and desktop.
4. No backend or external UI libraries are used.

## Strong Edge Case

- The strongest edge case is corrupted `localStorage` JSON, because it can break app load on startup. The app recovers by catching JSON parse errors in `src/utils/storage.js` and returning an empty application list.

