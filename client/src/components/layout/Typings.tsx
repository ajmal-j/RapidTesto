import { cn } from "@/lib/utils";
import Caret from "./Caret";

export default function Typings({
  words,
  typed,
}: {
  words: string;
  typed: string;
}) {
  const typedCharacters = typed.split("");

  return (
    <div className='absolute inset-0'>
      {typedCharacters.map((char, i) => (
        <Character key={i} actual={char} expected={words[i]} />
      ))}
      <Caret />
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
      className={cn({
        "text-red-500": !isCorrect && !isSpace,
        "text-primary": isCorrect && !isSpace,
        "bg-red-500/50": !isCorrect && isSpace,
      })}
    >
      {expected}
    </span>
  );
};
