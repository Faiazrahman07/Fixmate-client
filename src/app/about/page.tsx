import {
  Target,
  ShieldCheck,
  Clock,
  Users,
  Wrench,
  HeartHandshake,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            About FixMate
          </span>

          <h1 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-6xl">
            Making Repairs
            <span className="block text-blue-600">
              Simple & Reliable
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            FixMate connects customers with skilled technicians to make
            electronics and home appliance repairs easier, faster, and
            more reliable.
          </p>
        </div>
      </section>

     
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div>
          <span className="font-semibold text-blue-600">OUR STORY</span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
            Your Problems, Our Solutions.
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            Finding a trustworthy repair technician can be difficult.
            FixMate was created to make this process easier by connecting
            customers with professional technicians through one platform.
          </p>

          <p className="mt-4 leading-8 text-gray-600">
            Whether it is a laptop, smartphone, air conditioner, or
            household appliance, our goal is to help customers find the
            right repair service without unnecessary hassle.
          </p>
        </div>

        <div className="flex min-h-[320px] items-center justify-center rounded-3xl bg-blue-600 p-10 text-center text-white shadow-xl">
          <div>
            <Wrench className="mx-auto" size={70} />

            <h3 className="mt-6 text-4xl font-bold">FixMate</h3>

            <p className="mt-3 text-blue-100">
              Reliable Repair Service Platform
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="font-semibold text-blue-600">
              WHAT DRIVES US
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              Our Mission & Vision
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <Target className="text-blue-600" size={40} />

              <h3 className="mt-5 text-2xl font-bold text-gray-900">
                Our Mission
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                To make repair services accessible, convenient, and
                trustworthy by connecting customers with skilled
                technicians.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <HeartHandshake className="text-blue-600" size={40} />

              <h3 className="mt-5 text-2xl font-bold text-gray-900">
                Our Vision
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                To become a trusted platform where everyone can easily
                find reliable repair solutions for their everyday needs.
              </p>
            </div>
          </div>
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Why Choose FixMate?
          </h2>

          <p className="mt-3 text-gray-600">
            We focus on making every repair experience better.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: ShieldCheck,
              title: "Trusted Technicians",
              description:
                "Connect with technicians through our service platform.",
            },
            {
              icon: Clock,
              title: "Quick Service",
              description:
                "Find suitable repair services without unnecessary delays.",
            },
            {
              icon: Users,
              title: "Customer Focused",
              description:
                "We aim to make the booking experience simple and convenient.",
            },
            {
              icon: Wrench,
              title: "Multiple Services",
              description:
                "Explore repair solutions for electronics and home appliances.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-100 p-7 text-center transition hover:-translate-y-1 hover:shadow-lg"
            >
              <item.icon
                className="mx-auto text-blue-600"
                size={42}
              />

              <h3 className="mt-5 font-bold text-gray-900">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}