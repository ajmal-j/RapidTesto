import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Wrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full min-h-[calc(100vh_-_10rem)] max-w-screen-xl px-2.5 pt-2.5 md:px-20 md:pt-3",
        className
      )}
    >
      {children}
    </div>
  );
}
