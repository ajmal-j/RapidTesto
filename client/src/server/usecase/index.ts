import { GenerateWordsPrompt } from "@/utils/prompts";
import { GenerateWords } from "./generateWords";

const generateWords = new GenerateWords(GenerateWordsPrompt);

export const GenerateUsecase = {
  generateWords,
} as const;
