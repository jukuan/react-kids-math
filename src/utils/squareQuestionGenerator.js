const MIN_SQUARE = 11;
const MAX_SQUARE = 20;

export function generateSquareQuestion() {
  const num = Math.floor(Math.random() * (MAX_SQUARE - MIN_SQUARE + 1)) + MIN_SQUARE;
  
  return {
    a: num,
    b: num,
  };
}

export function generateSquareQuestions(count) {
  return Array.from({ length: count }, generateSquareQuestion);
}
