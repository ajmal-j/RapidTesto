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
import { useCallback, useEffect, useState, useTransition } from "react";
import { GetCompleted } from "@/actions/completed";
import BoostAccuracy from "../buttons/BoostAccuracy";
import { Loader } from "lucide-react";

export default function Main({ completed }: { completed?: string }) {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
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

  const fetchCompleted = useCallback(async () => {
    if (!completed) return;
    try {
      setIsLoading(true);
      const data = await GetCompleted({
        id: completed,
      });
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [completed]);

  useEffect(() => {
    fetchCompleted().then((data) => {
      if (!data) return;
      setCustomWords({ words: data?.words });
      startTransition(() => {
        setSeconds(data?.time || seconds);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCompleted]);

  return (
    <Wrapper>
      <div className='flex gap-3 justify-between items-center sm:flex-row flex-col'>
        <CountdownTimer timeLeft={timeLeft} isFinished={isFinished} />
        <div className='flex gap-2 items-center'>
          {isLoading && (
            <Loader size={20} className='animate-spin text-foreground mx-2' />
          )}
          <KeyboardToggle {...{ handleKeydown }} />
          <BoostAccuracy {...{ setCustomWords, count }} />
          {/* <StartButton {...{ isEnabled, setIsEnabled }} /> */}
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
        className='my-10'
        {...{
          result,
          typeState,
        }}
      />
    </Wrapper>
  );
}
