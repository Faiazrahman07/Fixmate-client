"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Check, X, Loader2 } from "lucide-react";

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

  const fetchServices = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/services");
      const data = await res.json();

      setServices(data);
    } catch {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleApproval = async (
    id: string,
    status: "approved" | "rejected"
  ) => {
    setUpdatingId(id);

    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/services/${id}/approval`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update service");
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
    } catch {
      toast.error("Something went wrong");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="animate-spin" size={35} />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Service Approval</h1>
        <p className="text-gray-500">
          Review and manage technician services.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-xl p-5">
          <p className="text-gray-500">Total Services</p>
          <h2 className="text-2xl font-bold">{services.length}</h2>
        </div>

        <div className="border rounded-xl p-5">
          <p className="text-gray-500">Pending</p>
          <h2 className="text-2xl font-bold text-yellow-600">
            {services.filter((s) => s.status === "pending").length}
          </h2>
        </div>

        <div className="border rounded-xl p-5">
          <p className="text-gray-500">Approved</p>
          <h2 className="text-2xl font-bold text-green-600">
            {services.filter((s) => s.status === "approved").length}
          </h2>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-4 text-left">Service</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Technician</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service) => (
              <tr key={service._id} className="border-t">
                <td className="p-4">
                  <div className="flex items-center gap-3 min-w-[200px]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <span className="font-medium">{service.title}</span>
                  </div>
                </td>

                <td className="p-4">{service.category}</td>

                <td className="p-4">৳{service.price}</td>

                <td className="p-4">{service.technicianEmail}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
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
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleApproval(service._id, "approved")
                      }
                      disabled={updatingId === service._id}
                      className="p-2 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
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
                      className="p-2 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                      title="Reject"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {services.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No services found.
          </div>
        )}
      </div>
    </div>
  );
}