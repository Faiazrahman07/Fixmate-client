"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { CreditCard, CalendarDays, Receipt, Loader2 } from "lucide-react";

interface Payment {
  _id: string;
  bookingId: string;
  serviceTitle: string;
  amount: number;
  transactionId: string;
  paymentDate: string;
}

export default function CustomerPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data: tokenData, error } = await authClient.token();

        if (error || !tokenData?.token) {
          throw new Error("Authentication token not found");
        }

        const response = await fetch(
          "http://localhost:5000/api/payments/my",
          {
            headers: {
              Authorization: `Bearer ${tokenData.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch payment history");
        }

        const data = await response.json();
        setPayments(data);
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Payment History</h1>
        <p className="mt-1 text-sm text-base-content/60">
          View all your completed payments.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <p className="text-sm text-base-content/60">
                Total Payments
              </p>
              <Receipt className="text-primary" />
            </div>

            <h2 className="text-3xl font-bold">
              {payments.length}
            </h2>
          </div>
        </div>

        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <p className="text-sm text-base-content/60">
                Total Amount
              </p>
              <CreditCard className="text-primary" />
            </div>

            <h2 className="text-3xl font-bold">
              $
              {payments
                .reduce((total, payment) => total + payment.amount, 0)
                .toFixed(2)}
            </h2>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="mb-4 text-lg font-semibold">
            Transaction History
          </h2>

          {payments.length === 0 ? (
            <div className="py-12 text-center">
              <CreditCard className="mx-auto mb-3 h-12 w-12 text-base-content/30" />

              <h3 className="text-lg font-semibold">
                No Payments Yet
              </h3>

              <p className="mt-1 text-sm text-base-content/60">
                Your completed transactions will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Amount</th>
                    <th>Transaction ID</th>
                    <th>Payment Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment._id}>
                      <td className="font-medium">
                        {payment.serviceTitle}
                      </td>

                      <td className="font-semibold">
                        ${payment.amount.toFixed(2)}
                      </td>

                      <td>
                        <span className="text-xs">
                          {payment.transactionId || "N/A"}
                        </span>
                      </td>

                      <td>
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-base-content/50" />

                          {new Date(
                            payment.paymentDate
                          ).toLocaleDateString()}
                        </div>
                      </td>

                      <td>
                        <span className="badge badge-success">
                          Paid
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}