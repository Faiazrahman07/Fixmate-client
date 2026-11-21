"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Wrench, PlusCircle } from "lucide-react";

const AddServicePage = () => {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session?.user?.email) {
      alert("Please login first!");
      return;
    }

    setLoading(true);

    try {
      const serviceData = {
        ...formData,
        price: Number(formData.price),
        technicianEmail: session.user.email,
        status: "pending",
        available: true,
      };

      const response = await fetch("http://localhost:5000/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      });

      if (!response.ok) {
        throw new Error("Failed to add service");
      }

      const result = await response.json();

      console.log("Service added successfully:", result);

      alert("Service submitted successfully! Waiting for admin approval.");

      setFormData({
        title: "",
        category: "",
        price: "",
        description: "",
        image: "",
      });
    } catch (error) {
      console.error("Error adding service:", error);
      alert("Failed to add service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-primary/10 text-primary">
            <Wrench size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">Add New Service</h1>
            <p className="text-base-content/60 mt-1">
              Create a new repair service for your customers.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Service Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Service Title</span>
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Laptop Repair"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Category */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Category</span>
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="select select-bordered w-full"
                required
              >
                <option value="">Select a category</option>
                <option value="Electronics">Electronics</option>
                <option value="Mobile">Mobile</option>
                <option value="Laptop">Laptop</option>
                <option value="Desktop">Desktop</option>
                <option value="Home Appliance">Home Appliance</option>
                <option value="Television">Television</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Price */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Starting Price (৳)</span>
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter starting price"
                className="input input-bordered w-full"
                min="1"
                required
              />
            </div>

            {/* Image */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Service Image URL</span>
              </label>

              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="input input-bordered w-full"
              />
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Description</span>
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your repair service..."
                className="textarea textarea-bordered w-full min-h-32"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Submitting...
                </>
              ) : (
                <>
                  <PlusCircle size={20} />
                  Add Service
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddServicePage;