"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import {
  LayoutDashboard,
  CalendarDays,
  CreditCard,
  PlusCircle,
  Wrench,
  ClipboardList,
  Users,
  Settings,
  Receipt,
} from "lucide-react";

const menuItems = {
  customer: [
    { name: "Overview", href: "/dashboard/customer", icon: LayoutDashboard },
    { name: "My Bookings", href: "/dashboard/customer/bookings", icon: CalendarDays },
    { name: "Payment History", href: "/dashboard/customer/payments", icon: CreditCard },
  ],

  technician: [
    { name: "Overview", href: "/dashboard/technician", icon: LayoutDashboard },
    { name: "Add Service", href: "/dashboard/technician/add-service", icon: PlusCircle },
    { name: "My Services", href: "/dashboard/technician/my-services", icon: Wrench },
    { name: "Manage Requests", href: "/dashboard/technician/requests", icon: ClipboardList },
  ],

  admin: [
    { name: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Manage Users", href: "/dashboard/admin/users", icon: Users },
    { name: "Service Approval", href: "/dashboard/admin/services", icon: Settings },
    { name: "All Bookings", href: "/dashboard/admin/bookings", icon: CalendarDays },
    { name: "Transactions", href: "/dashboard/admin/transactions", icon: Receipt },
  ],
};

const Sidebar = () => {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <aside className="w-64 min-h-screen bg-base-200 p-5">Loading...</aside>;
  }

  const role = session?.user?.role as keyof typeof menuItems | undefined;

  if (!role || !menuItems[role]) {
    return null;
  }

  return (
    <aside className="w-64 min-h-screen bg-base-200 p-5">
      <h2 className="text-2xl font-bold mb-8">FixMate</h2>

      <nav className="space-y-2">
        {menuItems[role].map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-primary text-primary-content"
                  : "hover:bg-base-300"
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;