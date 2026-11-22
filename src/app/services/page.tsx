
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, ArrowRight, Search } from "lucide-react";

interface Service {
  _id: string;
  title?: string;
  serviceTitle?: string;
  name?: string;
  category: string;
  basePrice?: number;
  price?: number;
  displayPrice?: number;
  description: string;
  image: string;
  serviceMode: string;
}

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all";
  const serviceMode = searchParams.get("serviceMode") || "all";
  const sort = searchParams.get("sort") || "default";

  useEffect(() => {
    setSearchText(search);
  }, [search]);

  // Search debounce and URL update
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchText.trim()) {
        params.set("search", searchText.trim());
      } else {
        params.delete("search");
      }

      const query = params.toString();

      router.replace(query ? `/services?${query}` : "/services");
    }, 400);

    return () => clearTimeout(timer);
  }, [searchText]);


  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);

      try {
        const params = new URLSearchParams();

        if (searchText.trim()) {
          params.set("search", searchText.trim());
        }

        if (category !== "all") {
          params.set("category", category);
        }

        if (serviceMode !== "all") {
          params.set("serviceMode", serviceMode);
        }

        if (sort !== "default") {
          params.set("sort", sort);
        }

        const response = await fetch(
          `http://localhost:5000/api/services?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Services Fetch Error:", error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [searchText, category, serviceMode, sort]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "all" && value !== "default") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    const query = params.toString();

    router.push(query ? `/services?${query}` : "/services");
  };

  const formatPrice = (service: Service) => {
    const price = service.displayPrice ?? service.basePrice ?? service.price;

    if (price === undefined || price === null) {
      return "Price unavailable";
    }

    return `৳${Number(price).toLocaleString("en-BD")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Our Repair Services
          </h1>

          <p className="mt-3 text-gray-600">
            Find the right repair service for your devices and home appliances.
          </p>
        </div>

      
        <div className="mb-8 grid grid-cols-1 gap-4 rounded-xl border bg-white p-5 shadow-sm md:grid-cols-2 lg:grid-cols-4">

          
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search services..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full rounded-lg border py-3 pl-10 pr-4 outline-none focus:border-blue-500"
            />
          </div>

          <select
            value={category}
            onChange={(e) => updateFilter("category", e.target.value)}
            className="rounded-lg border bg-white px-4 py-3 outline-none focus:border-blue-500"
          >
      <option value="all">All Categories</option>
<option value="Electronics">Electronics</option>
<option value="Home Appliance">Home Appliance</option>
<option value="Networking">Networking</option>
          </select>

          <select
            value={serviceMode}
            onChange={(e) => updateFilter("serviceMode", e.target.value)}
            className="rounded-lg border bg-white px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="all">All Service Modes</option>
            <option value="Home Visit">Home Visit</option>
            <option value="Shop Drop-off">Shop Drop-off</option>
          </select>


          <select
            value={sort}
            onChange={(e) => updateFilter("sort", e.target.value)}
            className="rounded-lg border bg-white px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="default">Default Sorting</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        
        {loading ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <Loader2 className="size-8 animate-spin text-blue-600" />
          </div>
        ) : services.length === 0 ? (
          <div className="rounded-xl border bg-white py-16 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              No Services Found
            </h2>

            <p className="mt-2 text-gray-500">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {services.map((service) => (
              <div
                key={service._id}
                className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="h-56 overflow-hidden bg-gray-100">
                  <img
                    src={service.image}
                    alt={service.title || service.serviceTitle || "Service"}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                    {service.category}
                  </span>

                  <h2 className="mt-3 text-xl font-semibold text-gray-900">
                    {service.title || service.serviceTitle || service.name}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
                    {service.description}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    {service.serviceMode}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">
                        Starting Price
                      </p>

                      <p className="text-xl font-bold text-blue-600">
                        {formatPrice(service)}
                      </p>
                    </div>

                    <Link
                      href={`/services/${service._id}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                      View Details
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
