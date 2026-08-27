export default function FeedbackMessage({ isCorrect, correctAnswer, t }) {
  let content = '';
  let className = 'feedback';

  if (isCorrect) {
    content = <span>{t.correct}</span>;
    className += ' correct';
  } else if (isCorrect === false) {
    content = (
      <span>
        {t.wrong} <strong>{correctAnswer}</strong>
      </span>
    );
    className += ' wrong';
  } else {
    className += ' empty';
  }

  return <div className={className}>{content}</div>;
}
