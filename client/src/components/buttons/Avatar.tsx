import { signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatharPlaceholder } from "@/constants";
import { Check, LogOut, Settings, User as UserIcon } from "lucide-react";
import { User } from "next-auth";
import Link from "next/link";
import { Button } from "../ui/button";

interface AvatarProps {
  user: User;
}

export function AvatarButton({ user }: AvatarProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={user?.image ?? AvatharPlaceholder}
            alt='user image'
          />
          <AvatarFallback>
            <UserIcon size={16} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='space-y-1'>
        <DropdownMenuLabel>{user?.name ?? "User"}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className='p-0'>
          <Link href='/completed'>
            <Button
              variant='outline'
              className='flex justify-start gap-2 w-full'
            >
              <Check size={16} />
              <span>Completed</span>
            </Button>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className='p-0'>
          <Link href='/settings'>
            <Button
              variant='outline'
              className='flex justify-start gap-2 w-full'
            >
              <Settings size={16} />
              <span>Settings</span>
            </Button>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className='p-0'>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button
              type='submit'
              variant='outline'
              className='flex gap-2 justify-start w-full'
            >
              <LogOut size={16} />
              <span>Sign out</span>
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
