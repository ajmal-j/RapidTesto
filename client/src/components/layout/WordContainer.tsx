import { TypeState } from "@/hooks/useTyper";
import { ReactNode } from "react";

export default function WordContainer({
  children,
  typeState,
}: {
  children: ReactNode;
  typeState: TypeState;
}) {
  return (
    <div
      className={`relative xl:text-4xl text-3xl leading-relaxed overflow-y-auto break-all mt-3 font-mono ${
        typeState === "finished"
          ? "max-h-[calc(100vh_-_30rem)]"
          : "max-h-[calc(100vh_-_20rem)]"
      }`}
    >
      {children}
    </div>
  );
}
