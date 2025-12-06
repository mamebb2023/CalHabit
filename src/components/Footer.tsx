"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="px-6 md:px-12 lg:px-20 xl:px-32 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="inline-block mb-4">
                <Image
                  src="/logo.png"
                  alt="CalHabit Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
              <p className="text-gray-600 text-sm max-w-md">
                Simplify your life and boost your productivity with CalHabit. 
                Track your habits effortlessly and build a better you.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#about"
                    className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#features"
                    className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                  >
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:support@calhabit.com"
                    className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                  >
                    support@calhabit.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} CalHabit. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

