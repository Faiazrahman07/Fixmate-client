import StatsCard from "@/components/Dashboard/StatsCard";
import { CalendarDays, Clock, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const CustomerDashboard = () => {
  return (
    <div className="space-y-8">


      <div>
        <h1 className="text-3xl font-bold">Customer Dashboard</h1>
        <p className="text-base-content/60 mt-2">
          Welcome back! Manage your repair requests from here.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        <StatsCard
          title="Total Requests"
          value={0}
          icon={CalendarDays}
          description="All your repair requests"
        />

        <StatsCard
          title="Active Jobs"
          value={0}
          icon={Clock}
          description="Currently ongoing repairs"
        />

        <StatsCard
          title="Completed Jobs"
          value={0}
          icon={CheckCircle}
          description="Successfully completed repairs"
        />
      </div>

      {/* Recent Bookings */}
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body">

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Recent Bookings</h2>

            <Link
              href="/dashboard/customer/bookings"
              className="btn btn-ghost btn-sm text-primary"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>

          {/* Empty State */}
          <div className="py-12 text-center">
            <CalendarDays size={48} className="mx-auto text-base-content/30" />

            <h3 className="font-semibold mt-4">No bookings yet</h3>

            <p className="text-sm text-base-content/60 mt-2">
              You haven't requested any repair services yet.
            </p>

            <Link href="/services" className="btn btn-primary btn-sm mt-5">
              Browse Services
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default CustomerDashboard;