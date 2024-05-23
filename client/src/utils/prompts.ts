export const GenerateWordsPrompt = ({
  prompt,
  words,
}: {
  prompt: string;
  words: number;
}) => {
  return `Generate a ${words}-word paragraph using the prompt: "${prompt}". The paragraph is for testing typing speed and accuracy, so it must be exactly ${words} words. Ensure it includes the contents of the prompt and is composed of characters that can be typed on a keyboard. You may include spaces.`;
};

export type PromptUtils = {
  GenerateWordsPrompt: typeof GenerateWordsPrompt;
};
