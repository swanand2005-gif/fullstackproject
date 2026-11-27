import { useEffect, useState } from 'react';
import './App.css';

const defaults = [
  ['Solve 1 DSA / LeetCode problem', 'Coding'],
  ['Python script or automation practice', 'Coding'],
  ['Git commit & push to GitHub', 'Coding'],
  ['20-min Surya Namaskar', 'Health'],
  ['Read documentation or technical blog', 'Study'],
].map(([title, category], id) => ({ id: id + 1, title, category, logs: [] }));

const dateStr = (date = new Date()) =>
  new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

export default function App() {
  const [habits, setHabits] = useState(() =>
    JSON.parse(localStorage.getItem('local_habits')) || defaults
  );
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Coding');

  useEffect(() => localStorage.setItem('local_habits', JSON.stringify(habits)), [habits]);

  const today = dateStr();
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 6 + i);
    return { key: dateStr(date), label: date.toLocaleDateString('en-US', { weekday: 'narrow' }) };
  });

  const streak = (logs) => {
    const done = new Set(logs);
    let count = 0;
    const date = new Date();
    if (!done.has(today)) date.setDate(date.getDate() - 1);
    while (done.has(dateStr(date))) {
      count++;
      date.setDate(date.getDate() - 1);
    }
    return count;
  };

  const toggle = (id, key) => setHabits(items => items.map(habit =>
    habit.id === id
      ? { ...habit, logs: habit.logs.includes(key) ? habit.logs.filter(d => d !== key) : [...habit.logs, key] }
      : habit
  ));

  const addHabit = (event) => {
    event.preventDefault();
    if (!title.trim()) return;
    setHabits(items => [{ id: Date.now(), title: title.trim(), category, logs: [] }, ...items]);
    setTitle('');
  };

  const completed = habits.filter(habit => habit.logs.includes(today)).length;
  const progress = habits.length ? Math.round(completed / habits.length * 100) : 0;

  return (
    <div className="container">
      <header className="header">
        <div>
          <h1>Dev Habit Tracker</h1>
          <p className="date-display">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </p>
        </div>
        <div className="progress-box">
          <span className="subtitle">
            Today: <strong>{completed}/{habits.length}</strong> ({progress}%)
          </span>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </header>

      <form className="habit-form" onSubmit={addHabit}>
        <input
          type="text"
          placeholder="New habit (e.g., SQL queries, Debugging)..."
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <select value={category} onChange={event => setCategory(event.target.value)}>
          <option value="Coding">Coding</option>
          <option value="Study">Study</option>
          <option value="Health">Health</option>
          <option value="Finance">Finance</option>
        </select>
        <button type="submit">Add</button>
      </form>

      {habits.length === 0 ? (
        <p className="empty">No habits yet. Add one above!</p>
      ) : (
        <ul className="habit-list">
          {habits.map(habit => {
            const doneToday = habit.logs.includes(today);
            return (
              <li key={habit.id} className={`habit-card ${doneToday ? 'completed' : ''}`}>
                <div className="habit-info" onClick={() => toggle(habit.id, today)}>
                  <input type="checkbox" checked={doneToday} readOnly />
                  <div className="habit-details">
                    <span className="habit-title">{habit.title}</span>
                    <span className="badge">{habit.category}</span>
                  </div>
                </div>

                <div className="week-grid" title="Click any day to toggle completion">
                  {days.map(day => {
                    const isDone = habit.logs.includes(day.key);
                    return (
                      <button
                        key={day.key}
                        type="button"
                        className={`day-pill ${isDone ? 'done' : ''} ${day.key === today ? 'today' : ''}`}
                        onClick={() => toggle(habit.id, day.key)}
                        title={day.key}
                      >
                        {day.label}
                      </button>
                    );
                  })}
                </div>

                <div className="habit-actions">
                  <span className="streak" title={`Total completions: ${habit.logs.length}`}>
                    Streak: {streak(habit.logs)}d
                  </span>
                  <button
                    className="delete-btn"
                    onClick={() => setHabits(items => items.filter(item => item.id !== habit.id))}
                    title="Delete habit"
                  >
                    ✕
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
