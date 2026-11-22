"use client";

import { useEffect, useState } from "react";
import { Users, Wrench, ClipboardList } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

export default function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalTechnicians, setTotalTechnicians] = useState(0);
  const [pendingServices, setPendingServices] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: tokenData, error } = await authClient.token();

        if (error || !tokenData?.token) {
          throw new Error("Authentication token not found");
        }

        const headers = {
          Authorization: `Bearer ${tokenData.token}`,
        };

        const [usersRes, servicesRes] = await Promise.all([
          fetch("http://localhost:5000/api/admin/users", { headers }),
          fetch("http://localhost:5000/api/services", { headers }),
        ]);

        if (!usersRes.ok) {
          throw new Error("Failed to load users");
        }

        if (!servicesRes.ok) {
          throw new Error("Failed to load services");
        }

        const usersData = await usersRes.json();
        const servicesData = await servicesRes.json();

        const users = Array.isArray(usersData)
          ? usersData
          : usersData.users;

        const services = Array.isArray(servicesData)
          ? servicesData
          : servicesData.services;

        if (!Array.isArray(users) || !Array.isArray(services)) {
          throw new Error("Invalid API response format");
        }

        setTotalUsers(users.length);

        setTotalTechnicians(
          users.filter((user: any) => user.role === "technician").length
        );

        setPendingServices(
          services.filter(
            (service: any) => service.status === "pending"
          ).length
        );
      } catch (error) {
        console.error("Failed to fetch admin dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      description: "Registered users",
    },
    {
      title: "Total Technicians",
      value: totalTechnicians,
      icon: Wrench,
      description: "Registered technicians",
    },
    {
      title: "Pending Services",
      value: pendingServices,
      icon: ClipboardList,
      description: "Waiting for approval",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Overview</h1>
        <p className="text-muted-foreground">
          Manage and monitor your FixMate platform.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="text-3xl font-bold">
                  {loading ? "..." : stat.value}
                </div>

                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}