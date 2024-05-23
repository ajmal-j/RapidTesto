"use client";

import GeneratePrompt from "@/components/buttons/GeneratePrompt";
import KeyboardToggle from "@/components/buttons/Keyboard-toggle";
import RestartButton from "@/components/buttons/Restart";
import SettingsDropdown from "@/components/buttons/Settings";
import StartButton from "@/components/buttons/Start";
import CountdownTimer from "@/components/layout/CountdownTimer";
import Footer from "@/components/layout/Footer";
import GenerateWords from "@/components/layout/GenerateWords";
import Header from "@/components/layout/Header";
import Results from "@/components/layout/Results";
import Typings from "@/components/layout/Typings";
import WordContainer from "@/components/layout/WordContainer";
import Wrapper from "@/components/layout/Wrapper";
import useSettings from "@/hooks/useSettings";
import { useTyper } from "@/hooks/useTyper";
import { calculateAccuracyPercentage } from "@/utils";

export default function Home() {
  const { count, seconds, setCount, setSeconds, backspace, setBackspace } =
    useSettings();
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
    isEnabled,
    setIsEnabled,
    handleKeydown,
    setCustomWords,
  } = useTyper({
    count,
    seconds,
    backspace,
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
        <div className='flex gap-2 justify-between items-center'>
          <CountdownTimer timeLeft={timeLeft} isFinished={isFinished} />
          <div className='flex gap-2 items-center'>
            <KeyboardToggle {...{ handleKeydown }} />
            <StartButton {...{ isEnabled, setIsEnabled }} />
            <GeneratePrompt {...{ setIsEnabled, count, setCustomWords }} />
            <SettingsDropdown
              {...{
                count,
                seconds,
                setCount,
                setSeconds,
                isEnabled,
                setIsEnabled,
                setBackspace,
                backspace,
              }}
            />
          </div>
        </div>
        <WordContainer>
          <GenerateWords words={words} />
          <Typings
            words={words}
            typed={typed}
            setIsEnabled={setIsEnabled}
            isFinished={isFinished || !isEnabled}
          />
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
      <Footer />
    </div>
  );
}
