import { useState } from 'react';
import './App.css';

export default function App() {
  const [dummy, setDummy] = useState(false);

  return (
    <div className="app">
      <header className="app-header">
        <h1>ApplyTrack</h1>
        <p>Loading application shell...</p>
      </header>
      <main className="app-main">
        <p>This app shell will be fleshed out in later commits.</p>
      </main>
    </div>
  );
}
