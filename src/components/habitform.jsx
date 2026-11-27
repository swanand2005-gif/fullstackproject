import { useState } from 'react';

export default function HabitForm({ onAddHabit }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Coding');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddHabit(title.trim(), category);
    setTitle('');
  };

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New habit (e.g., SQL queries, Debugging)..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Coding">Coding</option>
        <option value="Study">Study</option>
        <option value="Health">Health</option>
        <option value="Finance">Finance</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}