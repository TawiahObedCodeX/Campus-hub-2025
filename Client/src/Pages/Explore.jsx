import React from 'react'
import Footer from '../Components/Footer'
import Teacher from "../assets/Icons/teacher.svg"
import { BsArrowRight } from "react-icons/bs";
import Img1 from "../assets/Image1.png"
import Img2 from "../assets/Image2.png"
import Img3 from "../assets/Image3.png"
import Carrier from "../assets/BGIMAGE/carrier.png"
import Academic from "../assets/BGIMAGE/academic.png"
import Finace from "../assets/BGIMAGE/finance.png"
import Trust from "../assets/BGIMAGE/trust.png"
import Navber from '../Components/Navber'

export default function Explore() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navber />

            {/* MAIN WRAPPER */}
            <main className='w-full pt-20 sm:pt-24 lg:pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex-1'>
                <div className="max-w-7xl mx-auto flex flex-col items-center">

                    {/* TOP HERO SECTION */}
                    <section className="relative w-full max-w-5xl rounded-2xl overflow-hidden">
                        <div className="relative px-6 sm:px-10 py-12 sm:py-16 lg:py-20 flex flex-col items-center text-center bg-linear-to-tl from-green-50 via-lime-50 to-yellow-50">
                            {/* Edge fade overlays */}
                            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 lg:w-32 bg-linear-to-r from-white to-transparent opacity-70" />
                            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 lg:w-32 bg-linear-to-l from-white to-transparent opacity-70" />

                            <h1 className="relative z-10 text-2xl sm:text-3xl lg:text-4xl font-semibold">Why CampusHub?</h1>
                            <p className="relative z-10 mt-3 sm:mt-4 text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl">
                                <b>CampusHub</b> is a comprehensive platform designed specifically to connect <br className="hidden sm:inline" />
                                students across Ghana to gigs, internships, events, skills and opportunities.
                            </p>
                        </div>
                    </section>

                    {/* Header CARD */}
                    <section className='mt-12 w-full text-center'>
                        <h2 className='text-xl sm:text-2xl lg:text-3xl font-medium'>Explore all what we offer here</h2>
                    </section>

                    <div className="w-full max-w-6xl mt-12 sm:mt-16 lg:mt-20">
                        <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">

                            {/* CAREER & NETWORKING section */}
                            <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-20 xl:gap-32">
                                <div className="flex flex-col gap-4 items-center lg:items-start max-w-md">
                                    <div className="bg-lightGreen-100 h-12 w-full max-w-xs sm:max-w-md rounded-full flex justify-center gap-3 items-center px-6">
                                        <img src={Teacher} alt="" className='w-6 h-6 sm:w-8 sm:h-8' />
                                        <h1 className="text-sm sm:text-base font-medium">CAREER & NETWORKING</h1>
                                    </div>
                                    <img src={Carrier} alt="" className='w-full max-w-sm sm:max-w-md object-contain' />
                                </div>
                                <div className="flex flex-col gap-6 items-center lg:items-start text-center lg:text-left text-sm sm:text-base max-w-xl px-4 lg:px-0">
                                    <p>
                                        <b>Skill Connect & Talent Engine</b> <br />
                                        Stop chasing jobs; let them find you. Replace the static resume<br className="hidden sm:inline" />
                                        with a Dynamic No-CV Profile that proves your worth through verified<br className="hidden sm:inline" />
                                        Skill Badges. Sharpen your pitch in the AI Interview Sandbox and<br className="hidden sm:inline" />
                                        let our Smart Match Algorithm instantly pair you with gigs that fit<br className="hidden sm:inline" />
                                        your potential.
                                    </p>
                                    <div className="w-full h-px bg-Green-100/20"></div>
                                    <p>
                                        <b>Dynamic Digital Identity</b> <br />
                                        Go beyond the static PDF resume. Build a living portfolio that evolves<br className="hidden sm:inline" />
                                        as you learn. Display verified Skill Badges, showcase your Gig History,<br className="hidden sm:inline" />
                                        and secure your legacy with an automated Alumni Transition Protocol<br className="hidden sm:inline" />
                                        that opens doors after graduation
                                    </p>
                                </div>
                            </div>

                            {/* ACADEMIC section */}
                            <div className="w-full flex flex-col lg:flex-row-reverse justify-center items-center gap-8 lg:gap-20 xl:gap-32">
                                <div className="flex flex-col gap-4 items-center lg:items-start max-w-md">
                                    <div className="bg-lightGreen-100 h-12 w-full max-w-xs sm:max-w-md rounded-full flex justify-center gap-3 items-center px-6">
                                        <img src={Teacher} alt="" className='w-6 h-6 sm:w-8 sm:h-8' />
                                        <h1 className="text-sm sm:text-base font-medium">ACADEMIC & SOCIAL ENGINE</h1>
                                    </div>
                                    <img src={Academic} alt="" className='w-full max-w-sm sm:max-w-md object-contain' />
                                </div>
                                <div className="flex flex-col gap-6 items-center lg:items-start text-center lg:text-left text-sm sm:text-base max-w-xl px-4 lg:px-0">
                                    <p>
                                        <b>Unified Academic Circles (Social Connections)</b> <br />
                                        Ditch the chaotic WhatsApp groups. Automatically join verified Fixed Academic<br className="hidden sm:inline" />
                                        Channels dedicated to your specific course and year. Share resources in the Study <br className="hidden sm:inline" />
                                        Vault, launch fluid Interest Groups, and communicate securely with End-to-End<br className="hidden sm:inline" />
                                        Encrypted Chat.
                                    </p>
                                    <div className="w-full h-px bg-Green-100/20"></div>
                                    <p>
                                        <b>V-Meet Cognitive Studio (Learning & AI)</b> <br />
                                        Experience the future of virtual learning. Step into persistent Co-Working Spaces<br className="hidden sm:inline" />
                                        powered by an Advanced AI Co-Pilot that actively listens—generating smart<br className="hidden sm:inline" />
                                        notes, tracking engagement, and delivering a personalized Cognitive Learning<br className="hidden sm:inline" />
                                        Experience that adapts to your study style.
                                    </p>
                                </div>
                            </div>

                            {/* FINANCE & COMMUNITY section */}
                            <div className="w-full flex flex-col gap-4 ">
                                <div className="bg-lightGreen-100 h-12 w-full max-w-xs sm:max-w-md rounded-full flex justify-center gap-3 items-center px-6">
                                    <img src={Teacher} alt="" className='w-6 h-6 sm:w-8 sm:h-8' />
                                    <h1 className="text-sm sm:text-base font-medium">FINANCE & COMMUNITY</h1>
                                </div>
                                <div className="bg-gray-300/35 w-full rounded-3xl overflow-hidden flex flex-col lg:flex-row items-stretch">
                                    {/* Left: Image - full height, rounded corners on small screens, only left side on lg+ */}
                                    <div className="w-full lg:w-md h-64 sm:h-80 lg:h-auto relative  overflow-hidden">
                                        <img
                                            src={Finace}
                                            alt="Smart Finance Illustration"
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Right: Text content - full height, flex start alignment */}
                                    <div className="flex-1 flex flex-col justify-center p-6 sm:p-8 lg:p-10 lg:rounded-tr-3xl lg:rounded-br-3xl">
                                        <div className="flex flex-col gap-6 sm:gap-8 text-left max-w-xl">
                                            <div>
                                                <p className="leading-relaxed text-sm sm:text-base">
                                                    <span className="font-bold block text-lg sm:text-xl">Smart Finance & Vaults</span>
                                                    Master your student economy. Take control with an automated expense tracker and smart budgeting tool that visualizes your net worth. Planning a trip or project? Pool resources securely with friends using group vault savings for transparent, collaborative growth.
                                                </p>
                                            </div>
                                            <div>
                                                <p className="leading-relaxed text-sm sm:text-base">
                                                    <span className="font-bold block text-lg sm:text-xl">Events Hub & Academic Planner</span>
                                                    Your semester, streamlined. Discover and book tickets for trending campus events or manage your schedule with the smart academic calendar. Stay ahead with automated deadline reminders that seamlessly sync your social life with your study goals.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* TRUST & ENGAGEMENTS section */}
                            <div className="w-full flex flex-col gap-4 ">
                                <div className="bg-lightGreen-100 h-12 w-full max-w-xs sm:max-w-md rounded-full flex justify-center gap-3 items-center px-6">
                                    <img src={Teacher} alt="" className='w-6 h-6 sm:w-8 sm:h-8' />
                                    <h1 className="text-sm sm:text-base font-medium">TRUST & ENGAGEMENTS</h1>
                                </div>
                                <div className="bg-gray-300/35 w-full rounded-3xl overflow-hidden flex flex-col lg:flex-row items-stretch">
                                    {/* Left: Image - full height, rounded corners on small screens, only left side on lg+ */}
                                    <div className="w-full lg:w-md  h-64 sm:h-80 lg:h-auto relative  overflow-hidden">
                                        <img
                                            src={Trust}
                                            alt="Verified Trust & Agora Market Illustration"
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Right: Text content - full height, flex start alignment */}
                                    <div className="flex-1 flex flex-col justify-center p-6 sm:p-8 lg:p-10 lg:rounded-tr-3xl lg:rounded-br-3xl">
                                        <div className="flex flex-col gap-6 sm:gap-8 text-left max-w-xl">
                                            <div>
                                                <p className="leading-relaxed text-sm sm:text-base">
                                                    <span className="font-bold block text-lg sm:text-xl">The Agora Market (Fun & Engagements)</span>
                                                    Tap into the campus pulse. Participate in the decentralized Campus Oracle to predict event outcomes and gauge student sentiment. Earn Platform Points for your insights and watch the Community Consensus unfold in real-time.
                                                </p>
                                            </div>
                                            <div>
                                                <p className="leading-relaxed text-sm sm:text-base">
                                                    <span className="font-bold block text-lg sm:text-xl">Verified Trust Gateway</span>
                                                    Say goodbye to bots and scammers. Our Mandatory OCR Verification ensures every profile is a real student. Interact with confidence using Biometric-Ready Security and trusted Escrow Protection for every transaction you make.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* JOIN SECTION */}
                    <section className='mt-16 w-full max-w-4xl'>
                        <div className='flex flex-col items-center gap-4'>
                            <h2 className='text-center font-bold text-2xl sm:text-3xl lg:text-4xl'>
                                Ready to Join the Community?
                            </h2>
                            <p className='text-center text-base sm:text-lg lg:text-xl text-gray-700'>
                                Join thousands of students already using CampusHub to connect, learn, and grow.
                                Create your free account today and unlock endless opportunities.
                            </p>
                        </div>

                        {/* Join form */}
                        <div className='mt-10 flex flex-col items-center gap-6 w-full'>
                            <div className="w-full max-w-2xl">
                                <form className="hidden sm:flex bg-white border border-gray-300 rounded-full shadow-lg p-2 items-center gap-3">
                                    <input type="text" placeholder='makaveliblak@gmail.com' className='flex-1 px-6 h-12 rounded-full outline-none text-sm sm:text-base' />
                                    <button className='bg-Green-100 hover:bg-green-600 px-8 h-12 rounded-full flex items-center justify-center gap-3 cursor-pointer transition'>
                                        <span className='text-white font-medium'>Join</span>
                                        <BsArrowRight className='text-white text-xl' />
                                    </button>
                                </form>

                                <div className="sm:hidden flex flex-col gap-4 w-full">
                                    <input type="text" placeholder='makaveliblak@gmail.com' className='w-full px-6 h-12 border border-gray-300 rounded-full shadow-lg outline-none text-sm' />
                                    <button className='w-full bg-Green-100 hover:bg-green-600 px-8 h-12 rounded-full flex items-center justify-center gap-3 cursor-pointer transition'>
                                        <span className='text-white font-medium'>Join</span>
                                        <BsArrowRight className='text-white text-xl' />
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <div className="flex -space-x-3">
                                    <img src={Img1} alt="" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-white" />
                                    <img src={Img2} alt="" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-white" />
                                    <img src={Img3} alt="" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-white" />
                                </div>

                                <h3 className="text-sm sm:text-base lg:text-lg text-center sm:text-left">
                                    <span className='font-bold'>Join Our Community</span> of students
                                </h3>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    )
}