# ApplyTrack Assessment Answers

- Project: ApplyTrack
- Stack: React, Vite, JavaScript, CSS, localStorage
- Description: A persistent mini-app for tracking internship and job applications with CRUD, search, filter, stats, and responsive design.

## Notes

1. The app meets CRUD requirements: users can add, view, edit, and delete applications.
2. Data persists between runs via browser `localStorage` under the `applytrack_applications` key.
3. The app implements `localStorage` safely by parsing stored JSON inside a `try/catch` and falling back to an empty list on failure.
4. The README includes exact install and start commands for a fresh machine.
5. The extra feature beyond CRUD is meaningful: search, status filter, and stats provide real value for tracking applications.

## Strong Edge Case

- The strongest edge case is corrupted `localStorage` JSON, because it can break app load on startup. The app recovers by catching JSON parse errors in `src/utils/storage.js` and returning an empty application list.

