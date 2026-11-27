export default function Header({ completedCount, totalCount }) {
  const progressPercent = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;
  const todayFormatted = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <header className="header">
      <div>
        <h1>Dev Habit Tracker</h1>
        <p className="date-display">{todayFormatted}</p>
      </div>
      <div className="progress-box">
        <span className="subtitle">
          Today: <strong>{completedCount}/{totalCount}</strong> ({progressPercent}%)
        </span>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>
    </header>
  );
}