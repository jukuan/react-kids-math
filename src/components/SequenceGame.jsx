import { useState, useEffect, useRef } from 'react';

const GRID_SIZE = 25;
const NUM_COLS = 5;

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function SequenceGame({ t, onFinish }) {
  const [numbers, setNumbers] = useState(() => 
    shuffleArray(Array.from({ length: GRID_SIZE }, (_, i) => i + 1))
  );
  const [nextNumber, setNextNumber] = useState(1);
  const [mistakes, setMistakes] = useState(0);
  const [foundNumbers, setFoundNumbers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (gameStarted && nextNumber <= GRID_SIZE) {
      timerRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 100);
    }
    return () => clearInterval(timerRef.current);
  }, [gameStarted, nextNumber, startTime]);

  const handleNumberClick = (number) => {
    if (!gameStarted) {
      setGameStarted(true);
      setStartTime(Date.now());
    }

    if (number === nextNumber) {
      setFoundNumbers([...foundNumbers, number]);
      if (nextNumber === GRID_SIZE) {
        // Game complete
        clearInterval(timerRef.current);
        const finalTime = Math.floor((Date.now() - startTime) / 1000);
        onFinish({ time: finalTime, mistakes });
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
        <div className="sequence-timer">
          ⏱ {elapsedTime}s
        </div>
        {mistakes > 0 && (
          <div className="sequence-mistakes">
            ❌ {mistakes}
          </div>
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
    </div>
  );
}
