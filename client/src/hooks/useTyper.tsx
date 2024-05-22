"use client";

import { useCallback, useEffect, useState } from "react";
import { useCountdown } from "./useCountdown";
import { useWords } from "./useWords";
import { useTyping } from "./useTyping";
import { countErrors } from "@/utils";

export type TypeState = "start" | "run" | "finished";

const NUMBER_OF_WORDS = 15;

const COUNTDOWN_SECONDS = 30;

export const useTyper = () => {
  const [typeState, setTypeState] = useState<TypeState>("start");
  const [errors, setErrors] = useState<number>(0);
  const { resetCountdown, startCountdown, timeLeft } = useCountdown({
    seconds: COUNTDOWN_SECONDS,
  });

  const { words, updateWords } = useWords({
    count: NUMBER_OF_WORDS,
  });

  const { cursorPosition, typed, clearTyped, totalTyped, resetTotalTyped } =
    useTyping({
      enabled: typeState !== "finished",
    });

  const isStarting = typeState === "start" && cursorPosition > 0;
  const isFinished = cursorPosition === words.length;

  const restartTyping = useCallback(() => {
    resetCountdown();
    resetTotalTyped();
    setErrors(0);
    updateWords();
    clearTyped();
    setTypeState("start");
  }, [resetCountdown, resetTotalTyped, updateWords, clearTyped]);

  const calculateErrors = useCallback(() => {
    const wordsReached = words.substring(
      0,
      Math.min(cursorPosition, words.length)
    );
    setErrors(
      (prev) =>
        prev +
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
    }
  }, [timeLeft, typeState, calculateErrors]);

  useEffect(() => {
    if (isFinished) {
      calculateErrors();
      updateWords();
      clearTyped();
    }
  }, [isFinished, calculateErrors, updateWords, clearTyped]);

  return {
    typeState,
    words,
    typed,
    errors,
    restartTyping,
    timeLeft,
    totalTyped,
  };
};
