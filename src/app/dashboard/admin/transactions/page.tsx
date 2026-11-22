"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CreditCard, DollarSign, Receipt } from "lucide-react";

interface Payment {
  _id: string;
  bookingId: string;
  serviceTitle: string;
  customerName: string;
  customerEmail: string;
  technicianName: string;
  technicianEmail: string;
  amount: number;
  currency: string;
  transactionId: string;
  paymentStatus: string;
  paidAt: string;
}

export default function AdminTransactionsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/payments");

        if (!res.ok) {
          throw new Error("Failed to fetch payments");
        }

        const data = await res.json();
        setPayments(data);
      } catch (error) {
        toast.error("Could not load transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const paidPayments = payments.filter(
    (payment) => payment.paymentStatus === "paid"
  );

  const totalRevenue = paidPayments.reduce(
    (total, payment) => total + Number(payment.amount || 0),
    0
  );

  const formatAmount = (amount: number, currency = "usd") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Transactions</h1>
        <p className="text-sm text-gray-500 mt-1">
          Monitor all customer payments and platform revenue.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h2 className="text-2xl font-bold mt-2">
                {formatAmount(totalRevenue)}
              </h2>
            </div>

            <div className="bg-green-100 text-green-600 p-3 rounded-lg">
              <DollarSign size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Transactions</p>
              <h2 className="text-2xl font-bold mt-2">
                {paidPayments.length}
              </h2>
            </div>

            <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
              <Receipt size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-5 border-b flex items-center gap-2">
          <CreditCard size={20} />
          <h2 className="font-semibold">Payment History</h2>
        </div>

        {loading ? (
          <div className="p-10 text-center text-gray-500">
            Loading transactions...
          </div>
        ) : paidPayments.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No transactions found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Technician</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Payment Date</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {paidPayments.map((payment) => (
                  <tr key={payment._id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <p className="font-medium">
                        {payment.customerName || "N/A"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {payment.customerEmail || "N/A"}
                      </p>
                    </td>

                    <td className="p-4">
                      <p className="font-medium">
                        {payment.technicianName || "N/A"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {payment.technicianEmail || "N/A"}
                      </p>
                    </td>

                    <td className="p-4">
                      {payment.serviceTitle || "N/A"}
                    </td>

                    <td className="p-4 font-semibold">
                      {formatAmount(
                        Number(payment.amount || 0),
                        payment.currency || "usd"
                      )}
                    </td>

                    <td className="p-4">
                      <span className="text-xs font-mono">
                        {payment.transactionId || "N/A"}
                      </span>
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      {payment.paidAt
                        ? new Date(payment.paidAt).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        {payment.paymentStatus}
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
  );
}