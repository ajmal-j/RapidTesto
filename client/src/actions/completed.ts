"use server";

import getSession from "@/lib/getSession";
import { prisma } from "@/lib/prisma";

export const GetCompleted = async ({ id }: { id: string }) => {
  try {
    const session = await getSession();
    const userId = session?.user?.id;

    const response = await prisma.completed.findFirst({
      where: {
        userId,
        id,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
