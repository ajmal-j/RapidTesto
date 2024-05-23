"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Sparkles } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

const formSchema = z.object({
  prompt: z
    .string()
    .min(10, { message: "Too short!" })
    .max(300, { message: "Too long!" }),
});

export default function GeneratePrompt({
  setIsEnabled,
  count,
  setCustomWords,
}: {
  count: number;
  setCustomWords: ({ words }: { words: string }) => void;
  setIsEnabled: Dispatch<SetStateAction<boolean>>;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previousPrompt, setPreviousPrompt] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      if (values.prompt === previousPrompt) return;
      const response = await axios.post("/api/generate", {
        ...values,
        words: count,
      });
      const data = response.data;
      if (!data) throw new Error("Unable to generate words, please try again.");
      setCustomWords({ words: data });
      setPreviousPrompt(values.prompt);
      setOpen(false);
      toast.success("Generated successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (open) {
      setIsEnabled(() => false);
    }
  }, [open, setIsEnabled]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant='outline'>
          <Sparkles size={17} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-5'>Generate Custom Words.</DialogTitle>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8'
              >
                <FormField
                  control={form.control}
                  name='prompt'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prompt :</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={8}
                          placeholder='Generate words to practice numbers and special characters...'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex justify-end'>
                  <Button
                    disabled={loading}
                    type='submit'
                    variant='outline'
                    size='sm'
                    className='w-[80px]'
                  >
                    {loading ? (
                      <Loader size={16} className='animate-spin text-primary' />
                    ) : (
                      "Generate"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
