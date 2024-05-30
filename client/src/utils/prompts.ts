export const GenerateWordsPrompt = ({
  prompt,
  words,
}: {
  prompt: string;
  words: number;
}) => {
  return `Generate paragraph with minimum ${words}-words using the following prompt: "${prompt}.". The paragraph you generate is for testing the typing speed and accuracy. It can be random and it must include contents mentioned above and the paragraph contains only number, english letters or special characters that is the keyboard. Also you can add spaces if needed.`;
};

export const ExtractMostMissedLettersPrompt = ({
  letters,
  currentLetters,
}: {
  letters: string[];
  currentLetters: string[];
}) => {
  return `I will give you a list of missed letters from a typing test and the letters that i missed earlier, you have to extract the most missed letters from the list and give me the result in the following format : 'a,b,c,d etc...'. letters: ${letters.join(
    ", "
  )} , earlier missed letters: ${currentLetters.join(", ")}`;
};

export type PromptUtils = {
  GenerateWordsPrompt: typeof GenerateWordsPrompt;
  ExtractMostMissedLettersPrompt: typeof ExtractMostMissedLettersPrompt;
};
