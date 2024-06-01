"use server";

import getSession from "@/lib/getSession";
import { updateChapterSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";

interface IUpdateChapter {
  missedLetters: Map<string, number>;
  words: string;
  typedWords: string;
  time: number;
  wordId: string;
  result: {
    accuracy: number;
    speed: string;
    missed: number;
    typed: number;
  };
}

const updateChapter = async (values: IUpdateChapter) => {
  try {
    const session = await getSession();
    const userId = session?.user?.id;

    if (!userId) return;

    const isExist = await prisma?.completed.findFirst({
      where: {
        userId,
        wordId: values?.wordId,
      },
    });

    if (isExist) return;

    const {
      typedWords,
      result: { accuracy, speed, missed, typed },
      words,
      time,
      wordId,
      missedLetters,
    } = updateChapterSchema.parse(values);

    const missedLettersArray = [];

    for (const [k, v] of missedLetters.entries()) {
      missedLettersArray.push({ letter: k, count: v });
    }

    await prisma?.completed.create({
      data: {
        userId,
        typedWords,
        missedLetters: {
          create: missedLettersArray,
        },
        words,
        wordId,
        time,
        result: {
          create: {
            missed,
            speed,
            accuracy,
            typed,
          },
        },
      },
    });

    return;
  } catch (error) {
    console.log(error);
  }
};
export { updateChapter };
