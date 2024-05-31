"use client";

import { useCallback, useEffect, useState } from "react";

export default function useSettings() {
  const [settings, setSettings] = useState<{
    seconds: number;
    count: number;
    backspace: boolean;
  }>({
    seconds: 30,
    count: 20,
    backspace: true,
  });
  const [seconds, updateSeconds] = useState(30);
  const [count, updateCount] = useState(20);
  const [backspace, updateBackspace] = useState(true);

  useEffect(() => {
    const result = localStorage.getItem("settings");
    const settings: {
      seconds: number;
      count: number;
      backspace: boolean;
    } = JSON.parse(result ?? "{}");
    if (settings?.seconds) {
      setSettings(settings);
    }
  }, []);

  useEffect(() => {
    updateSeconds(settings.seconds);
    updateCount(settings.count);
    updateBackspace(settings.backspace);
  }, [settings]);

  const setSeconds = useCallback(
    (seconds: number) => {
      localStorage.setItem(
        "settings",
        JSON.stringify({ seconds, count, backspace })
      );
      updateSeconds(seconds);
    },
    [count, backspace]
  );

  const setCount = useCallback(
    (count: number) => {
      localStorage.setItem(
        "settings",
        JSON.stringify({ seconds, count, backspace })
      );
      updateCount(count);
    },
    [seconds, backspace]
  );

  const setBackspace = useCallback(
    (backspace: boolean) => {
      localStorage.setItem(
        "settings",
        JSON.stringify({ seconds, count, backspace })
      );
      updateBackspace(backspace);
    },
    [seconds, count]
  );

  return {
    seconds,
    count,
    setSeconds,
    setCount,
    backspace,
    setBackspace,
  };
}
