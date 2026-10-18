const MIN = 1;
const MAX = 10;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateSubtractionQuestion() {
  let a = randomInt(MIN, MAX);
  let b = randomInt(MIN, MAX);
  // Keep the result non-negative so it's kid-friendly
  if (a < b) {
    [a, b] = [b, a];
  }
  return { a, b, answer: a - b };
}

export function generateSubtractionQuestions(count) {
  return Array.from({ length: count }, generateSubtractionQuestion);
}
