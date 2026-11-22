
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2, Wrench, CalendarDays } from "lucide-react";
import { useSession, authClient } from "@/lib/auth-client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Service {
  _id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  image: string;
  technicianEmail: string;
}

const ServiceDetailsPage = () => {
  const params = useParams();
  const id = params.id as string;

  const { data: session, isPending } = useSession();

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const [checkingBooking, setCheckingBooking] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    address: "",
    preferredDate: "",
    problemDescription: "",
  });


  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/services/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch service");
        }

        const data = await response.json();
        setService(data);
      } catch (error) {
        console.error("Service Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);

  
  useEffect(() => {
    if (session?.user?.name) {
      setFormData((prev) => ({
        ...prev,
        customerName: session.user.name,
      }));
    }
  }, [session]);

  
  useEffect(() => {
    const checkBooking = async () => {
      if (isPending) return;

      if (!session?.user?.email || !id) {
        setCheckingBooking(false);
        return;
      }

      setCheckingBooking(true);

      try {
     const token = await authClient.token();

const response = await fetch(
  `http://localhost:5000/api/bookings/check/${id}/${encodeURIComponent(
    session.user.email
  )}`,
  {
    headers: {
      Authorization: `Bearer ${token.data?.token}`,
    },
  }
);
        if (!response.ok) {
          throw new Error("Failed to check booking");
        }

        const data = await response.json();
        setAlreadyBooked(data.alreadyBooked);
      } catch (error) {
        console.error("Booking Check Error:", error);
      } finally {
        setCheckingBooking(false);
      }
    };

    checkBooking();
  }, [id, session?.user?.email, isPending]);

  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!service || !session?.user?.email) {
      alert("Please sign in before booking.");
      return;
    }

    setBookingLoading(true);

    const bookingData = {
      serviceId: service._id,
      serviceTitle: service.title,
      serviceImage: service.image,
      category: service.category,
      basePrice: service.price,

      technicianEmail: service.technicianEmail,

      customerName: formData.customerName,
      customerEmail: session.user.email,
      customerPhone: formData.customerPhone,
      address: formData.address,
      preferredDate: formData.preferredDate,
      problemDescription: formData.problemDescription,

      status: "requested",
      finalAmount: service.price,
      paymentStatus: "unpaid",
    };

    try {
    const token = await authClient.token();

const response = await fetch("http://localhost:5000/api/bookings", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token.data?.token}`,
  },
  body: JSON.stringify(bookingData),
});

      const result = await response.json();

      if (response.ok) {
        alert("Booking successful!");

        setAlreadyBooked(true);
        setDialogOpen(false);

        setFormData({
          customerName: session.user.name || "",
          customerPhone: "",
          address: "",
          preferredDate: "",
          problemDescription: "",
        });
      } else {
        alert(result.message || "Booking failed!");
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Something went wrong!");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading || isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold">Service Not Found</h2>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">

    
        <div>
          <img
            src={service.image}
            alt={service.title}
            className="h-[350px] w-full rounded-2xl object-cover"
          />
        </div>

        
        <div className="space-y-6">
          <div>
            <span className="text-sm font-medium text-blue-600">
              {service.category}
            </span>

            <h1 className="mt-2 text-3xl font-bold">
              {service.title}
            </h1>

            <p className="mt-4 text-2xl font-bold text-blue-600">
              ৳{service.price}
            </p>
          </div>

          <p className="leading-7 text-gray-600">
            {service.description}
          </p>

          <Card>
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center gap-3">
                <Wrench className="text-blue-600" />

                <div>
                  <p className="text-sm text-gray-500">
                    Service Provider
                  </p>

                  <p className="font-medium">
                    {service.technicianEmail}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CalendarDays className="text-blue-600" />

                <div>
                  <p className="text-sm text-gray-500">
                    Booking
                  </p>

                  <p className="font-medium">
                    Choose your preferred date
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        
          {checkingBooking ? (
            <Button disabled className="w-full h-12">
              <Loader2 className="mr-2 size-4 animate-spin" />
              Checking...
            </Button>
          ) : alreadyBooked ? (
            <Button disabled className="w-full h-12">
              Already Booked
            </Button>
          ) : (
            <Button
              onClick={() => setDialogOpen(true)}
              className="h-12 w-full bg-blue-600 text-base hover:bg-blue-700"
            >
              Book Now
            </Button>
          )}
        </div>
      </div>

  
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">

          <DialogHeader>
            <DialogTitle className="text-xl">
              Book Your Service
            </DialogTitle>

            <DialogDescription>
              Fill in the details to request this repair service.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-lg bg-blue-50 p-3">
            <p className="font-semibold text-gray-900">
              {service.title}
            </p>

            <p className="mt-1 text-sm text-blue-600">
              Base Price: ৳{service.price}
            </p>
          </div>

          <form onSubmit={handleBooking} className="space-y-4">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Customer Name
              </label>

              <Input
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone Number
              </label>

              <Input
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Address
              </label>

              <Input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Preferred Date
              </label>

              <Input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Describe Your Problem
              </label>

              <Textarea
                name="problemDescription"
                value={formData.problemDescription}
                onChange={handleChange}
                placeholder="Explain your repair problem..."
                rows={4}
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                disabled={bookingLoading}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={bookingLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {bookingLoading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Booking...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceDetailsPage;