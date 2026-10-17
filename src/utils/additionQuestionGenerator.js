const MIN = 1;
const MAX = 10;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateAdditionQuestion() {
  const a = randomInt(MIN, MAX);
  const b = randomInt(MIN, MAX);
  return { a, b, answer: a + b };
}

export function generateAdditionQuestions(count) {
  return Array.from({ length: count }, generateAdditionQuestion);
}
