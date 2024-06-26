import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { ReactNode } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

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
        "mx-auto w-full min-h-[calc(100vh_-_10rem)] max-w-screen-xl px-2.5 pt-10 md:px-20 md:pt-14 pb-4",
        className,
        poppins.className
      )}
    >
      {children}
    </div>
  );
}
