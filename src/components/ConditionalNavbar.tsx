"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Layout/Navbar";


export default function ConditionalNavbar() {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return <Navbar></Navbar>;
}