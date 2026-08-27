export default function FeedbackMessage({ isCorrect, correctAnswer, t }) {
  if (isCorrect === null) return null;
  return (
    <div className={`feedback ${isCorrect ? 'correct' : 'wrong'}`}>
      {isCorrect ? (
        <span>{t.correct}</span>
      ) : (
        <span>
          {t.wrong} <strong>{correctAnswer}</strong>
        </span>
      )}
    </div>
  );
}
