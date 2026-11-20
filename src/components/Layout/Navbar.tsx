import Link from "next/link";
import { Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Wrench size={20} />
          </div>

          <span className="text-xl font-bold tracking-tight text-gray-900">
            Fix<span className="text-blue-600">Mate</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
            Home
          </Link>

          <Link href="/services" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
            Services
          </Link>

          <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
            About
          </Link>

          <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
            Contact
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" className="font-medium">
              Login
            </Button>
          </Link>

          <Link href="/register">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Get Started
            </Button>
          </Link>
        </div>

      </nav>
    </header>
  );
};

export default Navbar;