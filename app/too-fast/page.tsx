"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const TooFastPage = () => {
  const router = useRouter();

  return (
    <main className="root-container min-h-screen flex flex-col items-center justify-center">
      <h1 className="font-bebas-neue text-5xl font-bold text-light-100">
        Whoa, Slow down!
      </h1>
      <p className="my-3 text-center text-light-100">
        You have exceeded the rate limit. Please Wait for a few moment then try
        again!
      </p>
      <Button
        className="rounded-full font-semibold"
        onClick={() => router.back()}
      >
        <ArrowLeft />
        Go Back
      </Button>
    </main>
  );
};

export default TooFastPage;
