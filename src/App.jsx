import { useState, useCallback } from 'react';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import { useLocalStorage } from './hooks/useLocalStorage';
import { translations } from './utils/translations';
import {
  generateWeightedQuestions,
  getHardTables,
} from './utils/questionGenerator';
import { updateTableStats } from './utils/stats';

const QUESTIONS_PER_ROUND = 10;

export default function App() {
  const [language, setLanguage] = useLocalStorage('language', 'en');
  const [totalStars, setTotalStars] = useLocalStorage('totalStars', 0);
  const [tableStats, setTableStats] = useLocalStorage('tableStats', {});
  const [screen, setScreen] = useState('start');
  const [questions, setQuestions] = useState([]);
  const [lastScore, setLastScore] = useState(0);

  const t = translations[language] || translations.en;

  const handleStart = useCallback(() => {
    const newQuestions = generateWeightedQuestions(QUESTIONS_PER_ROUND, tableStats);
    setQuestions(newQuestions);
    setScreen('quiz');
  }, [tableStats]);

  const handleQuizFinish = useCallback(
    (answers) => {
      // Update stats for each answer
      let newStats = { ...tableStats };
      answers.forEach(({ a, isCorrect }) => {
        newStats = updateTableStats(newStats, a, isCorrect);
      });
      setTableStats(newStats);

      const score = answers.filter((a) => a.isCorrect).length;
      setLastScore(score);

      const earnedStars = score + (score === QUESTIONS_PER_ROUND ? 3 : 0);
      setTotalStars((prev) => prev + earnedStars);

      setScreen('result');
    },
    [tableStats, setTableStats, setTotalStars]
  );

  const handlePlayAgain = () => {
    handleStart();
  };

  return (
    <div className="app">
      {screen === 'start' && (
        <StartScreen
          t={t}
          language={language}
          onLanguageChange={setLanguage}
          totalStars={totalStars}
          onStart={handleStart}
        />
      )}
      {screen === 'quiz' && (
        <QuizScreen
          questions={questions}
          t={t}
          onFinish={handleQuizFinish}
        />
      )}
      {screen === 'result' && (
        <ResultScreen
          score={lastScore}
          totalQuestions={QUESTIONS_PER_ROUND}
          t={t}
          hardTables={getHardTables(tableStats)}
          earnedStars={lastScore + (lastScore === QUESTIONS_PER_ROUND ? 3 : 0)}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
}
