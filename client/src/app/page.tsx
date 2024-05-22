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

export default function Home() {
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
  } = useTyper();

  const accuracyPercentage = calculateAccuracyPercentage({
    errors,
    totalTyped,
  });

  return (
    <div>
      <Header />
      <Wrapper>
        <CountdownTimer timeLeft={timeLeft} isFinished={isFinished} />
        <WordContainer>
          <GenerateWords words={words} />
          <Typings words={words} typed={typed} />
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
