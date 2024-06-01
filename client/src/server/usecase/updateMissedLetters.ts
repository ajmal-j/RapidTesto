import { GenerativeModel } from "@google/generative-ai";
import { GenerativeAIModel } from "../entities/GenerativeAI";
import { PromptUtils } from "@/utils/prompts";

export class GenerateMissedLetters {
  private _model: GenerativeModel | null = null;

  constructor(
    private readonly GeneratePrecessionPracticePrompt: PromptUtils["GeneratePrecessionPracticePrompt"]
  ) {
    const { model } = new GenerativeAIModel();
    if (!model) throw new Error("No model found");
    this._model = model;
  }

  async execute({
    letters,
    wordsLength,
  }: {
    letters: Record<string, number>[];
    wordsLength: number;
  }) {
    if (!this._model) throw new Error("No model found");
    try {
      const command = this.GeneratePrecessionPracticePrompt({
        letters,
        wordsLength,
      });
      const { response } = await this._model.generateContent(command);

      console.log(response);

      const text = response.text();
      return text;
    } catch (error: Error | any) {
      console.log(error);
      throw new Error(error?.message || "Failed to generate.");
    }
  }
}
