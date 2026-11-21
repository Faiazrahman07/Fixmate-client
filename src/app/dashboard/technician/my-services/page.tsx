"use client";

import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { Wrench, PlusCircle, Loader2 } from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Service {
  _id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  image: string;
  status: "pending" | "approved" | "rejected";
  available: boolean;
}

const MyServicesPage = () => {
  const { data: session } = useSession();

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      if (!session?.user?.email) return;

      try {
        const response = await fetch(
          `http://localhost:5000/api/my-services/${session.user.email}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [session?.user?.email]);

  const getStatusVariant = (status: Service["status"]) => {
    switch (status) {
      case "approved":
        return "default";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Services</h1>
          <p className="text-muted-foreground mt-2">
            Manage and monitor all your repair services.
          </p>
        </div>

        <Button asChild>
          <Link href="/dashboard/technician/add-service">
           <div className="flex h-5 w-40 items-center gap-2">
  <PlusCircle className="h-4 w-4 shrink-0" />
  <span className="whitespace-nowrap">Add New Service</span>
</div>
          </Link>
        </Button>
      </div>

   
      {loading && (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

  
      {!loading && services.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-20 text-center">
            <Wrench className="h-12 w-12 text-muted-foreground mb-4" />

            <h2 className="text-xl font-semibold">No Services Found</h2>

            <p className="text-muted-foreground mt-2">
              You haven't added any repair services yet.
            </p>

            <Button asChild className="mt-6">
              <Link href="/dashboard/technician/add-service">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Your First Service
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Services Grid */}
      {!loading && services.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card
              key={service._id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              
              <div className="h-52 bg-muted overflow-hidden">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Wrench className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>

              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold leading-tight">
                    {service.title}
                  </h2>

                  <Badge
                    variant={getStatusVariant(service.status)}
                    className="capitalize shrink-0"
                  >
                    {service.status}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground">
                  {service.category}
                </p>
              </CardHeader>

              <CardContent className="space-y-3">
                <p className="text-xl font-bold text-primary">
                  ৳{service.price.toLocaleString("en-BD")}
                </p>

                <p className="text-sm text-muted-foreground line-clamp-3">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyServicesPage;