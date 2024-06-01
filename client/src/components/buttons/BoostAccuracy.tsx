"use client";

import axios, { AxiosError } from "axios";
import { Rocket } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";

type Props = {
  setCustomWords: ({ words }: { words: string }) => void;
  count: number;
};

const BoostAccuracy = ({ setCustomWords, count }: Props) => {
  const handleBoostAccuracy = async () => {
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
    }
  };

  return (
    <Button
      variant={"outline"}
      onClick={handleBoostAccuracy}
      className='gap-2 flex'
    >
      <Rocket size={16} />
      <span>Boost Accuracy</span>
    </Button>
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
