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
        <div className="fixed top-5 left-0 right-0 z-50 flex justify-center items-center">
            <div className="w-full max-w-7xl px-6">
                <div className="h-20 bg-[#171717] rounded-full shadow-2xl border border-gray-800 px-7 flex justify-between items-center">
                    
                    {/* Logo */}
                    <h1 className="font-montserrat-semi-bold text-Green-100 text-3xl">
                        CampusHub
                    </h1>

                    {/* Desktop Links */}
                    <div className="hidden md:flex gap-10 text-white text-lg">
                        {navLinks.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`px-4 py-2 rounded-xl transition duration-200 ${
                                    location.pathname === item.path
                                        ? "bg-green-950 text-white font-medium"
                                        : "hover:bg-green-950/50"
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Login Button */}
                    <div className="hidden md:flex">
                        <Link
                            to="/login"
                            className="bg-Green-100 text-black font-semibold px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-Green-200 transition"
                        >
                            Login
                            <BsArrowRight className="text-xl" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden text-white text-4xl"
                    >
                        {open ? <HiX /> : <HiMenu />}
                    </button>
                </div>

                {/* Mobile Dropdown Menu */}
                {open && (
                    <div className="md:hidden bg-[#171717] mt-3 rounded-xl p-5 border border-gray-800 shadow-xl">
                        <div className="flex flex-col gap-4 text-white text-lg">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setOpen(false)}
                                    className={`px-4 py-2 rounded-xl transition duration-200 ${
                                        location.pathname === item.path
                                            ? "bg-green-950"
                                            : "hover:bg-green-900"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}

                            {/* Mobile Login Button */}
                            <Link
                                to="/login"
                                onClick={() => setOpen(false)}
                                className="bg-Green-100 text-black font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-Green-200 transition"
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
