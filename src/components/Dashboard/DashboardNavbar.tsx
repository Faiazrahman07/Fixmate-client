"use client";

import Link from "next/link";
import Image from "next/image";
import { Home, LogOut } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const DashboardNavbar = () => {
  const { data: session } = useSession();
   const router = useRouter();

  const user = session?.user;

  const handleLogout = async () => {
    await signOut();
  router.push('/signup');
  };

  return (
    <header className="flex items-center justify-between bg-base-100 border-b border-base-300 px-4 md:px-6 py-3">
      
      <Link
        href="/"
        className="btn btn-ghost btn-sm gap-2"
      >
        <Home size={18} />
        <span>Home</span>
      </Link>

  
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="font-semibold text-sm">
            {user?.name || "User"}
          </p>
          <p className="text-xs text-base-content/60 capitalize">
            {user?.role || "customer"}
          </p>
        </div>

        <div className="avatar">
          <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="bg-primary text-primary-content flex items-center justify-center w-10 h-10 rounded-full font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="btn btn-ghost btn-sm text-error"
          title="Logout"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default DashboardNavbar;