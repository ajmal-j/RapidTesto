import Image from "next/image";
import { ThemeToggle } from "../buttons/theme-toggle";

export default function Header() {
  return (
    <div className='flex md:px-3 px-2 py-6 items-center justify-between bg-gradient-to-b from-background to-transparent'>
      <Image
        src='/title.svg'
        className='dark:invert'
        alt='logo'
        width={160}
        height={10}
      />
      <ThemeToggle />
    </div>
  );
}
