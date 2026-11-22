"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface Booking {
  _id: string;
  serviceTitle: string;
  customerName: string;
  customerEmail: string;
  technicianName: string;
  technicianEmail: string;
  preferredDate: string;
  status: string;
  paymentStatus: string;
  basePrice: number;
  finalAmount?: number;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/bookings");
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === filter);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "accepted":
        return "bg-blue-100 text-blue-700";
      case "in-progress":
        return "bg-purple-100 text-purple-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "cancelled":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="animate-spin" size={35} />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">All Bookings</h1>
        <p className="text-gray-500">
          Monitor all customer bookings across FixMate.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-5">
          <p className="text-gray-500">Total Bookings</p>
          <h2 className="text-2xl font-bold">{bookings.length}</h2>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-gray-500">Pending</p>
          <h2 className="text-2xl font-bold text-yellow-600">
            {bookings.filter((b) => b.status === "requested").length}
          </h2>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-gray-500">Completed</p>
          <h2 className="text-2xl font-bold text-green-600">
            {bookings.filter((b) => b.status === "completed").length}
          </h2>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-gray-500">Cancelled</p>
          <h2 className="text-2xl font-bold text-red-600">
            {bookings.filter((b) => b.status === "cancelled").length}
          </h2>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap items-center gap-3">
        <label className="font-medium">Filter by status:</label>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border bg-background px-4 py-2 outline-none"
        >
          <option value="all">All Bookings</option>
          <option value="requested">Requested</option>
          <option value="accepted">Accepted</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-4 text-left">Service</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Technician</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Booking Status</th>
              <th className="p-4 text-left">Payment</th>
              <th className="p-4 text-left">Amount</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking._id} className="border-t">
                <td className="p-4 font-medium">
                  {booking.serviceTitle || "N/A"}
                </td>

                <td className="p-4">
                  <div>{booking.customerName || "N/A"}</div>
                  <div className="text-xs text-gray-500">
                    {booking.customerEmail}
                  </div>
                </td>

                <td className="p-4">
                  <div>{booking.technicianName || "N/A"}</div>
                  <div className="text-xs text-gray-500">
                    {booking.technicianEmail}
                  </div>
                </td>

                <td className="p-4 whitespace-nowrap">
                  {booking.preferredDate
                    ? new Date(booking.preferredDate).toLocaleDateString()
                    : "N/A"}
                </td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      booking.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {booking.paymentStatus || "unpaid"}
                  </span>
                </td>

                <td className="p-4 whitespace-nowrap font-medium">
                  ৳{booking.finalAmount ?? booking.basePrice ?? 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredBookings.length === 0 && (
          <div className="py-10 text-center text-gray-500">
            No bookings found.
          </div>
        )}
      </div>
    </div>
  );
}