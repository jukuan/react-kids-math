// Tables range (2-9)
const MIN_TABLE = 2;
const MAX_TABLE = 9;

// Generate a random integer between min and max (inclusive)
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a single multiplication question { a, b }
export function generateQuestion() {
  return {
    a: randomInt(MIN_TABLE, MAX_TABLE),
    b: randomInt(MIN_TABLE, MAX_TABLE),
  };
}

// Generate a weighted list of questions based on stats
export function generateWeightedQuestions(count, tableStats) {
  const hardTables = getHardTables(tableStats);
  const allTables = Array.from(
    { length: MAX_TABLE - MIN_TABLE + 1 },
    (_, i) => i + MIN_TABLE
  );

  // Weight: normal = 1, hard = 3 (more likely)
  const weightedTables = [];
  allTables.forEach((table) => {
    const weight = hardTables.includes(table) ? 3 : 1;
    for (let i = 0; i < weight; i++) {
      weightedTables.push(table);
    }
  });

  const questions = [];
  for (let i = 0; i < count; i++) {
    const table = weightedTables[randomInt(0, weightedTables.length - 1)];
    const other = randomInt(MIN_TABLE, MAX_TABLE);
    questions.push({ a: table, b: other });
  }
  return questions;
}

// Utility to identify hard tables based on stats
export function getHardTables(tableStats, threshold = 0.3, minAttempts = 3) {
  return Object.entries(tableStats)
    .filter(([_, stats]) => stats.total >= minAttempts)
    .filter(([_, stats]) => stats.wrong / stats.total > threshold)
    .map(([table]) => Number(table));
}
