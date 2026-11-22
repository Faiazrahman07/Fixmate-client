"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import API_URL from "@/lib/api";
import { toast } from "sonner";

import {
  CreditCard,
  Receipt,
  Banknote,
  Loader2,
  CalendarDays,
} from "lucide-react";

interface Payment {
  _id: string;
  bookingId: string;
  serviceTitle: string;
  customerEmail: string;
  customerName?: string;
  amount: number;
  currency?: string;
  transactionId: string;
  paymentStatus?: string;
  paymentDate?: string;
  paidAt?: string;
}

export default function AdminTransactionsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
      const tokenData = await authClient.token();

const token = tokenData.data?.token;

if (!token) {
  throw new Error("Authentication token not found");
}
        const res = await fetch(
          `${API_URL}/api/admin/payments`,
          {
            headers: {
            Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch payments");
        }

        const data = await res.json();

        setPayments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Admin Payments Error:", error);
        toast.error("Could not load transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

 
  const paidPayments = payments.filter(
    (payment) =>
      !payment.paymentStatus ||
      payment.paymentStatus === "paid"
  );

  
  const totalRevenue = paidPayments.reduce(
    (total, payment) =>
      total + Number(payment.amount || 0),
    0
  );

  
  const formatAmount = (
    amount: number,
    currency = "bdt"
  ) => {
    if (currency.toLowerCase() === "bdt") {
      return `৳${Number(amount).toLocaleString("en-BD", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount);
  };

  const formatDate = (date?: string) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-BD", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">

     
      <div>
        <h1 className="text-2xl font-bold">
          Transactions
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Monitor all customer payments and platform revenue.
        </p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Total Revenue */}
        <div className="bg-white rounded-xl border p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Revenue
              </p>

              <h2 className="text-2xl font-bold mt-2">
                {formatAmount(
                  totalRevenue,
                  paidPayments[0]?.currency || "bdt"
                )}
              </h2>
            </div>

            <div className="bg-green-100 text-green-600 p-3 rounded-lg">
              <Banknote size={24} />
            </div>

          </div>
        </div>

        {/* Total Transactions */}
        <div className="bg-white rounded-xl border p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Transactions
              </p>

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

    
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">

        <div className="p-5 border-b flex items-center gap-2">
          <CreditCard size={20} />

          <h2 className="font-semibold">
            Payment History
          </h2>
        </div>

        {loading ? (

          <div className="p-10 flex justify-center items-center gap-2 text-gray-500">
            <Loader2 className="animate-spin" size={20} />
            Loading transactions...
          </div>

        ) : paidPayments.length === 0 ? (

          <div className="p-10 text-center text-gray-500">
            <Receipt
              size={40}
              className="mx-auto mb-3 text-gray-400"
            />

            <h3 className="font-semibold text-lg">
              No Transactions Yet
            </h3>

            <p className="text-sm mt-1">
              Customer payments will appear here.
            </p>
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-sm text-left">

              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Payment Date</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y">

                {paidPayments.map((payment) => (

                  <tr
                    key={payment._id}
                    className="hover:bg-gray-50 transition"
                  >

                
                    <td className="p-4">
                      <p className="font-medium">
                        {payment.customerName || "Customer"}
                      </p>

                      <p className="text-xs text-gray-500">
                        {payment.customerEmail || "N/A"}
                      </p>
                    </td>

                    {/* Service */}
                    <td className="p-4">
                      <p className="font-medium">
                        {payment.serviceTitle || "N/A"}
                      </p>
                    </td>

         
                    <td className="p-4 font-semibold text-green-600">
                      {formatAmount(
                        Number(payment.amount || 0),
                        payment.currency || "bdt"
                      )}
                    </td>


                    <td className="p-4">
                      <span className="text-xs font-mono">
                        {payment.transactionId || "N/A"}
                      </span>
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <CalendarDays
                          size={15}
                          className="text-gray-400"
                        />

                        {formatDate(
                          payment.paymentDate || payment.paidAt
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
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
  );
}