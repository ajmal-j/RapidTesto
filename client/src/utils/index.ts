export const isKeyboardCodeAllowed = ({ code }: { code: string }) => {
  return (
    code.startsWith("Key") ||
    code.startsWith("Digit") ||
    code === "Backspace" ||
    code === "Space"
  );
};

export const countErrors = ({
  typed,
  wordsReached,
}: {
  typed: string;
  wordsReached: string;
}) => {
  const expectedCharacters = wordsReached.split("");

  return expectedCharacters.reduce((errors, expectedChar, i) => {
    const actualChar = typed[i];
    if (actualChar !== expectedChar) {
      errors++;
    }
    return errors;
  }, 0);
};

export const calculateAccuracyPercentage = ({
  errors,
  totalTyped,
}: {
  errors: number;
  totalTyped: number;
}) => {
  if (totalTyped > 0) {
    const corrects = totalTyped - errors;
    return (corrects / totalTyped) * 100;
  }

  return 0;
};

export const formatPercentage = (percentage: number) => {
  return percentage.toFixed(0) + "%";
};

export function calculateWPM({
  correctLetters,
  wrongLetters,
  timeTaken,
}: {
  correctLetters: number;
  wrongLetters: number;
  timeTaken: number;
}) {
  const totalLetters = correctLetters + wrongLetters;
  const totalWords = totalLetters / 5;
  const timeInMinutes = timeTaken / 60;
  const wpm = totalWords / timeInMinutes;
  return wpm.toFixed(2);
}
