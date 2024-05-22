import { useRef } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

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
    toast.success("Typing restarted.");
    restartTyping();
  };

  return (
    <div className='flex justify-end pt-5'>
      <Button onClick={onClick} variant='outline' className='' ref={buttonRef}>
        restart
      </Button>
    </div>
  );
}
