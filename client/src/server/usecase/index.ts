import {
  ExtractMostMissedLettersPrompt,
  GenerateWordsPrompt,
} from "@/utils/prompts";
import { GenerateWords } from "./generateWords";
import { GenerateMissedLetters } from "./updateMissedLetters";

const generateWords = new GenerateWords(GenerateWordsPrompt);
const generateMissedLetters = new GenerateMissedLetters(
  ExtractMostMissedLettersPrompt
);

export const GenerateUsecase = {
  generateWords,
  generateMissedLetters,
} as const;
