"use client";
import { Skeleton } from "@/components/ui/skeleton";

export default function GenerateWords({ words }: { words: string }) {
  return (
    <>
      {words ? (
        <div className='text-slate-500'>{words}</div>
      ) : (
        <div className='flex flex-col gap-2 my-3 pt-2'>
          <Skeleton className='h-[30px] rounded-lg' />
          <Skeleton className='h-[30px] rounded-lg' />
          <Skeleton className='h-[30px] rounded-lg' />
          <Skeleton className='h-[30px] rounded-lg' />
        </div>
      )}
    </>
  );
}
