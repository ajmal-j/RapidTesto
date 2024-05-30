"use client";

import { cn } from "@/lib/utils";
import Caret from "../buttons/Caret";
import { Dispatch, SetStateAction } from "react";

export default function Typings({
  words,
  typed,
  isFinished,
  setIsEnabled,
}: {
  words: string;
  typed: string;
  isFinished: boolean;
  setIsEnabled: Dispatch<SetStateAction<boolean>>;
}) {
  const typedCharacters = typed.split("");

  return (
    <div
      className='absolute inset-0 space-x-2 flex flex-wrap gap-y-3  h-min'
      onClick={() => setIsEnabled(true)}
    >
      {typedCharacters.map((char, i) => (
        <Character key={i} actual={char} expected={words[i]} />
      ))}
      <Caret isFinished={isFinished} />
    </div>
  );
}

const Character = ({
  actual,
  expected,
}: {
  actual: string;
  expected: string;
}) => {
  const isCorrect = actual === expected;
  const isSpace = expected === " ";

  return (
    <span
      className={cn(
        {
          "text-red-500": !isCorrect && !isSpace,
          "text-primary": isCorrect && !isSpace,
          "bg-red-500/50": !isCorrect && isSpace,
        },
        "border h-min rounded-xl border-transparent px-2"
      )}
    >
      {expected === " " ? "\u00A0" : expected}
    </span>
  );
};
