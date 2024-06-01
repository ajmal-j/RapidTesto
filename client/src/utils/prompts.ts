export const GenerateWordsPrompt = ({
  prompt,
  words,
}: {
  prompt: string;
  words: number;
}) => {
  return `Generate paragraph with minimum ${words}-words using the following prompt: "${prompt}.". The paragraph you generate is for testing the typing speed and accuracy. It can be random and it must include contents mentioned above and the paragraph contains only number, english letters or special characters that is the keyboard. Also you can add spaces if needed.`;
};

export const GeneratePrecessionPracticePrompt = ({
  letters,
  wordsLength,
}: {
  letters: Record<string, number>[];
  wordsLength: number;
}) => {
  return `I will provide you with a list of missed letters and their frequencies from a typing test. Your task is to use these letters and make a paragraph by shuffling the letters in the list based on their frequency. The result text must have a total word length of ${wordsLength}. It could look something like 'akb dd adfdh dkasdfdshfs dfsd' and add some spaces between words if needed. Missed letters: ${JSON.stringify(
    letters
  )}'.}`;
};

export type PromptUtils = {
  GenerateWordsPrompt: typeof GenerateWordsPrompt;
  GeneratePrecessionPracticePrompt: typeof GeneratePrecessionPracticePrompt;
};
