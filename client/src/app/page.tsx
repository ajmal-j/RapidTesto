import { ThemeToggle } from "@/components/buttons/theme-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className='flex gap-2 items-center justify-center p-5'>
      <Button>home</Button>
      <ThemeToggle />
    </div>
  );
}
