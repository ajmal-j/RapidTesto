import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function StartButton({
  isEnabled,

  setIsEnabled,
}: {
  isEnabled: boolean;
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
      Start
    </Button>
  );
}
