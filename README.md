# ApplyTrack

A clean, persistent mini-app for tracking job and internship applications. Built with React, Vite, and browser localStorage.

## Features

- ✅ **Full CRUD Operations** - Create, read, update, and delete applications
- 💾 **Persistent Storage** - Data automatically saves to browser localStorage
- 🔍 **Search** - Search by company name, role, or notes
- 📊 **Filter by Status** - Filter applications by applied, interview, offer, or rejected
- 📈 **Statistics** - View application stats at a glance
- 📱 **Responsive Design** - Works great on desktop, tablet, and mobile
- 🛡️ **Data Validation** - Required fields validated, corrupted data handled gracefully
- 🎨 **Clean UI** - No external UI libraries, pure CSS

## Application Fields

Each application tracks:
- **Company** (required)
- **Role** (required)
- **Status** (applied, interview, offer, rejected)
- **Deadline** (optional date)
- **Application Link** (optional URL)
- **Notes** (optional text)
- **Created At** (automatic timestamp)

## Project Structure

```
apply-track/
├── src/
│   ├── main.jsx           # React entry point
│   ├── App.jsx            # Main app component (all logic and UI)
│   ├── App.css            # All styling (responsive, no frameworks)
│   └── utils/
│       └── storage.js     # localStorage utilities and validation
├── index.html             # HTML template
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
└── .gitignore            # Git ignore file
```

## Setup & Running

### Prerequisites
- Node.js 16+ installed

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

## How to Use

1. **Add Applications** - Click "Add Application" and fill in at least company and role
2. **View Applications** - See all applications displayed as cards with status badges
3. **Search** - Use the search box to find applications by company, role, or notes
4. **Filter** - Select a status from the dropdown to filter applications
5. **Edit** - Click "Edit" on any application card to modify it
6. **Delete** - Click "Delete" to remove an application (with confirmation)
7. **Stats** - Check the stat cards at the top for quick overview

## Technical Details

### Storage
- Uses browser `localStorage` with key `applytrack_applications`
- Automatically saves after any change
- Gracefully handles corrupted data by resetting to empty state
- Validates data structure on load

### Validation
- Company and role are required fields
- Status must be selected
- All text inputs are trimmed to prevent whitespace-only entries
- Shows clear error messages if validation fails

### Styling
- Pure CSS (no Tailwind, Bootstrap, or other frameworks)
- CSS Grid and Flexbox for layout
- Responsive design with mobile-first approach
- CSS variables for consistent theming
- Smooth transitions and hover effects
- Color-coded status badges

### Performance
- Minimal dependencies (React + React DOM only)
- Fast build and development with Vite
- No unnecessary re-renders (proper React hooks usage)
- Efficient localStorage access pattern

## Browser Support

Works on all modern browsers that support:
- ES6+ JavaScript
- CSS Grid & Flexbox
- localStorage API
- Fetch API (for links)

## Notes for Development

### Code Quality
- Clean, readable variable names
- Meaningful component structure
- Simple, straightforward logic
- Inline comments on complex sections
- No overengineering - just what's needed

### Future Enhancement Ideas
- Export data as CSV
- Import applications from CSV
- Dark mode
- Bulk operations (delete multiple, change status)
- Local backup/restore
- Application templates by industry
- Reminders for upcoming deadlines
- Sorting options (by date, company, status)

## License

Created for Dev Weekends Fellowship 2026
