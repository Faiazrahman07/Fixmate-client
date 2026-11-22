"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Check, X, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface Service {
  _id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  image: string;
  technicianEmail: string;
  status: "pending" | "approved" | "rejected";
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Fetch all services
  const fetchServices = async () => {
    try {
      const { data: tokenData, error } = await authClient.token();

      if (error || !tokenData?.token) {
        throw new Error("Authentication token not found");
      }

      const res = await fetch(
        "http://localhost:5000/api/admin/services",
        {
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load services");
      }

      setServices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch Services Error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to load services"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Approve or reject service
  const handleApproval = async (
    id: string,
    status: "approved" | "rejected"
  ) => {
    setUpdatingId(id);

    try {
      const { data: tokenData, error } = await authClient.token();

      if (error || !tokenData?.token) {
        throw new Error("Authentication token not found");
      }

      const res = await fetch(
        `http://localhost:5000/api/admin/services/${id}/approval`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenData.token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update service");
      }

      setServices((prev) =>
        prev.map((service) =>
          service._id === id ? { ...service, status } : service
        )
      );

      toast.success(
        status === "approved"
          ? "Service approved successfully"
          : "Service rejected successfully"
      );
    } catch (error) {
      console.error("Service Approval Error:", error);

      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const pendingServices = services.filter(
    (service) => service.status === "pending"
  );

  const approvedServices = services.filter(
    (service) => service.status === "approved"
  );

  const rejectedServices = services.filter(
    (service) => service.status === "rejected"
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-60">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Manage Services</h1>
        <p className="text-gray-500">
          Review, approve, or reject technician services.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border p-5">
          <p className="text-sm text-gray-500">Pending Services</p>
          <h2 className="text-2xl font-bold">{pendingServices.length}</h2>
        </div>

        <div className="rounded-lg border p-5">
          <p className="text-sm text-gray-500">Approved Services</p>
          <h2 className="text-2xl font-bold">{approvedServices.length}</h2>
        </div>

        <div className="rounded-lg border p-5">
          <p className="text-sm text-gray-500">Rejected Services</p>
          <h2 className="text-2xl font-bold">{rejectedServices.length}</h2>
        </div>
      </div>

      {/* Services Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Service</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Technician</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {services.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  No services found.
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr key={service._id} className="border-t">
                  <td className="p-4 font-medium">
                    {service.title}
                  </td>

                  <td className="p-4">{service.category}</td>

                  <td className="p-4">${service.price}</td>

                  <td className="p-4">{service.technicianEmail}</td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        service.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : service.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {service.status}
                    </span>
                  </td>

                  <td className="p-4">
                    {service.status === "pending" ? (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            handleApproval(service._id, "approved")
                          }
                          disabled={updatingId === service._id}
                          className="rounded bg-green-600 p-2 text-white disabled:opacity-50"
                          title="Approve"
                        >
                          {updatingId === service._id ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <Check size={16} />
                          )}
                        </button>

                        <button
                          onClick={() =>
                            handleApproval(service._id, "rejected")
                          }
                          disabled={updatingId === service._id}
                          className="rounded bg-red-600 p-2 text-white disabled:opacity-50"
                          title="Reject"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400">No action</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}