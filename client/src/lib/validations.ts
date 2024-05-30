import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().trim().min(1, "Cannot be empty"),
});

export const updateChapterSchema = z.object({
  missedLetters: z.array(z.string()),
  words: z.string(),
  typedWords: z.string(),
  wordId: z.string(),
  time: z.number(),
  result: z.object({
    accuracy: z.number(),
    speed: z.string(),
    missed: z.number(),
    typed: z.number(),
  }),
});

export type UpdateProfileValues = z.infer<typeof updateProfileSchema>;

export type UpdateChapterValues = z.infer<typeof updateChapterSchema>;
