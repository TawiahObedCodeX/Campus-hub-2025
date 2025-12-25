import Navber from "../Components/Navber";
import Footer from "../Components/Footer";

import student from "../assets/BGIMAGE/StudentFrame.png";
import leftarrow from "../assets/Icons/leftarrow.svg";
import { BsArrowRight } from "react-icons/bs";
import Img1 from "../assets/Image1.png";
import Img2 from "../assets/Image2.png";
import Img3 from "../assets/Image3.png";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Navber />

      {/* HERO SECTION - Pure Tailwind Magic */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
            Your Campus. <br />
            Your Community. <br />
            Your Future
          </h1>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto">
            CampusHub connects students across Ghana to gigs, internships, events, skills,
            and opportunities. Build your profile, showcase your talents, and grow your
            network—all in one place.
          </p>

          {/* HERO IMAGE - Larger circle; student centered and anchored to bottom */}
          <div className="mt-16 flex justify-center">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
              {/* Green circular background */}
              <div className="absolute inset-0  bg-lightGreen-100 rounded-full" />

              {/* Much bigger student image */}
              <img
                src={student}
                alt="Happy Student"
                className="
        absolute inset-0
        scale-175                      /* 75% larger than the container */
        object-contain
        drop-shadow-2xl
        pointer-events-none
       md:top-32
        md:left-24
         lg:top-36
        lg:left-28
        top-24
        left-16
      "
              />
            </div>
          </div>
        </div>
      </section>

      {/* REST OF THE PAGE - Also fully Tailwind & responsive */}
      <section className="px-4 sm:px-6 lg:px-8 md:py-40 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Features */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Everything You Need <br className="sm:hidden" /> To Know About Us
            </h2>
            <p className="mt-4 text-gray-600">A comprehensive platform designed specifically for student life.</p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {[
              "Career & Networking ",
              "Academics & Social Engine",
              "Marketplace & Commerce",
              "Finance & Community",
              "Trust & Engagements"
            ].map((item) => (
              <div
                key={item}
                className="flex justify-between items-center p-5 bg-lightGreen-100 rounded-xl hover:bg-lightGreen-200 transition cursor-pointer"
              >
                <span className="font-semibold text-lg">{item}</span>
                <img src={leftarrow} alt="" className="w-6 h-6" />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Ready to Join the Community?
            </h2>
            <p className="mt-4 text-gray-700 max-w-3xl mx-auto text-base sm:text-lg lg:text-xl">
              Join thousands of students already using CampusHub to connect, learn, and grow.
            </p>
          </div>

          {/* Email Signup */}
          <div className="mt-10 max-w-2xl mx-auto w-full">
            {/* Desktop/Tablet inline */}
            <div className="hidden sm:flex gap-2 p-2 bg-white border border-gray-300 rounded-full shadow-lg items-center">
              <input
                type="email"
                placeholder="makaveliblak@gmail.com"
                className="flex-1 px-4 h-11 outline-none rounded-full"
              />
              <button className="bg-Green-100 hover:bg-Green-200 text-white font-medium px-6 h-11 rounded-full flex items-center justify-center gap-3 transition">
                <span>Join</span>
                <BsArrowRight className="text-2xl" />
              </button>
            </div>

            {/* Mobile stacked layout */}
            <div className="sm:hidden flex flex-col gap-3">
              <div className="p-2 bg-white border border-gray-300 rounded-full shadow-lg">
                <input
                  type="email"
                  placeholder="makaveliblak@gmail.com"
                  className="w-full px-4 h-11 outline-none rounded-full"
                />
              </div>
              <button className="w-full bg-Green-100 hover:bg-Green-200 text-white font-medium px-6 h-11 rounded-full flex items-center justify-center gap-3 transition">
                <span>Join</span>
                <BsArrowRight className="text-2xl" />
              </button>
            </div>

            {/* Avatars + Text */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex -space-x-4">
                <img src={Img1} className="w-14 h-14 rounded-full border-4 border-white" />
                <img src={Img2} className="w-14 h-14 rounded-full border-4 border-white" />
                <img src={Img3} className="w-14 h-14 rounded-full border-4 border-white" />
              </div>
              <p className="text-lg">
                <span className="font-bold">Join Our Community</span> of students
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 bg-lightGreen-100 rounded-3xl py-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
              {[
                { num: "5000 +", label: "Active Students" },
                { num: "1200 +", label: "Gig Posted" },
                { num: "300 +", label: "Campus Events" },
                { num: "15 +", label: "Universities" },
              ].map((stat) => (
                <div key={stat.label}>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-Green-100">
                    {stat.num}
                  </h3>
                  <p className="mt-2 text-gray-800 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}