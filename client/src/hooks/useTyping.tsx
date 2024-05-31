"use client";

import { isKeyboardCodeAllowed } from "@/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { isMobile, isTablet } from "react-device-detect";

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
    (e: KeyboardEvent) => {
      if (!enabled || !isKeyboardCodeAllowed({ code: e.code })) return;
      if (isFinished) return;

      if (e.code === "Space") e.preventDefault();

      if (e.key === "Backspace") {
        if (!backspace) return;
        setTyped((prev) => prev.slice(0, -1));
        setCursorPosition((prev) => prev - 1);
        totalTypedRef.current -= 1;
      } else {
        setTyped((prev) => prev + e.key);
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
    if (!isMobile && !isTablet) {
      window.addEventListener("keydown", handleKeydown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown]);

  useEffect(() => {
    const targetSpan = document.getElementById(
      (cursorPosition + typed.length - 1).toString()
    );
    if (targetSpan) {
      targetSpan.scrollIntoView({ behavior: "smooth" });
    }
  }, [cursorPosition, typed]);

  return {
    typed,
    cursorPosition,
    clearTyped,
    resetTotalTyped,
    totalTyped: totalTypedRef.current,
    handleKeydown,
  };
};
