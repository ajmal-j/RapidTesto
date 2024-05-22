"use client";

import RestartButton from "@/components/buttons/Restart";
import CountdownTimer from "@/components/layout/CountdownTimer";
import GenerateWords from "@/components/layout/GenerateWords";
import Header from "@/components/layout/Header";
import Typings from "@/components/layout/Typings";
import WordContainer from "@/components/layout/WordContainer";
import Wrapper from "@/components/layout/Wrapper";
import { useTyper } from "@/hooks/useTyper";

export default function Home() {
  const {
    timeLeft,
    typeState,
    errors,
    restartTyping,
    totalTyped,
    typed,
    words,
  } = useTyper();

  return (
    <div>
      <Header />
      <Wrapper>
        <CountdownTimer timeLeft={timeLeft} />
        <WordContainer>
          <GenerateWords words={words} />
          <Typings words={words} typed={typed} />
        </WordContainer>
        <RestartButton restartTyping={restartTyping} />
      </Wrapper>
    </div>
  );
}
