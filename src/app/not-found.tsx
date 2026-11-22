import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Hammer,
  House,
  Search,
  Settings,
  Toolbox,
  Wrench,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Page Not Found | FixMate",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-20">
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
          <Wrench size={16} />
          Error 404 &middot; Missing Part
        </span>

        <div className="relative mb-8 mt-10 flex h-48 w-full max-w-sm items-center justify-center">
          <div className="absolute h-40 w-40 rounded-full border-2 border-dashed border-blue-200 md:h-48 md:w-48" />
          <div className="absolute h-40 w-40 rounded-full bg-blue-200/30 blur-2xl md:h-48 md:w-48" />

          <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-xl shadow-blue-600/25 md:h-32 md:w-32">
            <Toolbox size={54} />
          </div>

          <div className="absolute left-0 top-6 rounded-2xl border border-blue-100 bg-white p-3 text-blue-600 shadow-lg md:left-4">
            <Hammer size={24} />
          </div>

          <div className="absolute bottom-4 right-0 rounded-2xl border border-blue-100 bg-white p-3 text-blue-600 shadow-lg md:right-4">
            <Settings size={24} className="animate-[spin_12s_linear_infinite]" />
          </div>

          <div className="absolute -right-1 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
            <Search size={18} />
          </div>

          <span className="absolute -bottom-2 rounded-full border border-blue-100 bg-white px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-sm">
            Part not found
          </span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
          Page Not Found
        </h1>

        <p className="mt-4 max-w-xl text-base leading-7 text-gray-600 md:text-lg">
          Looks like this page has been unplugged, misplaced, or never existed.
          Our tools could not find it, but we can get you back on track.
        </p>

        <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/"
            className={cn(
              buttonVariants(),
              "h-12 rounded-xl bg-blue-600 px-7 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
            )}
          >
            <House size={18} />
            Back to Home
          </Link>

          <Link
            href="/services"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-12 rounded-xl border-gray-300 bg-white px-7 text-sm font-semibold text-gray-800 hover:border-blue-500 hover:text-blue-600"
            )}
          >
            Browse Services
            <ArrowRight size={18} />
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Need a hand?{" "}
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
