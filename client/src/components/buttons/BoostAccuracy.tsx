"use client";

import axios from "axios";
import { Loader, Rocket } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

type Props = {
  setCustomWords: ({ words }: { words: string }) => void;
  count: number;
};

const BoostAccuracy = ({ setCustomWords, count }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleBoostAccuracy = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/precision_practice", {
        wordsLength: count,
      });

      if (!response.data?.words) {
        toast.error("Something went wrong. Please try again later.");
        return;
      }
      setCustomWords({ words: response.data.words });
      toast.custom(() => <Toast />);
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.response?.data ?? "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button
          variant={"outline"}
          onClick={handleBoostAccuracy}
          className='gap-2 flex'
        >
          {loading ? (
            <Loader size={16} className='animate-spin' />
          ) : (
            <Rocket size={16} />
          )}
          <span>Boost Accuracy</span>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className='w-full max-w-[400px] '>
        <p className='text-sm'>
          <Rocket size={16} className='animate-bounce inline me-2' />
          *Enhance accuracy by generating new word sets based on frequently
          missed letters. Requires completion of at least 5 chapters for
          analysis.
        </p>
      </HoverCardContent>
    </HoverCard>
  );
};

function Toast() {
  return (
    <div className='flex items-center gap-2'>
      <Rocket size={16} />
      <span>Start typing.</span>
    </div>
  );
}

export default BoostAccuracy;
