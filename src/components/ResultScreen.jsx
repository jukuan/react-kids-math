import StarDisplay from './StarDisplay';

export default function ResultScreen({
  score,
  totalQuestions,
  t,
  hardTables,
  earnedStars,
  onPlayAgain,
}) {
  return (
    <div className="screen result-screen">
      <h2>
        {t.score}: {score} {t.outOf} {totalQuestions}
      </h2>
      {score === totalQuestions && <p className="perfect-message">{t.perfect}</p>}
      <StarDisplay totalStars={earnedStars} />
      <div className="hard-tables">
        {hardTables.length > 0 ? (
          <>
            <p>{t.hardTables}</p>
            <ul>
              {hardTables.map((table) => (
                <li key={table}>× {table}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>{t.noHardTables}</p>
        )}
      </div>
      <button className="primary-btn" onClick={onPlayAgain}>
        {t.playAgain}
      </button>
    </div>
  );
}
