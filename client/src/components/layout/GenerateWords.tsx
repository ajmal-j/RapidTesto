"use client";

import { Dispatch, SetStateAction } from "react";

export default function GenerateWords({ words }: { words: string }) {
  return <div className='text-slate-500'>{words}</div>;
}
