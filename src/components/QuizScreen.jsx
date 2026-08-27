import { useState, useEffect } from 'react';
import FeedbackMessage from './FeedbackMessage';

export default function QuizScreen({ questions, t, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState({ isCorrect: null, correctAnswer: null });
  const [answers, setAnswers] = useState([]); // array of {a, b, isCorrect}

  const currentQuestion = questions[currentIndex];
  const correctAnswer = currentQuestion.a * currentQuestion.b;

  const handleSubmit = (e) => {
    e.preventDefault();
    const answer = Number(userAnswer);
    const isCorrect = answer === correctAnswer;
    setFeedback({ isCorrect, correctAnswer });
    setAnswers((prev) => [
      ...prev,
      { a: currentQuestion.a, b: currentQuestion.b, isCorrect },
    ]);
  };

  useEffect(() => {
    if (feedback.isCorrect === null) return;
    const timer = setTimeout(() => {
      if (currentIndex === questions.length - 1) {
        onFinish(answers); // pass complete answer list
      } else {
        setCurrentIndex((prev) => prev + 1);
        setUserAnswer('');
        setFeedback({ isCorrect: null, correctAnswer: null });
      }
    }, feedback.isCorrect ? 800 : 1500);
    return () => clearTimeout(timer);
  }, [feedback, currentIndex, questions.length, onFinish, answers]);

  return (
    <div className="screen quiz-screen">
      <div className="progress">
        {t.question} {currentIndex + 1} / {questions.length}
      </div>
      <div className="question">
        {currentQuestion.a} × {currentQuestion.b} = ?
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          inputMode="numeric"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          autoFocus
          disabled={feedback.isCorrect !== null}
        />
        <button type="submit" disabled={userAnswer === '' || feedback.isCorrect !== null}>
          OK
        </button>
      </form>
      <FeedbackMessage
        isCorrect={feedback.isCorrect}
        correctAnswer={correctAnswer}
        t={t}
      />
    </div>
  );
}
