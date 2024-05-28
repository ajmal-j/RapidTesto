"use client";

import { useCallback, useEffect, useState } from "react";
import { useCountdown } from "./useCountdown";
import { useWords } from "./useWords";
import { useTyping } from "./useTyping";
import { countErrors } from "@/utils";

export type TypeState = "start" | "run" | "finished";

export const useTyper = ({
  count,
  seconds,
  backspace,
}: {
  seconds: number;
  count: number;
  backspace: boolean;
}) => {
  const [typeState, setTypeState] = useState<TypeState>("start");
  const [errors, setErrors] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isEnabled, setIsEnabled] = useState<boolean>(typeState !== "finished");
  const { resetCountdown, startCountdown, timeLeft, stopCountdown } =
    useCountdown({
      seconds,
    });

  const { words, updateWords, setCustomWords } = useWords({
    count,
  });

  const {
    cursorPosition,
    typed,
    clearTyped,
    totalTyped,
    resetTotalTyped,
    handleKeydown,
  } = useTyping({
    enabled: isEnabled,
    isFinished,
    backspace,
  });

  const isStarting = typeState === "start" && cursorPosition > 0;

  const restartTyping = useCallback(() => {
    resetCountdown();
    resetTotalTyped();
    setErrors(0);
    updateWords();
    clearTyped();
    setTypeState("start");
    setIsFinished(false);
  }, [resetCountdown, resetTotalTyped, updateWords, clearTyped]);

  const restartTypingWithCustomWords = useCallback(
    ({ words }: { words: string }) => {
      resetCountdown();
      resetTotalTyped();
      setErrors(0);
      setCustomWords({ words });
      clearTyped();
      setTypeState("start");
      setIsFinished(false);
    },
    [resetCountdown, resetTotalTyped, setCustomWords, clearTyped]
  );

  const calculateErrors = useCallback(() => {
    const wordsReached = words.substring(
      0,
      Math.min(cursorPosition, words.length)
    );
    setErrors(() =>
      countErrors({
        typed,
        wordsReached,
      })
    );
  }, [words, cursorPosition, typed]);

  useEffect(() => {
    if (isStarting) {
      setTypeState("run");
      startCountdown();
    }
  }, [isStarting, startCountdown]);

  useEffect(() => {
    if (!timeLeft && typeState === "run") {
      setTypeState("finished");
      calculateErrors();
      setIsFinished(true);
    }
  }, [timeLeft, typeState, calculateErrors]);

  useEffect(() => {
    if (isFinished) {
      calculateErrors();
      stopCountdown();
      setTypeState("finished");
    }
  }, [isFinished, calculateErrors, stopCountdown]);

  useEffect(() => {
    setIsFinished(() => cursorPosition === words.length);
  }, [words, cursorPosition]);

  useEffect(() => {
    if (seconds && count) {
      restartTyping();
    }
  }, [seconds, count]);

  return {
    typeState,
    totalTime: seconds,
    words,
    typed,
    errors,
    restartTyping,
    timeLeft,
    totalTyped,
    isFinished,
    isEnabled,
    setIsEnabled,
    handleKeydown,
    setCustomWords: restartTypingWithCustomWords,
  };
};
