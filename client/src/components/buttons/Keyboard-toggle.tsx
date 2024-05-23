"use client";

import { Keyboard } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { isMobile, isTablet } from "react-device-detect";
import { Button } from "../ui/button";

export default function KeyboardToggle({
  handleKeydown,
}: {
  handleKeydown: (event: KeyboardEvent) => void;
}) {
  const [isKeyboardEnabled, setIsKeyboardEnabled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isMobile || isTablet) {
      setIsKeyboardEnabled(true);
    }
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (event.currentTarget) {
      event.currentTarget.value = "";
    }
    if (value.length > 0) {
      handleKeydown({
        code: "Key",
        key: value,
      } as KeyboardEvent);
    }
  };

  const toggleKeyboard = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      {isKeyboardEnabled ? (
        <>
          <input
            ref={inputRef}
            className='w-0 h-0 opacity-0'
            type='text'
            autoComplete='off'
            autoCorrect='off'
            spellCheck='false'
            autoCapitalize='off'
            onChange={handleChange}
            onKeyDown={(event) => {
              if (event.key === "Backspace") {
                handleKeydown({
                  code: "Backspace",
                  key: "Backspace",
                } as KeyboardEvent);
              }
            }}
          />
          <Button variant={"outline"} onClick={toggleKeyboard}>
            <Keyboard size={16} />
          </Button>
        </>
      ) : null}
    </>
  );
}
