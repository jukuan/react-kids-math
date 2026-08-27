// Update stats for a specific table after an answer
export function updateTableStats(prevStats, table, isCorrect) {
  const newStats = { ...prevStats };
  if (!newStats[table]) {
    newStats[table] = { correct: 0, wrong: 0, total: 0 };
  }
  newStats[table].total += 1;
  if (isCorrect) {
    newStats[table].correct += 1;
  } else {
    newStats[table].wrong += 1;
  }
  return newStats;
}

// Compute hard tables (re-exported from questionGenerator for convenience)
export { getHardTables } from './questionGenerator';
