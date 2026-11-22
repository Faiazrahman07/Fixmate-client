"use client";

import { useSession } from "@/lib/auth-client";
import API_URL from "@/lib/api";
import { useEffect, useState } from "react";
import StatsCard from "@/components/Dashboard/StatsCard";

import {
  Wrench,
  ClipboardList,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const TechnicianDashboard = () => {
  const { data: session } = useSession();

const [totalServices, setTotalServices] = useState(0);

useEffect(() => {
  const fetchServices = async () => {
    if (!session?.user?.email) return;

    try {
      const response = await fetch(
        `${API_URL}/api/my-services/${session.user.email}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch services");
      }

      const data = await response.json();

      setTotalServices(data.length);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  fetchServices();
}, [session?.user?.email]);
  return (
    <div className="space-y-8">
      
      <div>
        <h1 className="text-3xl font-bold">Technician Dashboard</h1>
        <p className="text-base-content/60 mt-2">
          Manage your services, repair requests, and ongoing jobs.
        </p>
      </div>

  
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatsCard
          title="My Services"
          value={totalServices}
          icon={Wrench}
          description="Total services listed"
        />

        <StatsCard
          title="Pending Requests"
          value={0}
          icon={ClipboardList}
          description="Requests waiting for your response"
        />

        <StatsCard
          title="Active Jobs"
          value={0}
          icon={Clock}
          description="Repairs currently in progress"
        />

        <StatsCard
          title="Completed Jobs"
          value={0}
          icon={CheckCircle}
          description="Successfully completed repairs"
        />
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 border border-base-300 shadow-sm">
          <div className="card-body">
            <h2 className="text-xl font-bold">Manage Services</h2>

            <p className="text-base-content/60 text-sm">
              Add new repair services or manage your existing services.
            </p>

            <Link
              href="/dashboard/technician/my-services"
              className="btn btn-primary mt-4"
            >
              My Services <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className="card bg-base-100 border border-base-300 shadow-sm">
          <div className="card-body">
            <h2 className="text-xl font-bold">Repair Requests</h2>

            <p className="text-base-content/60 text-sm">
              Review customer requests and manage your repair jobs.
            </p>

            <Link
              href="/dashboard/technician/requests"
              className="btn btn-outline mt-4"
            >
              Manage Requests <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body">
          <h2 className="text-xl font-bold">Recent Repair Activity</h2>

          <div className="py-12 text-center">
            <ClipboardList
              size={48}
              className="mx-auto text-base-content/30"
            />

            <h3 className="font-semibold mt-4">No repair activity yet</h3>

            <p className="text-sm text-base-content/60 mt-2">
              Your repair requests and job activities will appear here.
            </p>

            <Link
              href="/dashboard/technician/requests"
              className="btn btn-primary btn-sm mt-5"
            >
              View Requests
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianDashboard;