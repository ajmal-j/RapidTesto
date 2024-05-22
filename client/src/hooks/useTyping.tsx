"use client";

import { isKeyboardCodeAllowed } from "@/utils";
import { useCallback, useEffect, useRef, useState } from "react";

export const useTyping = ({
  enabled,
  isFinished,
  backspace,
}: {
  enabled: boolean;
  isFinished: boolean;
  backspace: boolean;
}) => {
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [typed, setTyped] = useState<string>("");
  const totalTypedRef = useRef<number>(0);

  const handleKeydown = useCallback(
    ({ key, code }: KeyboardEvent) => {
      if (!enabled || !isKeyboardCodeAllowed({ code })) return;
      if (isFinished) return;

      if (key === "Backspace") {
        if (!backspace) return;
        setTyped((prev) => prev.slice(0, -1));
        setCursorPosition((prev) => prev - 1);
        totalTypedRef.current -= 1;
      } else {
        setTyped((prev) => prev + key);
        setCursorPosition((prev) => prev + 1);
        totalTypedRef.current += 1;
      }
    },
    [enabled, isFinished, backspace]
  );

  const clearTyped = () => {
    setTyped("");
    setCursorPosition(0);
    totalTypedRef.current = 0;
  };

  const resetTotalTyped = () => {
    totalTypedRef.current = 0;
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);

  return {
    typed,
    cursorPosition,
    clearTyped,
    resetTotalTyped,
    totalTyped: totalTypedRef.current,
  };
};
