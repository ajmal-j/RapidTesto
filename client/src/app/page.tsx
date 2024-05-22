"use client";

import RestartButton from "@/components/buttons/Restart";
import CountdownTimer from "@/components/layout/CountdownTimer";
import GenerateWords from "@/components/layout/GenerateWords";
import Header from "@/components/layout/Header";
import Results from "@/components/layout/Results";
import Typings from "@/components/layout/Typings";
import WordContainer from "@/components/layout/WordContainer";
import Wrapper from "@/components/layout/Wrapper";
import { useTyper } from "@/hooks/useTyper";
import { calculateAccuracyPercentage } from "@/utils";
import { useState } from "react";

export default function Home() {
  const [seconds, setSeconds] = useState(6);
  const [count, setCount] = useState(20);

  const {
    timeLeft,
    typeState,
    errors,
    restartTyping,
    totalTyped,
    typed,
    words,
    totalTime,
    isFinished,
  } = useTyper({
    count,
    seconds,
  });

  const accuracyPercentage = calculateAccuracyPercentage({
    totalTyped,
    totalWords: words.length,
    errors,
  });

  return (
    <div>
      <Header />
      <Wrapper>
        <CountdownTimer timeLeft={timeLeft} isFinished={isFinished} />
        <WordContainer>
          <GenerateWords words={words} />
          <Typings words={words} typed={typed} isFinished={isFinished} />
        </WordContainer>
        <RestartButton restartTyping={restartTyping} />
        <Results
          {...{
            accuracyPercentage,
            errors,
            totalTyped,
            typeState,
            totalTime,
            words,
            timeLeft,
          }}
        />
      </Wrapper>
    </div>
  );
}
