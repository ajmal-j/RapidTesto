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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
          <Link href='/profile'>
            <Button
              variant='outline'
              className='flex justify-start gap-2 w-full'
            >
              <UserIcon size={16} />
              <span>Profile</span>
            </Button>
          </Link>
        </DropdownMenuItem>

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
          <Popover>
            <PopoverTrigger className='w-full'>
              <Button
                type='submit'
                variant='destructive'
                className='flex gap-2 justify-start w-full'
              >
                <LogOut size={16} />
                <span>Sign out</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align='end' className='rounded-3xl'>
              <div className='flex flex-col gap-2 text-sm'>
                <h6 className='text-muted-foreground'>
                  Are you sure you want to sign out?
                </h6>
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                  className='self-end'
                >
                  <Button
                    type='submit'
                    variant='destructive'
                    className='flex gap-2 items-center justify-center rounded-full'
                    size={"icon"}
                  >
                    <LogOut size={13} />
                  </Button>
                </form>
              </div>
            </PopoverContent>
          </Popover>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
