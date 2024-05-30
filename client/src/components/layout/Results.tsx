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
      className='flex items-start justify-between gap-3 mt-10 flex-wrap max-w-[330px]'
    >
      <motion.span
        {...{ initial, animate, transition: { duration: 0.3 } }}
        className='text-3xl font-semibold'
      >
        Result&apos;s
      </motion.span>

      <div className='ps-3 sm:ps-0'>
        <motion.li
          {...{ initial, animate, transition: { duration: 0.5 } }}
          className='text-xl  text-primary/80'
        >
          <span className='pe-2'>Accuracy :</span>
          {formatPercentage(result.accuracy)}
        </motion.li>

        <motion.li
          {...{ initial, animate, transition: { duration: 0.8 } }}
          className='text-xl  text-primary/80'
        >
          <span className='pe-2'>Speed :</span>
          {result.speed}
        </motion.li>

        <motion.li
          {...{ initial, animate, transition: { duration: 1 } }}
          className='text-xl  text-primary/80'
        >
          <span className='pe-2'>Typed :</span> {result.typed}
        </motion.li>

        <motion.li
          {...{ initial, animate, transition: { duration: 1.2 } }}
          className='text-xl  text-primary/80'
        >
          <span className='pe-2'>Missed : </span> {result.missed}
        </motion.li>
      </div>
    </motion.div>
  );
}
