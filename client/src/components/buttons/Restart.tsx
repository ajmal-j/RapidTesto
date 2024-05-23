import { useRef } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { RotateCcw } from "lucide-react";

export default function RestartButton({
  restartTyping,
}: {
  restartTyping: () => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClick = () => {
    if (buttonRef.current) {
      buttonRef.current?.blur();
    }
    toast.success("Restarted.");
    restartTyping();
  };

  return (
    <div className='flex justify-end pt-5'>
      <Button
        onClick={onClick}
        variant='outline'
        size='icon'
        className=''
        ref={buttonRef}
      >
        <RotateCcw size={16} />
      </Button>
    </div>
  );
}
