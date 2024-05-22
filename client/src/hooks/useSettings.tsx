"use client";

import { useState } from "react";

export default function useSettings() {
  const [seconds, setSeconds] = useState(60);
  const [count, setCount] = useState(20);

  return {
    seconds,
    count,
    setSeconds,
    setCount,
  };
}
