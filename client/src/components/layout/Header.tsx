import { signIn } from "@/auth";
import getSession from "@/lib/getSession";
import Image from "next/image";
import Link from "next/link";
import { AvatarButton } from "../buttons/Avatar";
import { ThemeToggle } from "../buttons/theme-toggle";
import { Button } from "../ui/button";

export default async function Header() {
  const session = await getSession();
  const user = session?.user;

  return (
    <div className='flex md:px-3 px-2 py-6 items-center justify-between bg-gradient-to-b from-background to-transparent'>
      <Link href='/'>
        <Image
          src='/title.svg'
          className='dark:invert'
          alt='logo'
          width={160}
          height={10}
        />
      </Link>

      <div className='flex gap-2 items-center'>
        <ThemeToggle />
        {user ? <AvatarButton {...{ user }} /> : <SignInButton />}
      </div>
    </div>
  );
}

function SignInButton() {
  return (
    <Link href={"/api/auth/signin"}>
      <Button variant='outline' type='submit'>
        Sign In
      </Button>
    </Link>
  );
}
