import Link from "next/link";
import {
  ArrowRight,
  Wrench,
  ShieldCheck,
  Clock,
  BadgeCheck,
  House,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
    
      <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute -bottom-40 -left-32 h-[400px] w-[400px] rounded-full bg-blue-100/60 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
      
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            <Wrench size={16} />
            Fast, Reliable & Professional
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            Your Trusted
            <span className="block text-blue-600">Repair Partner</span>
            for Everyday Problems
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            From electronics to home appliances, FixMate connects you with
            skilled technicians to get things fixed quickly, reliably,
            and right at your doorstep.
          </p>

      
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Book a Service
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-800 transition hover:border-blue-500 hover:text-blue-600"
            >
              Learn More
            </Link>
          </div>

        
          <div className="mt-12 grid grid-cols-3 gap-4 border-t border-blue-100 pt-6">
            <div>
              <ShieldCheck className="mb-2 text-blue-600" size={25} />
              <p className="text-sm font-semibold text-gray-800">
                Trusted
                <span className="block text-gray-500 font-normal">
                  Technicians
                </span>
              </p>
            </div>

            <div>
              <Clock className="mb-2 text-blue-600" size={25} />
              <p className="text-sm font-semibold text-gray-800">
                Quick
                <span className="block text-gray-500 font-normal">
                  Service
                </span>
              </p>
            </div>

            <div>
              <House className="mb-2 text-blue-600" size={25} />
              <p className="text-sm font-semibold text-gray-800">
                Doorstep
                <span className="block text-gray-500 font-normal">
                  Repair
                </span>
              </p>
            </div>
          </div>
        </div>

      
        <div className="relative flex items-center justify-center">
          <div className="absolute h-[350px] w-[350px] rounded-full bg-blue-200/70 md:h-[450px] md:w-[450px]" />

          
          <div className="relative z-10 flex h-[400px] w-full items-center justify-center rounded-3xl border border-white/70 bg-white/40 shadow-2xl backdrop-blur-sm md:h-[500px]">
            <div className="text-center">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-blue-600 shadow-xl shadow-blue-600/30 md:h-36 md:w-36">
                <Wrench className="text-white" size={65} />
              </div>

              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                FixMate
              </h2>

              <p className="mt-2 text-gray-600">
                Your problems, our solutions.
              </p>

              <div className="mt-6 flex items-center justify-center gap-2">
                <BadgeCheck className="text-blue-600" size={20} />
                <span className="text-sm font-medium text-gray-700">
                  Professional Repair Services
                </span>
              </div>
            </div>

      
            <div className="absolute -left-2 top-10 rounded-2xl bg-white p-4 shadow-xl md:-left-8">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Reliable Service
                  </p>
                  <p className="text-xs text-gray-500">
                    Trusted professionals
                  </p>
                </div>
              </div>
            </div>

      
            <div className="absolute -right-2 bottom-10 rounded-2xl bg-white p-4 shadow-xl md:-right-8">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-green-100 p-3 text-green-600">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Fast Response
                  </p>
                  <p className="text-xs text-gray-500">
                    Hassle-free booking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}