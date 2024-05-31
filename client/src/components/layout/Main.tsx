"use client";

import GeneratePrompt from "@/components/layout/GeneratePrompt";
import KeyboardToggle from "@/components/buttons/Keyboard-toggle";
import RestartButton from "@/components/buttons/Restart";
import SettingsDropdown from "@/components/buttons/Settings";
import StartButton from "@/components/buttons/Start";
import CountdownTimer from "@/components/layout/CountdownTimer";
import GenerateWords from "@/components/layout/GenerateWords";
import Results from "@/components/layout/Results";
import Typings from "@/components/layout/Typings";
import WordContainer from "@/components/layout/WordContainer";
import Wrapper from "@/components/layout/Wrapper";
import useSettings from "@/hooks/useSettings";
import { useTyper } from "@/hooks/useTyper";

export default function Main() {
  const { count, seconds, setCount, setSeconds, backspace, setBackspace } =
    useSettings();
  const {
    timeLeft,
    typeState,
    result,
    restartTyping,
    typed,
    words,
    isFinished,
    isEnabled,
    setIsEnabled,
    handleKeydown,
    setCustomWords,
    cursorPosition,
  } = useTyper({
    count,
    seconds,
    backspace,
  });

  return (
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
      <WordContainer typeState={typeState}>
        <GenerateWords setIsEnabled={setIsEnabled} words={words} />
        <Typings
          words={words}
          typed={typed}
          cursorPosition={cursorPosition}
          setIsEnabled={setIsEnabled}
          isFinished={isFinished || !isEnabled}
        />
      </WordContainer>
      <RestartButton restartTyping={restartTyping} />
      <Results
        {...{
          result,
          typeState,
        }}
      />
    </Wrapper>
  );
}
