const MIN = 2;
const MAX = 9;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateDivisionQuestion() {
  const divisor = randomInt(MIN, MAX);
  const quotient = randomInt(MIN, MAX);
  const dividend = divisor * quotient;
  return { dividend, quotient, answer: divisor };
}

export function generateDivisionQuestions(count) {
  return Array.from({ length: count }, generateDivisionQuestion);
}
