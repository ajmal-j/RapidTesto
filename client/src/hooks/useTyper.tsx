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
}: {
  seconds: number;
  count: number;
}) => {
  const [typeState, setTypeState] = useState<TypeState>("start");
  const [errors, setErrors] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const { resetCountdown, startCountdown, timeLeft, stopCountdown } =
    useCountdown({
      seconds,
    });

  const { words, updateWords } = useWords({
    count,
  });

  const { cursorPosition, typed, clearTyped, totalTyped, resetTotalTyped } =
    useTyping({
      enabled: typeState !== "finished",
      isFinished,
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
  };
};
