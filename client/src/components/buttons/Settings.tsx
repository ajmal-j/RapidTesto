"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Settings } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";

interface SettingsDropdownProps {
  count: number;
  seconds: number;
  setCount: Dispatch<SetStateAction<number>>;
  setSeconds: Dispatch<SetStateAction<number>>;
  isEnabled: boolean;
  setIsEnabled: Dispatch<SetStateAction<boolean>>;
}

export default function SettingsDropdown({
  count,
  seconds,
  setCount,
  setSeconds,
  setIsEnabled,
}: SettingsDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [input, setInput] = useState<{
    count: number | string;
    seconds: number | string;
  }>({
    count,
    seconds,
  });
  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value);
    if (isNaN(number)) return;
    setInput((prev) => ({ ...prev, count: number || "" }));
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value);
    if (isNaN(number)) return;
    setInput((prev) => ({ ...prev, seconds: number || "" }));
  };

  const handleApply = () => {
    setCount(Number(input.count) || 0);
    setSeconds(Number(input.seconds) || 0);
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      setIsEnabled(() => false);
    }
  }, [open, setIsEnabled]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <Button variant='outline' size='icon'>
          <Settings size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div
          onClick={(e) => e.preventDefault()}
          className='flex flex-col gap-2 justify-end py-2 px-1'
        >
          <Label htmlFor='seconds'>
            Time: <span className='text-primary/40'>(in seconds)</span>
          </Label>
          <Input
            id='seconds'
            value={input.seconds}
            onChange={handleSecondsChange}
          />
          <Label htmlFor='count'>Word count:</Label>
          <Input id='count' value={input.count} onChange={handleCountChange} />
          <div className='flex justify-end w-full'>
            <Button
              disabled={input.count === count && input.seconds === seconds}
              onClick={handleApply}
            >
              Apply
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
