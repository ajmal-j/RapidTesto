import Wrapper from "@/components/layout/Wrapper";
import getSession from "@/lib/getSession";
import React from "react";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import GenerateWords from "@/components/layout/GenerateWords";
import { TypingsDemo } from "@/components/layout/Typings";
import WordContainer from "@/components/layout/WordContainer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Results from "@/components/layout/Results";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import Link from "next/link";

type Props = {
  searchParams: {
    p: string;
  };
};

const page = async ({ searchParams: { p = "1" } }: Props) => {
  const session = await getSession();
  const userId = session?.user?.id;
  if (!userId)
    return (
      <div className='text-red-500 font-thin flex items-center justify-center'>
        Unauthorized
      </div>
    );

  let completed: Prisma.CompletedGetPayload<{
    include: { missedLetters: true; result: true };
  }>[] = [];

  let totalDocuments = 0;
  const doc = 5;

  try {
    const [count, data] = await prisma.$transaction([
      prisma.completed.count({
        where: {
          userId,
        },
      }),
      prisma.completed.findMany({
        skip: doc * Number(p) - doc,
        take: doc,
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
      }),
    ]);
    completed = data;
    totalDocuments = count;
  } catch (error) {
    console.log(error);
  }

  const hasNext =
    Number(p) >= 1 && totalDocuments - (doc * (Number(p) + 1) - doc) >= 0;

  const hasPrev = Number(p) > 1;

  return (
    <Wrapper>
      <div className='flex flex-col gap-2 mb-10'>
        <h1 className='sm:text-4xl text-3xl mb-5'>Completed</h1>
        <h5 className='text-muted-foreground'>Total : {totalDocuments}</h5>
        <div className='flex flex-col gap-3'>
          {completed.map((c, i) => (
            <div key={i} className='flex flex-col gap-1 border px-3 rounded-xl bg-foreground/5'>
              <Accordion type='single' collapsible>
                <AccordionItem value='item-1'>
                  <div className='flex gap-2 items-center'>
                    <div className='w-full flex-1'>
                      <AccordionTrigger>
                        <span>
                          {c.createdAt.toDateString()}
                          <span className='text-muted-foreground px-2'>at</span>
                          {c.createdAt.toLocaleTimeString("en-IN", {
                            hour: "numeric",
                            minute: "numeric",
                          })}
                        </span>
                      </AccordionTrigger>
                    </div>
                    <Link href={`/?completed=${c.id}`}>
                      <Button variant='outline' size='icon'>
                        <RotateCcw size={16} />
                      </Button>
                    </Link>
                  </div>
                  <AccordionContent>
                    <WordContainer className='text-base xl:text-base'>
                      <GenerateWords words={c.words} />
                      <TypingsDemo words={c.words} typed={c.typedWords} />
                    </WordContainer>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Results
                className='bg-transparent'
                result={{
                  accuracy: c.result[0].accuracy,
                  missed: c.result[0].missed,
                  speed: c.result[0].speed,
                  typed: c.result[0].typed,
                  missedLetters: c.missedLetters,
                }}
                typeState='finished'
              />
            </div>
          ))}
          <div className='flex justify-end gap-2'>
            <Link href={hasPrev ? `/completed/?p=${Number(p) - 1}` : "#"}>
              <Button
                variant={"outline"}
                className='rounded-full'
                size={"sm"}
                disabled={!(Number(p) > 1)}
              >
                <ChevronLeft size={16} />
              </Button>
            </Link>
            <Link href={hasNext ? `/completed/?p=${Number(p) + 1}` : "#"}>
              <Button
                variant={"outline"}
                className='rounded-full'
                size={"sm"}
                disabled={!hasNext}
              >
                <ChevronRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default page;
