import Image from "next/image";
import { ThemeToggle } from "../buttons/theme-toggle";
import { auth, signIn } from "@/auth";
import { Button } from "../ui/button";
import { AvatarButton } from "../buttons/Avatar";

export default async function Header() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className='flex md:px-3 px-2 py-6 items-center justify-between bg-gradient-to-b from-background to-transparent'>
      <Image
        src='/title.svg'
        className='dark:invert'
        alt='logo'
        width={160}
        height={10}
      />
      <div className='flex gap-2 items-center'>
        <ThemeToggle />
        {user ? <AvatarButton {...{ user }} /> : <SignInButton />}
      </div>
    </div>
  );
}

function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <Button variant='outline' type='submit'>
        Sign In
      </Button>
    </form>
  );
}
