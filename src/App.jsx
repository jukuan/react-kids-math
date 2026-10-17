import { useState, useCallback } from 'react';
import QuizScreen from './components/QuizScreen';
import SquareQuizScreen from './components/SquareQuizScreen';
import DivisionQuizScreen from './components/DivisionQuizScreen';
import AdditionQuizScreen from './components/AdditionQuizScreen';
import SequenceGame from './components/SequenceGame';
import ResultScreen from './components/ResultScreen';
import StarDisplay from './components/StarDisplay';
import LanguageSwitcher from './components/LanguageSwitcher';
import Footer from './components/Footer';
import { useLocalStorage } from './hooks/useLocalStorage';
import { translations } from './utils/translations';
import {
  generateWeightedQuestions,
  getHardTables,
} from './utils/questionGenerator';
import { generateSquareQuestions } from './utils/squareQuestionGenerator';
import { generateDivisionQuestions } from './utils/divisionQuestionGenerator';
import { generateAdditionQuestions } from './utils/additionQuestionGenerator';
import { updateTableStats } from './utils/stats';

const QUESTIONS_PER_ROUND = 10;

export default function App() {
  const [language, setLanguage] = useLocalStorage('language', 'en');
  const [totalStars, setTotalStars] = useLocalStorage('totalStars', 0);
  const [tableStats, setTableStats] = useLocalStorage('tableStats', {});
  const [screen, setScreen] = useState('menu');
  const [questions, setQuestions] = useState([]);
  const [lastScore, setLastScore] = useState(0);
  const [sequenceResult, setSequenceResult] = useState(null);
  const [lastMode, setLastMode] = useState('multiplication');

  const t = translations[language] || translations.en;

  // ---- Start handlers ----

  const handleStartMultiplication = useCallback(() => {
    const newQuestions = generateWeightedQuestions(QUESTIONS_PER_ROUND, tableStats);
    setQuestions(newQuestions);
    setLastMode('multiplication');
    setScreen('quiz');
  }, [tableStats]);

  const handleStartSquare = useCallback(() => {
    const newQuestions = generateSquareQuestions(QUESTIONS_PER_ROUND);
    setQuestions(newQuestions);
    setLastMode('square');
    setScreen('square');
  }, []);

  const handleStartDivision = useCallback(() => {
    const newQuestions = generateDivisionQuestions(QUESTIONS_PER_ROUND);
    setQuestions(newQuestions);
    setLastMode('division');
    setScreen('division');
  }, []);

  const handleStartAddition = useCallback(() => {
    const newQuestions = generateAdditionQuestions(QUESTIONS_PER_ROUND);
    setQuestions(newQuestions);
    setLastMode('addition');
    setScreen('addition');
  }, []);

  const handleStartSequence = useCallback(() => {
    setScreen('sequence');
  }, []);

  // ---- Finish handlers ----

  const handleQuizFinish = useCallback(
    (answers) => {
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

  const handleSquareFinish = useCallback(
    (answers) => {
      const score = answers.filter((a) => a.isCorrect).length;
      setLastScore(score);

      const earnedStars = score + (score === QUESTIONS_PER_ROUND ? 5 : 0);
      setTotalStars((prev) => prev + earnedStars);

      setScreen('result');
    },
    [setTotalStars]
  );

  const handleDivisionFinish = useCallback(
    (answers) => {
      const score = answers.filter((a) => a.isCorrect).length;
      setLastScore(score);

      const earnedStars = score + (score === QUESTIONS_PER_ROUND ? 3 : 0);
      setTotalStars((prev) => prev + earnedStars);

      setScreen('result');
    },
    [setTotalStars]
  );

  const handleAdditionFinish = useCallback(
    (answers) => {
      const score = answers.filter((a) => a.isCorrect).length;
      setLastScore(score);

      const earnedStars = score + (score === QUESTIONS_PER_ROUND ? 3 : 0);
      setTotalStars((prev) => prev + earnedStars);

      setScreen('result');
    },
    [setTotalStars]
  );

  const handleSequenceFinish = useCallback(
    (result) => {
      setSequenceResult(result);
      const earnedStars = result.mistakes === 0 ? 5 : Math.max(0, 3 - result.mistakes);
      setTotalStars((prev) => prev + earnedStars);
      setLastScore(earnedStars);
      setScreen('sequence-result');
    },
    [setTotalStars]
  );

  const handleBackToMenu = () => {
    setScreen('menu');
  };

  // ---- Early finish handlers ----

  const handleQuizFinishEarly = useCallback(
    (answers) => {
      if (answers.length === 0) {
        setScreen('menu');
        return;
      }
      handleQuizFinish(answers);
    },
    [handleQuizFinish]
  );

  const handleSquareFinishEarly = useCallback(
    (answers) => {
      if (answers.length === 0) {
        setScreen('menu');
        return;
      }
      handleSquareFinish(answers);
    },
    [handleSquareFinish]
  );

  const handleDivisionFinishEarly = useCallback(
    (answers) => {
      if (answers.length === 0) {
        setScreen('menu');
        return;
      }
      handleDivisionFinish(answers);
    },
    [handleDivisionFinish]
  );

  const handleAdditionFinishEarly = useCallback(
    (answers) => {
      if (answers.length === 0) {
        setScreen('menu');
        return;
      }
      handleAdditionFinish(answers);
    },
    [handleAdditionFinish]
  );

  return (
    <div className="app">
      {screen === 'menu' && (
        <div className="screen menu-screen">
          <div className="mascot">
            <img src="/mascot-transparent-bg.png" height="80" alt="mascot" />
          </div>
          <h1 className="app-title">{t.appTitle}</h1>
          <StarDisplay totalStars={totalStars} />
          <LanguageSwitcher language={language} onChange={setLanguage} />

          <div className="game-modes">
            <button className="mode-btn" onClick={handleStartAddition}>
              <span className="mode-icon">➕</span>
              {t.addition}
            </button>
            <button className="mode-btn" onClick={handleStartMultiplication}>
              <span className="mode-icon">✖️</span>
              {t.multiplication}
            </button>
            <button className="mode-btn" onClick={handleStartSquare}>
              <span className="mode-icon">🔢</span>
              {t.squareNumbers}
            </button>
            <button className="mode-btn" onClick={handleStartDivision}>
              <span className="mode-icon">➗</span>
              {t.division}
            </button>
            <button className="mode-btn" onClick={handleStartSequence}>
              <span className="mode-icon">🔍</span>
              {t.sequenceGame}
            </button>
          </div>
        </div>
      )}

      {screen === 'quiz' && (
        <QuizScreen
          questions={questions}
          t={t}
          onFinish={handleQuizFinish}
          onFinishEarly={handleQuizFinishEarly}
        />
      )}

      {screen === 'square' && (
        <SquareQuizScreen
          questions={questions}
          t={t}
          onFinish={handleSquareFinish}
          onFinishEarly={handleSquareFinishEarly}
        />
      )}

      {screen === 'division' && (
        <DivisionQuizScreen
          questions={questions}
          t={t}
          onFinish={handleDivisionFinish}
          onFinishEarly={handleDivisionFinishEarly}
        />
      )}

      {screen === 'addition' && (
        <AdditionQuizScreen
          questions={questions}
          t={t}
          onFinish={handleAdditionFinish}
          onFinishEarly={handleAdditionFinishEarly}
        />
      )}

      {screen === 'sequence' && (
        <SequenceGame t={t} onFinish={handleSequenceFinish} />
      )}

      {screen === 'result' && (
        <ResultScreen
          score={lastScore}
          totalQuestions={QUESTIONS_PER_ROUND}
          t={t}
          hardTables={getHardTables(tableStats)}
          earnedStars={lastScore + (lastScore === QUESTIONS_PER_ROUND ? 3 : 0)}
          onPlayAgain={handleBackToMenu}
          hideHardTables={lastMode !== 'multiplication'}
        />
      )}

      {screen === 'sequence-result' && sequenceResult && (
        <div className="screen result-screen">
          <h2>🎉 {t.score}: {lastScore} ⭐</h2>
          <p>{t.time}: {sequenceResult.time}s</p>
          <p>{t.mistakes}: {sequenceResult.mistakes}</p>
          <button className="primary-btn" onClick={handleBackToMenu}>
            {t.backToMenu}
          </button>
        </div>
      )}

      {screen === 'menu' && <Footer t={t} />}
    </div>
  );
}
