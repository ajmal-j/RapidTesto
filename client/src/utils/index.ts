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
