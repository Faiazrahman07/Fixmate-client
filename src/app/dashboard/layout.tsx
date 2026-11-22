"use client";

import { Wrench } from "lucide-react";

import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const role = session?.user?.role;

  useEffect(() => {
    if (isPending || !session) return;

    if (role === "customer" && !pathname.startsWith("/dashboard/customer") && pathname !== "/dashboard/profile") {
      router.replace("/dashboard/customer");
    }

    if (role === "technician" && !pathname.startsWith("/dashboard/technician") && pathname !== "/dashboard/profile") {
      router.replace("/dashboard/technician");
    }

    if (role === "admin" && !pathname.startsWith("/dashboard/admin") && pathname !== "/dashboard/profile") {
      router.replace("/dashboard/admin");
    }
  }, [session, isPending, role, pathname, router]);

  if (isPending || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50/60 via-white to-white px-6">
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/25">
            <Wrench size={28} />
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <Spinner className="size-4 text-blue-600" />
            Loading your dashboard...
          </div>
        </div>
      </div>
    );
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;