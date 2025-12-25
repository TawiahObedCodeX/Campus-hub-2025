import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navber() {
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const navLinks = [
        { label: "Home", path: "/" },
        { label: "Gigs", path: "/Gigs" },
        { label: "Event", path: "" },
        { label: "Explore", path: "/Explore" },
    ];

    return (
        <div className="fixed top-5 left-0 right-0 z-50 pointer-events-none">
            {/* Responsive container with better scaling */}
            <div className="pointer-events-auto mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-auto xl:max-w-7xl">
                <div className="h-20 bg-[#171717] rounded-full shadow-2xl border border-gray-800 
                                px-5 sm:px-7 md:px-8 lg:px-10 flex justify-between items-center">
                    
                    {/* Logo - scales slightly on smaller screens */}
                    <h1 className="font-montserrat-semi-bold text-Green-100 text-2xl sm:text-3xl">
                        CampusHub
                    </h1>

                    {/* Desktop Navigation - hidden on <md, visible on tablet+ */}
                    <nav className="hidden md:flex items-center gap-4 lg:gap-8 text-white text-base lg:text-lg">
                        {navLinks.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`px-5 py-2 rounded-4xl transition duration-200 whitespace-nowrap ${
                                    location.pathname === item.path
                                        ? "bg-[#6CAB2D33] text-white font-medium"
                                        : "hover:bg-[#6CAB2D33]"
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Login Button - adjust size on tablet */}
                    <div className="hidden md:block">
                        <Link
                            to="/login"
                            className="bg-Green-100 text-black font-semibold 
                                       px-5 py-2.5 sm:px-6 sm:py-3 
                                       rounded-4xl flex items-center gap-2 
                                       hover:bg-Green-200 transition text-sm sm:text-base"
                        >
                            Login
                            <BsArrowRight className="text-lg sm:text-xl" />
                        </Link>
                    </div>

                    {/* Mobile/Tablet Menu Toggle - show only below lg if needed, but keep on md for safety */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden text-white text-3xl sm:text-4xl"
                    >
                        {open ? <HiX /> : <HiMenu />}
                    </button>
                </div>

                {/* Mobile Dropdown Menu - matches the navbar's side margins */}
                {open && (
                    <div className="md:hidden mt-3 bg-[#171717] rounded-2xl p-5 border border-gray-800 shadow-2xl mx-4 sm:mx-6">
                        <div className="flex flex-col gap-4 text-white text-lg">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setOpen(false)}
                                    className={`px-5 py-3 rounded-xl text-center transition duration-200 ${
                                        location.pathname === item.path
                                            ? "bg-green-950 font-medium"
                                            : "hover:bg-green-900"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}

                            <Link
                                to="/login"
                                onClick={() => setOpen(false)}
                                className="bg-Green-100 text-black font-semibold px-6 py-3 rounded-4xl flex items-center justify-center gap-2 hover:bg-Green-200 transition mt-4"
                            >
                                Login
                                <BsArrowRight className="text-xl" />
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}