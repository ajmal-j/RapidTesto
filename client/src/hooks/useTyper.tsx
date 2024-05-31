"use client";

import { useCallback, useEffect, useState } from "react";
import { useCountdown } from "./useCountdown";
import { useWords } from "./useWords";
import { useTyping } from "./useTyping";
import { v4 as uuid } from "uuid";
import {
  calculateAccuracyPercentage,
  calculateWPM,
  countErrors,
} from "@/utils";
import { updateChapter } from "@/actions/updateTyping";

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
  const [result, setResult] = useState<{
    accuracy: number;
    speed: string;
    missed: number;
    typed: number;
    missedLetters: Map<string, number>;
  }>({
    accuracy: 0,
    speed: "",
    missed: 0,
    typed: 0,
    missedLetters: new Map(),
  });
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isEnabled, setIsEnabled] = useState<boolean>(typeState !== "finished");
  const [wordId, setWordId] = useState<string>("");
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

  const restartTyping = useCallback(
    (newWords?: boolean) => {
      if (newWords) {
        updateWords();
      }
      resetCountdown();
      resetTotalTyped();
      setResult({
        accuracy: 0,
        speed: "",
        missed: 0,
        typed: 0,
        missedLetters: new Map(),
      });
      clearTyped();
      setTypeState("start");
      setIsFinished(false);
      setWordId(uuid());
    },
    [resetCountdown, resetTotalTyped, updateWords, clearTyped]
  );

  const restartTypingWithCustomWords = useCallback(
    ({ words }: { words: string }) => {
      resetCountdown();
      resetTotalTyped();
      setResult({
        accuracy: 0,
        speed: "",
        missed: 0,
        typed: 0,
        missedLetters: new Map(),
      });
      setCustomWords({ words });
      clearTyped();
      setTypeState("start");
      setIsFinished(false);
      setWordId(uuid());
    },
    [resetCountdown, resetTotalTyped, setCustomWords, clearTyped]
  );

  const calculateErrors = useCallback(async () => {
    const wordsReached = words.substring(
      0,
      Math.min(cursorPosition, words.length)
    );
    const { missed, missedLetters } = countErrors({
      typed,
      wordsReached,
    });

    const speed = calculateWPM({
      correctLetters: totalTyped - missed,
      timeTaken: seconds - timeLeft,
    }).concat(" WPM") as string;

    const accuracy = calculateAccuracyPercentage({
      errors: missed,
      totalTyped,
      totalWords: words.length,
    });

    setResult(() => ({
      accuracy,
      speed,
      missed,
      typed: typed.length,
      missedLetters,
    }));

    // TODO: update chapter
    await updateChapter({
      result: {
        accuracy: accuracy,
        missed: missed,
        speed: speed,
        typed: typed.length,
      },
      missedLetters,
      wordId,
      time: Math.min(seconds - timeLeft),
      typedWords: typed,
      words,
    });
    setIsFinished(() => true);
  }, [cursorPosition, seconds, timeLeft, totalTyped, typed, words, wordId]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, count]);

  return {
    typeState,
    totalTime: seconds,
    words,
    typed,
    result,
    setWordId,
    restartTyping,
    timeLeft,
    totalTyped,
    isFinished,
    isEnabled,
    setIsEnabled,
    handleKeydown,
    cursorPosition,
    setCustomWords: restartTypingWithCustomWords,
  };
};
