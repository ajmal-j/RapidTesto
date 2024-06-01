import getSession from "@/lib/getSession";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { GenerateUsecase } from "@/server/usecase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body?.wordsLength) throw new Error("Words length is required.");
    const session = await getSession();
    const userId = session?.user?.id;
    if (!userId) throw new Error("Please sign in to use this feature.");

    const completedList = await prisma.completed.findMany({
      where: {
        userId,
      },
      include: {
        missedLetters: true,
        result: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    if (completedList.length < 5)
      throw new Error(
        "Not enough data to calculate precision. Please complete more chapters."
      );

    const map = new Map();

    for (const completed of completedList) {
      const { missedLetters } = completed;
      missedLetters.forEach(({ letter, count }) => {
        map.set(letter, (map.get(letter) || 0) + count);
      });
    }

    const lettersArray: Record<string, number>[] = [];

    map.forEach((value, key) => {
      lettersArray.push({ [key]: value });
    });

    const response = await GenerateUsecase.generateMissedLetters.execute({
      letters: lettersArray,
      wordsLength: body.wordsLength,
    });

    return Response.json({
      success: true,
      words: response,
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
  }
}
