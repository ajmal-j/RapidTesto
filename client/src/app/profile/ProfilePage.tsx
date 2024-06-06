"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateProfileSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "next-auth";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { updateProfile } from "../../actions/profile";

type Props = {
  user: User;
};

const ProfilePage = ({ user }: Props) => {
  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof updateProfileSchema>) {
    try {
      await updateProfile(values);
      toast.success("Profile updated.");
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <h1 className='sm:text-4xl text-3xl mb-5'>Profile</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='Username' {...field} />
                </FormControl>
                <FormDescription>Update your details.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfilePage;