import { ReactNode } from "react";

export default function WordContainer({ children }: { children: ReactNode }) {
  return (
    <div className='relative text-3xl leading-relaxed break-all mt-3'>
      {children}
    </div>
  );
}
