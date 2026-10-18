import StarDisplay from './StarDisplay';

export default function ResultScreen({
  score,
  totalQuestions,
  t,
  hardTables,
  earnedStars,
  onPlayAgain,
  hideHardTables = false,
}) {
  const isPerfect = score === totalQuestions;

  return (
    <div className="screen result-screen">
      <h2>
        {t.score}: {score} {t.outOf} {totalQuestions}
      </h2>

      {isPerfect && (
        <>
          <p className="perfect-message">{t.perfect}</p>
          <div className="fox-proud">
            <img src="/mascot-transparent-bg.png" height="60" alt="fox" />
            <p>{t.foxProud}</p>
          </div>
        </>
      )}

      <StarDisplay totalStars={earnedStars} />

      {!hideHardTables && (
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
      )}

      <button className="primary-btn" onClick={onPlayAgain}>
        {t.playAgain}
      </button>
    </div>
  );
}
