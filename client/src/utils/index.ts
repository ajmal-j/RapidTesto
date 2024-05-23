export const isKeyboardCodeAllowed = ({ code }: { code: string }) => {
  return (
    code.startsWith("Key") ||
    code.startsWith("Digit") ||
    code === "Backspace" ||
    code === "Space" ||
    code === "Period" ||
    code === "Comma" ||
    code === "Slash" ||
    code === "Backslash" ||
    code === "Quote" ||
    code === "BracketLeft" ||
    code === "BracketRight" ||
    code === "Minus" ||
    code === "Equal" ||
    code === "Semicolon" ||
    code === "Backquote" ||
    code === "IntlBackslash"
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
  totalTyped,
  totalWords,
  errors,
}: {
  totalTyped: number;
  totalWords: number;
  errors: number;
}) => {
  if (totalTyped > 0) {
    const correct = totalTyped - errors;
    const accuracy = (correct / totalWords) * 100;
    if (accuracy > 100) return 100;
    else if (accuracy < 0) return 0;
    else return accuracy;
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

export function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) {
    return `0 : ${
      remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds
    }`;
  } else {
    return `${minutes} : ${
      remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds
    }`;
  }
}
