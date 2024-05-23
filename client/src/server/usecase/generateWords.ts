import { GenerativeModel } from "@google/generative-ai";
import { GenerativeAIModel } from "../entities/GenerativeAI";
import { PromptUtils } from "@/utils/prompts";

export class GenerateWords {
  private _model: GenerativeModel | null = null;

  constructor(
    private readonly GenerateWordsPrompt: PromptUtils["GenerateWordsPrompt"]
  ) {
    const { model } = new GenerativeAIModel();
    if (!model) throw new Error("No model found");
    this._model = model;
  }

  async execute({ prompt, words }: { prompt: string; words: number }) {
    if (!this._model) throw new Error("No model found");
    try {
      const command = this.GenerateWordsPrompt({ prompt, words });
      const { response } = await this._model.generateContent(command);

      const text = response.text();
      return text;
    } catch (error: Error | any) {
      console.log(error);
      throw new Error(error?.message || "Failed to generate words");
    }
  }
}
