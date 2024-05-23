export const GenerateWordsPrompt = ({
  prompt,
  words,
}: {
  prompt: string;
  words: number;
}) => {
  return `Generate ${words} words with the following prompt: "${prompt}", its for testing the typing speed and accuracy. It must be in ${words} words. It can be random and it must include ${prompt} contents and it the characters must can be type with keyboard. Also you can add spaces.`;
};

export type PromptUtils = {
  GenerateWordsPrompt: typeof GenerateWordsPrompt;
};
