"use client";

import { useTyper } from "@/hooks/useTyper";

export default function CountdownTimer() {
  const { timeLeft } = useTyper();
  return (
    <div>
      <h2 className='font-medium'>Time : {timeLeft} </h2>
    </div>
  );
}
