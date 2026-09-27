import { useState, useEffect, useRef, useCallback } from 'react';
import FeedbackMessage from './FeedbackMessage';

const ANSWER_TIME_LIMIT = 20; // seconds

export default function SquareQuizScreen({ questions, t, onFinish, onFinishEarly }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState({ isCorrect: null, correctAnswer: null });
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(ANSWER_TIME_LIMIT);
  const timerRef = useRef(null);
  const feedbackRef = useRef(feedback);
  const currentQuestionRef = useRef(questions[currentIndex]);

  useEffect(() => {
    feedbackRef.current = feedback;
  }, [feedback]);

  useEffect(() => {
    currentQuestionRef.current = questions[currentIndex];
  }, [currentIndex, questions]);

  const handleTimeout = useCallback(() => {
    if (feedbackRef.current.isCorrect !== null) return;

    const currentQuestion = currentQuestionRef.current;
    const correctAnswer = currentQuestion.a * currentQuestion.b;

    setFeedback({ isCorrect: false, correctAnswer });
    setAnswers((prev) => [
      ...prev,
      { a: currentQuestion.a, b: currentQuestion.b, isCorrect: false },
    ]);
  }, []);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentIndex, handleTimeout]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.isCorrect !== null) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const answer = Number(userAnswer);
    const isCorrect = answer === correctAnswer;
    setFeedback({ isCorrect, correctAnswer });
    setAnswers((prev) => [
      ...prev,
      { a: currentQuestion.a, b: currentQuestion.b, isCorrect },
    ]);
  };

  const handleFinishEarly = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    onFinishEarly(answers);
  };

  const currentQuestion = questions[currentIndex];
  const correctAnswer = currentQuestion.a * currentQuestion.b;

  useEffect(() => {
    if (feedback.isCorrect === null) return;
    const timer = setTimeout(() => {
      if (currentIndex === questions.length - 1) {
        onFinish(answers);
      } else {
        setTimeLeft(ANSWER_TIME_LIMIT); // reset timer for next question
        setCurrentIndex((prev) => prev + 1);
        setUserAnswer('');
        setFeedback({ isCorrect: null, correctAnswer: null });
      }
    }, feedback.isCorrect ? 1500 : 2500);
    return () => clearTimeout(timer);
  }, [feedback, currentIndex, questions.length, onFinish, answers]);

  const getTimerClass = () => {
    if (timeLeft > 15) return 'timer-normal';
    if (timeLeft > 8) return 'timer-warning';
    return 'timer-danger';
  };

  return (
    <div className="screen quiz-screen">
      <div className="progress">
        {t.question} {currentIndex + 1} / {questions.length}
      </div>
      <div className={`timer ${getTimerClass()}`}>
        ⏱ {timeLeft}s
      </div>
      <div className="question square-question">
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
      <button className="secondary-btn" onClick={handleFinishEarly}>
        {t.finishRound}
      </button>
    </div>
  );
}
