import { ReactNode } from "react";

export default function WordContainer({ children }: { children: ReactNode }) {
  return (
    <div className='relative xl:text-4xl text-3xl leading-relaxed break-all mt-3 font-mono'>
      {children}
    </div>
  );
}
