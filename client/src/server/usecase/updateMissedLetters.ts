import { GenerativeModel } from "@google/generative-ai";
import { GenerativeAIModel } from "../entities/GenerativeAI";
import { PromptUtils } from "@/utils/prompts";

export class GenerateMissedLetters {
  private _model: GenerativeModel | null = null;

  constructor(
    private readonly ExtractMostMissedLettersPrompt: PromptUtils["ExtractMostMissedLettersPrompt"]
  ) {
    const { model } = new GenerativeAIModel();
    if (!model) throw new Error("No model found");
    this._model = model;
  }

  async execute({
    letters,
    currentLetters,
  }: {
    letters: string[];
    currentLetters: string[];
  }) {
    if (!this._model) throw new Error("No model found");
    try {
      const command = this.ExtractMostMissedLettersPrompt({
        letters,
        currentLetters,
      });
      const { response } = await this._model.generateContent(command);

      const text = response.text();
      return text;
    } catch (error: Error | any) {
      console.log(error);
      throw new Error(error?.message || "Failed to generate.");
    }
  }
}
