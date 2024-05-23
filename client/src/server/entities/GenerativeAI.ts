import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

export class GenerativeAIModel {
  private readonly API_KEY = process.env.GOOGLE_AI_API_KEY;
  public readonly model: GenerativeModel;

  constructor() {
    if (!this.API_KEY) {
      throw new Error("GOOGLE_AI_API_KEY is not defined");
    }
    const genAI = new GoogleGenerativeAI(this.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    this.model = model;
  }
}