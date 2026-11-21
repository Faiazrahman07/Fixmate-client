"use client";

import DashboardLayout from "@/components/Dashboard/DashboardLayout";
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
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;