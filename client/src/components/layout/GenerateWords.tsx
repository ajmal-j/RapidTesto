"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Dispatch, SetStateAction } from "react";

export default function GenerateWords({
  words,
  setIsEnabled,
}: {
  words: string;
  setIsEnabled: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      {words ? (
        <div
          className='text-slate-500 space-x-2 flex flex-grow flex-wrap gap-y-3'
          onClick={() => setIsEnabled(true)}
        >
          {words.split("").map((c, i) => (
            <span key={i} className='border rounded-xl px-2'>
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
        </div>
      ) : (
        <div className='flex flex-col gap-2 my-3'>
          <Skeleton className='h-12 xl:h-10 rounded-lg' />
          <Skeleton className='h-12 xl:h-10 rounded-lg' />
          <Skeleton className='h-12 xl:h-10 rounded-lg' />
          <Skeleton className='h-12 xl:h-10 rounded-lg' />
        </div>
      )}
    </>
  );
}
