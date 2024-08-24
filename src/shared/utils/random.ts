export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getUniqueRandomNumbers = (
  min: number,
  max: number,
  count: number,
): number[] => {
  const numbers: number[] = [];
  const range: number[] = Array.from(
    { length: max - min + 1 },
    (_, i) => i + min,
  );

  while (numbers.length < count && range.length > 0) {
    const randomIndex = Math.floor(Math.random() * range.length);
    const randomNumber = range.splice(randomIndex, 1)[0];
    numbers.push(randomNumber);
  }

  return numbers;
};

export const generateRound = () => {
  const roundList = {
    first: getUniqueRandomNumbers(0, 7, 8),
    second: getUniqueRandomNumbers(0, 3, 4),
    third: getUniqueRandomNumbers(0, 1, 2),
  };

  return roundList;
};
