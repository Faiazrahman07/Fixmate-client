"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  Hammer,
  House,
  LifeBuoy,
  RefreshCw,
  Settings,
  TriangleAlert,
  Wrench,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-20">
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700">
          <TriangleAlert size={16} />
          Something went wrong
        </span>

        <div className="relative mb-8 mt-10 flex h-48 w-full max-w-sm items-center justify-center">
          <div className="absolute h-40 w-40 rounded-full border-2 border-dashed border-red-200/80 md:h-48 md:w-48" />
          <div className="absolute h-40 w-40 rounded-full bg-red-200/30 blur-2xl md:h-48 md:w-48" />

          <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl border border-red-100 bg-white text-red-600 shadow-xl shadow-red-600/10 md:h-32 md:w-32">
            <Wrench size={52} />

            <span className="absolute -bottom-3 -right-3 flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white shadow-lg">
              <TriangleAlert size={20} />
            </span>
          </div>

          <div className="absolute left-0 top-6 rounded-2xl border border-blue-100 bg-white p-3 text-blue-600 shadow-lg md:left-4">
            <Hammer size={24} />
          </div>

          <div className="absolute bottom-4 right-0 rounded-2xl border border-blue-100 bg-white p-3 text-blue-600 shadow-lg md:right-4">
            <Settings size={24} className="animate-[spin_12s_linear_infinite]" />
          </div>

          <div className="absolute -left-1 bottom-10 hidden h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg sm:flex">
            <LifeBuoy size={18} />
          </div>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
          We hit a snag
        </h1>

        <p className="mt-4 max-w-xl text-base leading-7 text-gray-600 md:text-lg">
          Our tools ran into an unexpected problem while loading this page.
          Please try again &mdash; if it keeps happening, our support team is
          here to help.
        </p>

        <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Button
            type="button"
            onClick={() => reset()}
            className="h-12 rounded-xl bg-blue-600 px-7 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
          >
            <RefreshCw size={18} />
            Retry
          </Button>

          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-12 rounded-xl border-gray-300 bg-white px-7 text-sm font-semibold text-gray-800 hover:border-blue-500 hover:text-blue-600"
            )}
          >
            <House size={18} />
            Back to Home
          </Link>
        </div>

        {error.digest && (
          <p className="mt-5 text-xs text-gray-400">
            Error reference: {error.digest}
          </p>
        )}

        <p className="mt-5 text-sm text-gray-500">
          Still stuck?{" "}
          <Link
            href="/contact"
            className="font-semibold text-blue-600 hover:underline"
          >
            Contact our support team
          </Link>
        </p>
      </div>
    </section>
  );
}
