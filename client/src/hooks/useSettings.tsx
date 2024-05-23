"use client";

import { useState } from "react";

export default function useSettings() {
  const [seconds, setSeconds] = useState(30);
  const [count, setCount] = useState(20);
  const [backspace, setBackspace] = useState(true);

  return {
    seconds,
    count,
    setSeconds,
    setCount,
    backspace,
    setBackspace,
  };
}
