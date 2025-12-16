import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-20 lg:mt-32 bg-black text-white">
      <div className="px-6 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand & Description */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl lg:text-4xl font-bold">CampusHub</h1>
            <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
              Connecting students across Ghana to Gigs, marketplace,<br className="hidden sm:block" />
              internships, events, skills, and opportunities.
            </p>
          </div>

          {/* Useful Links */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl lg:text-2xl font-semibold">Useful Links</h2>
            <div className="flex flex-col gap-3 text-gray-300 text-sm lg:text-base">
              <a href="/" className="hover:text-white transition">Home</a>
              <a href="/events" className="hover:text-white transition">Events</a>
              <a href="/about" className="hover:text-white transition">About Us</a>
            </div>
          </div>

          {/* Contact & Address */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl lg:text-2xl font-semibold">Contact & Address</h2>
            <div className="flex flex-col gap-3 text-gray-300 text-sm lg:text-base">
              <a href="tel:+233" className="hover:text-white transition">Phone Number</a>
              <a href="#" className="hover:text-white transition">Accra, Ghana</a>
              <a href="mailto:hello@campushub.com" className="hover:text-white transition">
                hello@campushub.com
              </a>
            </div>
          </div>

          {/* Optional: Socials or Newsletter (you can add later) */}
          <div className="flex flex-col gap-4 lg:items-start">
            <h2 className="text-xl lg:text-2xl font-semibold">Stay Connected</h2>
            <p className="text-gray-300 text-sm lg:text-base">
              Follow us for updates on events and opportunities.
            </p>
            {/* You can add social icons here later */}
          </div>
        </div>

        {/* Divider & Bottom Section */}
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-gray-300 text-sm">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition">Terms of Use</a>
            </div>
            <p>© {new Date().getFullYear()} CampusHub. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}