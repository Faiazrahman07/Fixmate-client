"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

interface Booking {
  _id: string;
  serviceTitle: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  preferredDate: string;
  problemDescription: string;
  status: string;
  basePrice: number;
}

export default function ManageRequestsPage() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!session?.user?.email) return;

    fetch(
      `http://localhost:5000/api/bookings/technician/${session.user.email}`
    )
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .finally(() => setLoading(false));
  }, [session]);

  const filteredBookings = bookings.filter((booking) =>
    filter === "all" ? true : booking.status === filter
  );

  if (loading) {
    return <p className="text-center py-10">Loading requests...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Requests</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {[
          "all",
          "requested",
          "accepted",
          "in-progress",
          "completed",
          "rejected",
        ].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg border capitalize ${
              filter === status
                ? "bg-primary text-primary-foreground"
                : "bg-background"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {filteredBookings.length === 0 ? (
        <p>No booking requests found.</p>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking._id} className="border rounded-xl p-5 space-y-2">
              <h2 className="text-xl font-semibold">{booking.serviceTitle}</h2>

              <p>
                <strong>Customer:</strong> {booking.customerName}
              </p>

              <p>
                <strong>Phone:</strong> {booking.customerPhone}
              </p>

              <p>
                <strong>Address:</strong> {booking.address}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(booking.preferredDate).toLocaleDateString()}
              </p>

              <p>
                <strong>Problem:</strong> {booking.problemDescription}
              </p>

              <p>
                <strong>Price:</strong> ৳{booking.basePrice}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className="capitalize">{booking.status}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}