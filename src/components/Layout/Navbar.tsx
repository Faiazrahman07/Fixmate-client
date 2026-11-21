"use client";

import Link from "next/link";
import {
  Wrench,
  Menu,
  X,
  UserCircle,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: session, isPending } = useSession();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const role = session?.user?.role || "customer";

  const dashboardRoute =
    role === "admin"
      ? "/dashboard/admin"
      : role === "technician"
        ? "/dashboard/technician"
        : "/dashboard/customer";

  const roleLabel =
    role === "admin"
      ? "Admin"
      : role === "technician"
        ? "Technician"
        : "Customer";

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Wrench size={22} />
          </div>

          <span className="text-2xl font-bold tracking-tight text-gray-900">
            Fix<span className="text-blue-600">Mate</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition ${
                pathname === link.href
                  ? "font-semibold text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden items-center gap-3 md:flex">
          {!isPending && (
            <>
              {session ? (
                <div className="relative">
                  {/* User Dropdown Button */}
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-gray-100"
                  >
                    <UserCircle size={24} className="text-gray-700" />

                    <span className="text-sm font-medium text-gray-700">
                      {session.user.name}
                    </span>

                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-xl border bg-white p-3 shadow-lg">
                      {/* User Information */}
                      <div className="border-b pb-3">
                        <p className="font-semibold text-gray-900">
                          {session.user.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          {session.user.email}
                        </p>

                        <span className="mt-2 inline-block rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
                          {roleLabel}
                        </span>
                      </div>

                      {/* Dropdown Links */}
                      <div className="flex flex-col gap-1 pt-2">
                        <Link
                          href={dashboardRoute}
                          onClick={() => setIsDropdownOpen(false)}
                          className="rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
                        >
                          Dashboard
                        </Link>

                        <Link
                          href="/dashboard/profile"
                          onClick={() => setIsDropdownOpen(false)}
                          className="rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
                        >
                          Update Profile
                        </Link>

                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
                        >
                          <LogOut size={16} />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/sign-up"
                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-md p-2 text-gray-700 md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

    
      {isOpen && (
        <div className="border-t bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
          
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-medium transition ${
                  pathname === link.href
                    ? "font-semibold text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Auth Section */}
            {!isPending && (
              <div className="flex flex-col gap-3 border-t pt-4">
                {session ? (
                  <>
                    {/* User Information */}
                    <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                      <UserCircle size={24} className="text-gray-700" />

                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {session.user.name}
                        </p>

                        <span className="text-xs font-medium text-blue-600">
                          {roleLabel}
                        </span>
                      </div>
                    </div>

                    {/* Dashboard */}
                    <Link
                      href={dashboardRoute}
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>

                    {/* Update Profile */}
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
                    >
                      Update Profile
                    </Link>

                    {/* Sign Out */}
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                      Sign In
                    </Link>

                    <Link
                      href="/sign-up"
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;