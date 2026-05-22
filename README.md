# ApplyTrack

**ApplyTrack** is a persistent internship and job application tracker built with React, Vite, JavaScript, CSS, and browser localStorage.

## Description

ApplyTrack lets users add, view, edit, delete, search, and filter application records in a clean card-based interface. Data persists between browser sessions using `localStorage`, so application records remain available after refresh.

## Features

- Add new applications with company, role, status, deadline, link, and notes
- View applications in responsive cards with status badges
- Edit existing applications without losing their original ID or created timestamp
- Delete applications with confirmation
- Search by company, role, or notes
- Filter applications by status
- Basic stats showing total, applied, interview, offer, and rejected counts
- Responsive UI styled with plain CSS

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- Browser `localStorage`

## Requirements

- Node.js 16+ installed
- npm installed

## Run Locally

From the project root:

```bash
npm install
npm run dev
```

Then open the local development URL shown in the terminal, typically `http://localhost:5173`.

## Persistence Explanation

ApplyTrack stores application data in browser `localStorage` under the key `applytrack_applications`.
The app loads saved data on startup and writes updates whenever applications are added, edited, or deleted. Corrupted JSON in storage is handled gracefully by falling back to an empty list.

## Folder Structure

```text
apply-track/
├── src/
│   ├── main.jsx          # React entry point
│   ├── App.jsx           # Main application UI and logic
│   ├── App.css           # Plain CSS styling
│   └── utils/
│       └── storage.js    # localStorage utilities and validation
├── index.html            # Root HTML file
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
└── ANSWERS.md            # Assessment notes and edge case documentation
```

## Assessment Note
This repository is intended for the ApplyTrack assessment, demonstrating a working React + Vite app with persistent localStorage storage, CRUD functionality, search/filter, and a responsive UI.
