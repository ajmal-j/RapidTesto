import Image from "next/image";
import { ThemeToggle } from "../buttons/theme-toggle";

export default function Header() {
  return (
    <div className='flex md:px-3 px-1 py-4 items-center justify-between border-b mb-10'>
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
