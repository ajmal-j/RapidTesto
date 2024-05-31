"use client";

import { TypeState } from "@/hooks/useTyper";
import { formatPercentage } from "@/utils";
import { motion } from "framer-motion";

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
  };
}) {
  if (typeState !== "finished") return null;

  const initial = { opacity: 0, y: 30 };
  const animate = { opacity: 1, y: 0 };

  return (
    <motion.div
      {...{ initial, animate }}
      className='flex items-start justify-between gap-5 mt-10 flex-col'
    >
      <motion.span
        {...{ initial, animate, transition: { duration: 0.3 } }}
        className='text-3xl font-semibold'
      >
        Result.
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
    </motion.div>
  );
}
