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
  finalAmount?: number;
  paymentStatus?: string;
}

export default function ManageRequestsPage() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const handleStatusUpdate = async (
    id: string,
    status: string,
    finalAmount?: number
  ) => {
    const updateData: { status: string; finalAmount?: number } = { status };

    if (finalAmount !== undefined) {
      updateData.finalAmount = finalAmount;
    }

    const res = await fetch(
      `http://localhost:5000/api/bookings/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      }
    );

    if (res.ok) {
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === id
            ? {
                ...booking,
                status,
                ...(finalAmount !== undefined && { finalAmount }),
              }
            : booking
        )
      );
    } else {
      alert("Failed to update booking status!");
    }
  };

  const handleComplete = (booking: Booking) => {
    const amount = prompt(
      `Enter final amount (Base price: ${booking.basePrice}):`,
      String(booking.basePrice)
    );

    if (amount === null || amount.trim() === "") return;

    const finalAmount = Number(amount);

    if (isNaN(finalAmount) || finalAmount < 0) {
      alert("Please enter a valid amount!");
      return;
    }

    handleStatusUpdate(booking._id, "completed", finalAmount);
  };

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
            <div
              key={booking._id}
              className="border rounded-xl p-5 space-y-2"
            >
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
                <strong>Base Price:</strong> ৳{booking.basePrice}
              </p>

              {booking.status === "completed" && (
                <p>
                  <strong>Final Amount:</strong> ৳{booking.finalAmount}
                </p>
              )}

              <p>
                <strong>Status:</strong>{" "}
                <span className="capitalize">{booking.status}</span>
              </p>

              {booking.status === "requested" && (
                <div className="flex gap-3 pt-3">
                  <button
                    onClick={() =>
                      handleStatusUpdate(booking._id, "accepted")
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      handleStatusUpdate(booking._id, "rejected")
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Reject
                  </button>
                </div>
              )}

              {booking.status === "accepted" && (
                <button
                  onClick={() =>
                    handleStatusUpdate(booking._id, "in-progress")
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-3"
                >
                  Start Work
                </button>
              )}

              {booking.status === "in-progress" && (
                <button
                  onClick={() => handleComplete(booking)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg mt-3"
                >
                  Mark Completed
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}