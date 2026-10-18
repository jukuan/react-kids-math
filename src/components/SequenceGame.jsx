import { useState, useEffect, useRef } from 'react';

const GRID_SIZE = 25;

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function SequenceGame({ t, onFinish }) {
  const [numbers] = useState(() =>
    shuffleArray(Array.from({ length: GRID_SIZE }, (_, i) => i + 1))
  );
  const [nextNumber, setNextNumber] = useState(1);
  const [mistakes, setMistakes] = useState(0);
  const [foundNumbers, setFoundNumbers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const elapsedTimeRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!gameStarted) return;

    timerRef.current = setInterval(() => {
      elapsedTimeRef.current += 1;
      setElapsedTime(elapsedTimeRef.current);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [gameStarted]);

  const finish = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    onFinish({ time: elapsedTimeRef.current, mistakes });
  };

  const handleNumberClick = (number) => {
    if (!gameStarted) {
      setGameStarted(true);
    }

    if (number === nextNumber) {
      setFoundNumbers([...foundNumbers, number]);
      if (nextNumber === GRID_SIZE) {
        finish();
      } else {
        setNextNumber(nextNumber + 1);
      }
    } else {
      setMistakes(mistakes + 1);
    }
  };

  return (
    <div className="screen sequence-screen">
      <div className="sequence-header">
        <div className="sequence-target">
          {t.findNumber}: <strong>{nextNumber}</strong>
        </div>
        <div className="sequence-timer">⏱ {elapsedTime}s</div>
        {mistakes > 0 && (
          <div className="sequence-mistakes">❌ {mistakes}</div>
        )}
      </div>

      <div className="sequence-grid">
        {numbers.map((number, index) => (
          <button
            key={index}
            className={`sequence-cell ${
              foundNumbers.includes(number) ? 'found' : ''
            } ${number === nextNumber ? 'highlight' : ''}`}
            onClick={() => handleNumberClick(number)}
            disabled={foundNumbers.includes(number)}
          >
            {number}
          </button>
        ))}
      </div>

      <button className="secondary-btn" onClick={finish}>
        {t.finishRound}
      </button>
    </div>
  );
}
