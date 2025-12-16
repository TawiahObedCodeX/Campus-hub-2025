import React from 'react'
import Footer from '../Components/Footer'
import Briefcase from '../assets/Icons/briefcase.svg'
import People from '../assets/BGIMAGE/grouppeople.png'
import Event from "../assets/Icons/calendar.svg"
import Book from "../assets/Icons/book.svg"
import Teacher from "../assets/Icons/teacher.svg"
import { BsArrowRight } from "react-icons/bs";
import Img1 from "../assets/Image1.png"
import Img2 from "../assets/Image2.png"
import Img3 from "../assets/Image3.png"
import Navber from '../Components/Navber'

export default function Explore() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navber />

            {/* MAIN WRAPPER */}
            <main className='w-full pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8'>
                <div className="max-w-7xl mx-auto flex flex-col items-center">

                    {/* TOP HERO SECTION */}
                    <section className="relative w-full max-w-5xl rounded-2xl overflow-hidden">
                        <div className="relative px-6 sm:px-10 py-14 sm:py-16 lg:py-20 flex flex-col items-center text-center bg-linear-to-tl from-green-50 via-lime-50 to-yellow-50">
                            {/* Edge fade overlays to preserve original design */}
                            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-28 bg-linear-to-r from-white to-transparent opacity-70" />
                            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-28 bg-linear-to-l from-white to-transparent opacity-70" />

                            <h1 className="relative z-10 text-2xl sm:text-3xl lg:text-4xl font-semibold">Why CampusHub?</h1>
                            <p className="relative z-10 mt-3 sm:mt-4 text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl">
                                <b>CampusHub</b> is a comprehensive platform designed specifically to connect <br/>
                                students across Ghana to gigs, internships, events, skills and opportunities.
                            </p>
                        </div>
                    </section>

                    {/* GIG MARKETPLACE CARD */}
                    <section className='mt-12 w-full'>
                        <h2 className='text-center text-xl sm:text-2xl font-medium'>Explore all what we offer here</h2>

                        <div className="mt-8 bg-lightGreen-100 rounded-2xl flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-10 px-6 sm:px-10 lg:px-14 py-10 lg:py-12 w-full">
                            {/* Text */}
                            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                                <div className="flex items-center gap-3">
                                    <img src={Briefcase} alt="" className="w-7 h-7" />
                                    <h3 className='text-xl sm:text-2xl font-semibold'>Gig Marketplace</h3>
                                </div>
                                <p className="mt-3 text-gray-700 text-sm sm:text-base">
                                    Find freelance opportunities, internships, and part-time work.
                                    Build your portfolio and earn while you learn.
                                </p>
                            </div>

                            {/* Image */}
                            <div className="flex-1 flex justify-center items-center">
                                <img src={People} alt="Students" className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto object-contain" />
                            </div>
                        </div>
                    </section>

                    {/* FEATURE CARDS */}
                    <section className="w-full mt-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {[
                                {
                                    Topic: 'Skill',
                                    details: (
                                        <p className="text-sm sm:text-base text-gray-700">
                                            Learn from peers or teach what you know.
                                            Exchange skills, collaborate on projects,
                                            and grow together.
                                        </p>
                                    ),
                                    icon: ''
                                },
                                {
                                    Topic: 'Events Hub',
                                    details: (
                                        <p className="text-sm sm:text-base text-gray-700">
                                            Never miss campus events, workshops,
                                            career fairs, or social gatherings.
                                            Stay connected to what's happening.
                                        </p>
                                    ),
                                    icon: Event
                                },
                                {
                                    Topic: 'Students Marketplace',
                                    details: (
                                        <p className="text-sm sm:text-base text-gray-700">
                                            Buy and sell textbooks, electronics, and essentials.
                                            Connect with verified students for safe transactions.
                                        </p>
                                    ),
                                    icon: Teacher
                                },
                                {
                                    Topic: 'Career Growth',
                                    details: (
                                        <p className="text-sm sm:text-base text-gray-700">
                                            Track your achievements,
                                            build your profile, and showcase
                                            your work to potential employers.
                                        </p>
                                    ),
                                    icon: Teacher
                                },
                                {
                                    Topic: `Scholarships & Funding`,
                                    details: (
                                        <p className="text-sm sm:text-base text-gray-700">
                                            Discover scholarship opportunities,
                                            crowdfund for projects, and access
                                            financial resources.
                                        </p>
                                    ),
                                    icon: ''
                                },
                                {
                                    Topic: 'Skill Connect',
                                    details: (
                                        <p className="text-sm sm:text-base text-gray-700">
                                            Learn from peers or teach what you know.
                                            Exchange skills, collaborate on projects,
                                            and grow together.
                                        </p>
                                    ),
                                    icon: ''
                                }
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col justify-start gap-4 items-start bg-lightGreen-100 rounded-2xl p-6 sm:p-7 min-h-56"
                                >
                                    <div className='flex items-center gap-3'>
                                        {item.icon && <img src={item.icon} alt="" className="w-6 h-6" />}
                                        <h4 className="text-2xl font-semibold">{item.Topic}</h4>
                                    </div>
                                    <div>{item.details}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* STUDY ORGANIZATION SECTION */}
                    <section className='mt-10 w-full'>
                        <div className="bg-lightGreen-100 rounded-2xl flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-10 px-6 sm:px-10 lg:px-14 py-10 lg:py-12 w-full">
                            {/* Text */}
                            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                                <div className="flex items-center gap-3">
                                    <img src={Book} alt="" className="w-7 h-7" />
                                    <h3 className='text-xl sm:text-2xl font-semibold'>Student Planner </h3>
                                </div>
                                <p className="mt-3 text-gray-700 text-sm sm:text-base">
                                    Organize your schedule, track assignments, set
                                    study goals, and manage your academic life efficiently.
                                </p>
                            </div>

                            {/* Image */}
                            <div className="flex-1 flex justify-center items-center">
                                <img src={People} alt="Students" className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto object-contain" />
                            </div>
                        </div>
                    </section>

                    {/* JOIN SECTION */}
                    <section className='mt-16 w-full'>
                        <div className='flex flex-col items-center gap-3'>
                            <h2 className='text-center font-bold text-2xl sm:text-3xl lg:text-4xl'>
                                Ready to Join the Community?
                            </h2>
                            <p className='text-center text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl'>
                                Join thousands of students already using CampusHub to connect, learn, and grow.
                                Create your free account today and unlock endless opportunities.
                            </p>
                        </div>

                        {/* Join form */}
                        <div className='mt-8 flex flex-col items-center gap-4 w-full'>
                            {/* Mobile: input container and button in separate rows; Desktop: inline inside one rounded container */}
                            <div className="w-full max-w-2xl">
                                {/* Desktop/Tablet inline */}
                                <form className="hidden sm:flex bg-white border border-gray-300 rounded-full shadow-lg p-2 items-center gap-2">
                                    <input type="text" placeholder='makaveliblak@gmail.com' className='flex-1 px-4 h-11 rounded-full outline-none text-sm sm:text-base' />
                                    <button className='bg-Green-100 hover:bg-green-600 px-6 h-11 rounded-full flex items-center justify-center gap-2 cursor-pointer'>
                                        <span className='text-white text-base sm:text-lg'>Join</span>
                                        <BsArrowRight className='text-white text-xl' />
                                    </button>
                                </form>

                                {/* Mobile stacked layout */}
                                <div className="sm:hidden flex flex-col gap-3">
                                    <div className="bg-white border border-gray-300 rounded-full shadow-lg p-2">
                                        <input type="text" placeholder='makaveliblak@gmail.com' className='w-full px-4 h-11 rounded-full outline-none text-sm' />
                                    </div>
                                    <button className='w-full bg-Green-100 hover:bg-green-600 px-6 h-11 rounded-full flex items-center justify-center gap-2 cursor-pointer'>
                                        <span className='text-white text-base'>Join</span>
                                        <BsArrowRight className='text-white text-xl' />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <div className="flex -space-x-3">
                                    <img src={Img1} alt="" className="w-12 h-12 rounded-full border-4 border-white" />
                                    <img src={Img2} alt="" className="w-12 h-12 rounded-full border-4 border-white" />
                                    <img src={Img3} alt="" className="w-12 h-12 rounded-full border-4 border-white" />
                                </div>

                                <h3 className="text-base sm:text-lg"><span className='font-bold'>Join Our Community</span> of students</h3>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* FULL-WIDTH FOOTER */}
            <Footer />
        </div>
    )
}
