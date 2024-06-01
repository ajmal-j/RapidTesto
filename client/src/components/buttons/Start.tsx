"use client";

import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export default function StartButton({
  isEnabled,
  isLoading,
  setIsEnabled,
}: {
  isEnabled: boolean;
  isLoading: boolean;
  setIsEnabled: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Button
      disabled={isEnabled}
      variant={"outline"}
      onClick={() => {
        setIsEnabled(true);
        toast.info("Start typing.");
      }}
    >
      {isLoading ? (
        <Loader size={16} className='animate-spin text-foreground' />
      ) : (
        "Start"
      )}
    </Button>
  );
}
