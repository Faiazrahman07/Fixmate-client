import Link from "next/link";
import { Wrench, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Wrench size={22} />
              </div>

              <span className="text-2xl font-bold text-white">
                Fix<span className="text-blue-500">Mate</span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-7 text-gray-400">
              Reliable repair services for your devices and home appliances.
              Book trusted professionals and get your problems fixed with ease.
            </p>
          </div>

          
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="transition hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="transition hover:text-blue-400">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition hover:text-blue-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-blue-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

      
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Our Services
            </h3>

            <ul className="space-y-3 text-sm">
              <li>Mobile Repair</li>
              <li>Laptop Repair</li>
              <li>Home Appliance Repair</li>
              <li>Electrical Services</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Contact Us
            </h3>

            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-500" />
                <span>support@fixmate.com</span>
              </li>

              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-500" />
                <span>+880 1XXX-XXXXXX</span>
              </li>

              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-blue-500" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

        </div>

      
        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} FixMate. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;