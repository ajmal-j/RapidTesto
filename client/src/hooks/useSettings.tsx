"use client";

import { useCallback, useEffect, useState } from "react";

export default function useSettings() {
  const [settings, setSettings] = useState<{
    seconds: number;
    count: number;
    backspace: boolean;
    isDefault?: boolean;
  }>({
    seconds: 60,
    count: 20,
    backspace: true,
    isDefault: true,
  });
  const [seconds, updateSeconds] = useState(30);
  const [count, updateCount] = useState(20);
  const [backspace, updateBackspace] = useState(true);

  useEffect(() => {
    if (!settings?.isDefault) return;
    const result = localStorage.getItem("settings");
    const settingsR: {
      seconds: number;
      count: number;
      backspace: boolean;
    } = JSON.parse(result ?? "{}");
    if (settingsR?.seconds) {
      setSettings({
        ...settings,
        isDefault: false,
      });
      updateBackspace(settingsR.backspace);
    }
  }, [settings]);

  const setSeconds = useCallback((seconds: number) => {
    updateSeconds(seconds);
  }, []);

  const setCount = useCallback((count: number) => {
    updateCount(count);
  }, []);

  const setBackspace = useCallback(
    (backspace: boolean) => {
      updateBackspace(backspace);
      localStorage.setItem(
        "settings",
        JSON.stringify({ seconds, count, backspace })
      );
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
