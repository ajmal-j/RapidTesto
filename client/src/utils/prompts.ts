export const GenerateWordsPrompt = ({
  prompt,
  words,
}: {
  prompt: string;
  words: number;
}) => {
  return `Generate paragraph with minimum ${words}-words using the following prompt: "${prompt}.". The paragraph you generate is for testing the typing speed and accuracy. It can be random and it must include contents mentioned above and the paragraph contains only number, english letters or special characters that is the keyboard. Also you can add spaces if needed.`;
};

export type PromptUtils = {
  GenerateWordsPrompt: typeof GenerateWordsPrompt;
};
