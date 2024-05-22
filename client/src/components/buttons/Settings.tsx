"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";

interface SettingsDropdownProps {
  count: number;
  seconds: number;
  setCount: Dispatch<SetStateAction<number>>;
  setSeconds: Dispatch<SetStateAction<number>>;
  isEnabled: boolean;
  setIsEnabled: Dispatch<SetStateAction<boolean>>;
  backspace: boolean;
  setBackspace: Dispatch<SetStateAction<boolean>>;
}

export default function SettingsDropdown({
  count,
  seconds,
  setCount,
  backspace,
  setSeconds,
  setBackspace,
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
      <DropdownMenuContent align='end' className='space-y-1'>
        <DropdownMenuLabel className='font-semibold text-primary/50'>
          Settings
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className='flex items-center justify-between gap-2 px-2 py-3'>
          <Label htmlFor='backspace'>Backspace</Label>
          <Switch
            id='backspace'
            checked={backspace}
            onCheckedChange={setBackspace}
          />
        </div>
        <DropdownMenuSeparator />
        <div
          onClick={(e) => e.preventDefault()}
          className='flex flex-col gap-2 justify-end px-2 py-3'
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
              size={"sm"}
              onClick={handleApply}
            >
              apply
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
