"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface Payment {
  amount: number;
  transactionId: string;
  message: string;
}

export default function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Verifying your payment...");
  const [payment, setPayment] = useState<Payment | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (!sessionId) {
          throw new Error("Payment session ID not found");
        }

        const { data: tokenData, error } = await authClient.token();

        if (error || !tokenData?.token) {
          throw new Error("Authentication token not found");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/payments/verify?session_id=${encodeURIComponent(sessionId)}`,
          {
            headers: {
              Authorization: `Bearer ${tokenData.token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Payment verification failed");
        }

        setPayment(data);
        setMessage(data.message);
      } catch (error: unknown) {
        setMessage(
          error instanceof Error
            ? error.message
            : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="max-w-md w-full rounded-xl shadow-lg p-8 text-center">
        {loading ? (
          <h2 className="text-xl font-semibold">{message}</h2>
        ) : payment ? (
          <>
            <div className="text-5xl mb-4">✅</div>

            <h1 className="text-2xl font-bold text-green-600">
              Payment Successful!
            </h1>

            <p className="mt-3">{message}</p>

            <div className="mt-6 text-left space-y-2">
              <p>
                <strong>Amount:</strong> ৳{payment.amount}
              </p>

              <p>
                <strong>Transaction ID:</strong> {payment.transactionId}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="text-4xl mb-4">❌</div>

            <h1 className="text-2xl font-bold text-red-600">
              Payment Verification Failed
            </h1>

            <p className="mt-3">{message}</p>
          </>
        )}
      </div>
    </div>
  );
}