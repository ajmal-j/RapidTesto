"use client";

import { useRef } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { RotateCcw } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function RestartButton({
  restartTyping,
}: {
  restartTyping: (newWords?: boolean) => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClick = (newWords?: boolean) => {
    if (buttonRef.current) {
      buttonRef.current?.blur();
    }
    toast.success("Restarted.");
    restartTyping(newWords);
  };

  return (
    <div className='flex justify-end pt-5'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant='outline' size='icon' className='' ref={buttonRef}>
            <RotateCcw size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Restart with</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className='flex flex-col gap-1'>
            <DropdownMenuItem
              className='bg-foreground/5 cursor-pointer'
              onClick={() => onClick(false)}
            >
              Current Word&apos;s
            </DropdownMenuItem>
            <DropdownMenuItem
              className='bg-foreground/5 cursor-pointer'
              onClick={() => onClick(true)}
            >
              New Word&apos;s
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
