
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  CalendarDays,
  Loader2,
  Wrench,
  XCircle,
  CreditCard,
} from "lucide-react";
import { useSession, authClient } from "@/lib/auth-client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Booking {
  _id: string;
  serviceTitle: string;
  serviceImage: string;
  category: string;
  basePrice: number;
  finalAmount: number;
  technicianName: string;
  preferredDate: string;
  status: string;
  paymentStatus: string;
}

const Page = () => {
  const { data: session, isPending } = useSession();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState("");
  const [paymentLoading, setPaymentLoading] = useState("");

  // Fetch Customer Bookings
  useEffect(() => {
    const fetchBookings = async () => {
      if (isPending) return;

      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      try {
        const { data: tokenData, error } = await authClient.token();

        if (error || !tokenData?.token) {
          throw new Error("JWT token not found");
        }

        const response = await fetch(
          "http://localhost:5000/api/bookings/my",
          {
            headers: {
              Authorization: `Bearer ${tokenData.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Booking Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [session, isPending]);

  // Cancel Booking
  const handleCancel = async (id: string) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    setCancelLoading(id);

    try {
      const { data: tokenData, error } = await authClient.token();

      if (error || !tokenData?.token) {
        throw new Error("JWT token not found");
      }

      const response = await fetch(
        `http://localhost:5000/api/bookings/${id}/cancel`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel booking");
      }

      const result = await response.json();

      if (result.result?.modifiedCount > 0) {
        setBookings((previousBookings) =>
          previousBookings.map((booking) =>
            booking._id === id
              ? { ...booking, status: "cancelled" }
              : booking
          )
        );

        alert("Booking cancelled successfully!");
      } else {
        alert("This booking cannot be cancelled.");
      }
    } catch (error) {
      console.error("Cancel Booking Error:", error);
      alert("Failed to cancel booking. Please try again.");
    } finally {
      setCancelLoading("");
    }
  };

  // Stripe Checkout
  const handlePayment = async (bookingId: string) => {
    setPaymentLoading(bookingId);

    try {
      const { data: tokenData, error } = await authClient.token();

      if (error || !tokenData?.token) {
        throw new Error("JWT token not found");
      }

      const response = await fetch(
        "http://localhost:5000/api/payments/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenData.token}`,
          },
          body: JSON.stringify({ bookingId }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create checkout session");
      }

      if (!result.url) {
        throw new Error("Stripe checkout URL not found");
      }

      // Redirect to Stripe Checkout
      window.location.href = result.url;
    } catch (error) {
      console.error("Payment Error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Unable to start payment. Please try again."
      );
    } finally {
      setPaymentLoading("");
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <p className="text-muted-foreground mt-1">
          Track all your repair service requests.
        </p>
      </div>

      {bookings.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Wrench className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-lg font-semibold">No Bookings Yet</h2>
            <p className="text-muted-foreground mt-2">
              You haven't requested any repair services yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {bookings.map((booking) => (
            <Card key={booking._id} className="overflow-hidden">
              <CardContent className="p-5">
                <div className="flex gap-4">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
                    {booking.serviceImage && (
                      <Image
                        src={booking.serviceImage}
                        alt={booking.serviceTitle}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-lg">
                      {booking.serviceTitle}
                    </h2>

                    <p className="text-sm text-muted-foreground">
                      {booking.category}
                    </p>

                    <p className="text-sm mt-2">
                      Technician: {booking.technicianName || booking.technicianEmail}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-5 text-sm">
                  <div>
                    <p className="text-muted-foreground">Preferred Date</p>
                    <p className="font-medium flex items-center gap-1 mt-1">
                      <CalendarDays size={15} />
                      {new Date(booking.preferredDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Amount</p>
                    <p className="font-semibold mt-1">
                      ৳
                      {booking.status === "completed"
                        ? booking.finalAmount
                        : booking.basePrice}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-5 pt-4 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Booking Status
                    </p>
                    <span className="capitalize text-sm font-medium text-blue-600">
                      {booking.status}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Payment Status
                    </p>
                    <span
                      className={`capitalize text-sm font-medium ${
                        booking.paymentStatus === "paid"
                          ? "text-green-600"
                          : "text-orange-600"
                      }`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </div>
                </div>

                {booking.status === "requested" && (
                  <div className="mt-4 pt-4 border-t">
                    <Button
                      variant="destructive"
                      className="w-full"
                      disabled={cancelLoading === booking._id}
                      onClick={() => handleCancel(booking._id)}
                    >
                      {cancelLoading === booking._id ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <XCircle className="h-4 w-4 mr-2" />
                      )}

                      {cancelLoading === booking._id
                        ? "Cancelling..."
                        : "Cancel Booking"}
                    </Button>
                  </div>
                )}

            
                {booking.status === "completed" &&
                  booking.paymentStatus !== "paid" && (
                    <div className="mt-4 pt-4 border-t">
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={paymentLoading === booking._id}
                        onClick={() => handlePayment(booking._id)}
                      >
                        {paymentLoading === booking._id ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <CreditCard className="h-4 w-4 mr-2" />
                        )}

                        {paymentLoading === booking._id
                          ? "Redirecting to Payment..."
                          : "Pay Now"}
                      </Button>
                    </div>
                  )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
);
};

export default Page;