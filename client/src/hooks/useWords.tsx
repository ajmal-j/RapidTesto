"use client";

import { faker } from "@faker-js/faker";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

const generateWords = (count: number) => {
  return faker.lorem.words(count);
};

export const useWords = ({ count }: { count: number }) => {
  const [words, setWords] = useState<string>("");

  const updateWords = useCallback(() => {
    setWords(generateWords(count));
  }, [count]);

  useEffect(() => {
    updateWords();
  }, [updateWords]);

  const setCustomWords = ({ words }: { words: string }) => {
    setWords(words);
  };

  return { words, updateWords, setCustomWords };
};
