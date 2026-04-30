import React from "react";
import Link from "next/link";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10 pt-16 pb-8">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* Column 1: Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              Nayaab Gifts
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Personalized gifts that define you. We craft custom-engraved wallets, pens, and accessories to make every moment specific.
            </p>
            <div className="flex gap-4 pt-2">
              <Button size="icon" variant="ghost" className="rounded-full text-gray-400 hover:text-white hover:bg-white/10">
                <Link href="https://www.instagram.com/um_gift_store/?hl=en" target="_blank">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/customize" className="hover:text-wide transition-colors">Corporate Gifts</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/profile" className="hover:text-white transition-colors">My Account</Link></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400 shrink-0" />
                <a href="mailto:entrepriseum@gmail.com" className="hover:text-white transition-colors">entrepriseum@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-400 shrink-0" />
                <span>+91 84248 13572</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <div className="text-center md:text-left text-sm">
            <p>&copy; {new Date().getFullYear()} Nayaab Gifts. All rights reserved.</p>
          </div>
          <span className="hidden md:inline text-gray-700">|</span>
          <p>Owner: Mohammed Umar Mohammed Manzar Shaikh</p>
          <div className="flex gap-1">
            <span>Developed with ❤️ by</span>
            <Link href="/developer" className="font-medium text-white hover:underline">
              Ismaeel Shaikh
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}