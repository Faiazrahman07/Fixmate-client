"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    alert(
      "Contact form UI is ready! Connect a backend API to send messages."
    );
  };

  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-16 text-center">
        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          Contact Us
        </span>

        <h1 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
          Get In Touch With
          <span className="block text-blue-600">FixMate</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-gray-600">
          Have a question or need assistance? We would love to hear
          from you. Send us a message.
        </p>
      </section>

      {/* Contact Content */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-5">
        {/* Contact Information */}
        <div className="rounded-3xl bg-blue-600 p-8 text-white lg:col-span-2">
          <h2 className="text-2xl font-bold">
            Contact Information
          </h2>

          <p className="mt-4 leading-7 text-blue-100">
            Feel free to reach out to us for any questions,
            service inquiries, or support.
          </p>

          <div className="mt-10 space-y-8">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-white/15 p-3">
                <Mail size={23} />
              </div>

              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="mt-1 text-sm text-blue-100">
                  Contact email coming soon
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-white/15 p-3">
                <Phone size={23} />
              </div>

              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="mt-1 text-sm text-blue-100">
                  Phone number coming soon
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-white/15 p-3">
                <MapPin size={23} />
              </div>

              <div>
                <h3 className="font-semibold">Location</h3>
                <p className="mt-1 text-sm text-blue-100">
                  Bangladesh
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-white/15 p-3">
                <Clock size={23} />
              </div>

              <div>
                <h3 className="font-semibold">Support Hours</h3>
                <p className="mt-1 text-sm text-blue-100">
                  Support information coming soon
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-3xl bg-white p-8 shadow-sm lg:col-span-3">
          <h2 className="text-2xl font-bold text-gray-900">
            Send Us a Message
          </h2>

          <p className="mt-2 text-gray-500">
            Fill out the form below and let us know how we can help.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Your Name
                </label>

                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Subject
              </label>

              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subject: e.target.value,
                  })
                }
                placeholder="What is this about?"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Your Message
              </label>

              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    message: e.target.value,
                  })
                }
                placeholder="Write your message here..."
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Send Message
              <Send size={18} />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}