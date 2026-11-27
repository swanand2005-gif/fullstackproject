export default function HabitItem({ habit, todayStr, last7Days, streak, onToggleDate, onDelete }) {
  const completedToday = habit.logs.includes(todayStr);

  return (
    <li className={`habit-card ${completedToday ? 'completed' : ''}`}>
      <div className="habit-info" onClick={() => onToggleDate(habit.id, todayStr)}>
        <input type="checkbox" checked={completedToday} onChange={() => {}} />
        <div className="habit-details">
          <span className="habit-title">{habit.title}</span>
          <span className="badge">{habit.category}</span>
        </div>
      </div>

      {/* 7-Day Visual Tracker */}
      <div className="week-grid" title="Click any day to toggle completion">
        {last7Days.map(day => {
          const isDone = habit.logs.includes(day.dateStr);
          return (
            <button
              key={day.dateStr}
              type="button"
              className={`day-pill ${isDone ? 'done' : ''} ${day.dateStr === todayStr ? 'today' : ''}`}
              onClick={() => onToggleDate(habit.id, day.dateStr)}
              title={day.dateStr}
            >
              {day.label}
            </button>
          );
        })}
      </div>

      <div className="habit-actions">
        <span className="streak" title={`Total completions: ${habit.logs.length}`}>
          🔥 {streak}d
        </span>
        <button className="delete-btn" onClick={() => onDelete(habit.id)} title="Delete habit">
          ✕
        </button>
      </div>
    </li>
  );
}