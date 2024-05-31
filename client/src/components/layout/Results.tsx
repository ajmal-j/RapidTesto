"use client";

import { TypeState } from "@/hooks/useTyper";
import { formatPercentage } from "@/utils";
import { motion } from "framer-motion";
import { Asterisk } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Results({
  typeState,
  result,
}: {
  typeState: TypeState;
  result: {
    accuracy: number;
    speed: string;
    missed: number;
    typed: number;
    missedLetters: Map<string, number>;
  };
}) {
  if (typeState !== "finished") return null;

  const initial = { opacity: 0, y: 30 };
  const animate = { opacity: 1, y: 0 };

  return (
    <motion.div
      {...{ initial, animate }}
      className='flex items-start justify-between gap-5 my-10 flex-col bg-foreground/5 p-3 rounded-xl'
    >
      <motion.span
        {...{ initial, animate, transition: { duration: 0.3 } }}
        className='text-3xl font-thin tracking-wide'
      >
        Result
      </motion.span>

      <div className='flex flex-wrap flex-1 w-full gap-3 items-start justify-stretch'>
        <motion.div
          {...{ initial, animate, transition: { duration: 0.5 } }}
          className='text-xl  text-primary/80 px-6 py-4 border rounded-xl text-nowrap flex items-center gap-2 flex-1'
        >
          <span>Accuracy :</span>
          {formatPercentage(result.accuracy)}
        </motion.div>

        <motion.div
          {...{ initial, animate, transition: { duration: 0.8 } }}
          className='text-xl  text-primary/80 px-6 py-4 border rounded-xl text-nowrap flex items-center gap-2 flex-1'
        >
          <span>Speed :</span>
          {result.speed}
        </motion.div>

        <motion.div
          {...{ initial, animate, transition: { duration: 1 } }}
          className='text-xl  text-primary/80 px-6 py-4 border rounded-xl text-nowrap flex items-center gap-2 flex-1'
        >
          <span>Typed :</span> {result.typed}
        </motion.div>

        <motion.div
          {...{ initial, animate, transition: { duration: 1.2 } }}
          className='text-xl  text-primary/80 px-6 py-4 border rounded-xl text-nowrap flex items-center gap-2 flex-1'
        >
          <span>Missed : </span> {result.missed}
        </motion.div>
      </div>

      <Accordion type='single' collapsible className='flex-1 w-full  mt-5'>
        <AccordionItem value='item-1'>
          <AccordionTrigger>
            <motion.span
              {...{ initial, animate, transition: { duration: 0.3 } }}
              className='text-foreground/80'
            >
              Missed Letter&apos;s
            </motion.span>
          </AccordionTrigger>
          <AccordionContent>
            <div className='flex flex-wrap flex-1 w-full gap-3 items-start justify-stretch'>
              {result.missedLetters.size > 0
                ? [...result.missedLetters.entries()].map(
                    ([missedLetter, missedCount]) => (
                      <motion.div
                        key={missedLetter}
                        {...{ initial, animate, transition: { duration: 0.5 } }}
                        className='text-xl px-6 py-4 border rounded-xl text-nowrap flex items-center gap-2 flex-1 justify-between min-w-[150px]'
                      >
                        <span className='font-semibold'>{missedLetter}</span>
                        <span className='flex gap-1 text-foreground/70'>
                          <Asterisk size={17} className='pt-1' />
                          {missedCount}
                        </span>
                      </motion.div>
                    )
                  )
                : null}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
}
