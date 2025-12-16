import React, { useState } from "react";
import Navber from "../Components/Navber";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

import Briefcase from "../assets/Icons/briefcase.svg";
import GigCard from "../Components/GigCard";
import PostGigModal from "../Components/PostGigModal";

import { allGigs } from "../Data/allGigs";
import { webDevGigs } from "../Data/webDevGigs";
import { writingGigs } from "../Data/writingGigs";
import { designGigs } from "../Data/designGigs";
import { researchGigs } from "../Data/researchGigs";
import { marketingGigs } from "../Data/marketingGigs";

const categories = [
  { name: "All Categories", data: allGigs },
  { name: "Web Dev", data: webDevGigs },
  { name: "Writing", data: writingGigs },
  { name: "Design", data: designGigs },
  { name: "Research", data: researchGigs },
  { name: "Marketing", data: marketingGigs },
];

export default function GigsPage() {
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentGigs =
    categories.find((cat) => cat.name === activeCategory)?.data || [];

  return (
    <div>
      <Navber />

      <div className="flex flex-col items-center px-4 sm:px-6 lg:px-10 pt-40 w-full">

        {/* Header */}
        <div className="text-center lg:text-left w-full max-w-5xl">
          <h1 className="text-3xl sm:text-4xl font-montserrat-medium">
            Gig Marketplace
          </h1>
          <p className="text-gray-500 text-base sm:text-lg mt-2">
            Discover freelance opportunities, internships, and part-time work tailored for students.
          </p>
        </div>

        {/* Tabs + Post Button */}
        <div className="flex flex-col lg:flex-row justify-between items-center w-full max-w-5xl mt-10 gap-6">

          {/* Categories Tabs */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 border border-gray-300 rounded-2xl bg-white p-3 w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-4 py-2 rounded-md text-sm sm:text-base transition ${
                  activeCategory === cat.name
                    ? "bg-lightGreen-100 text-Green-100 font-medium"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Post a Gig Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-Green-100 text-white flex items-center justify-center gap-3 
            px-6 py-4 rounded-xl hover:bg-green-700 transition w-full sm:w-auto"
          >
            <img src={Briefcase} className="w-6 h-6" />
            Post a Gig
          </button>
        </div>

        {/* Gigs */}
        <div className="mt-12 w-full max-w-6xl">
          {currentGigs.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl text-gray-300 mb-6">📭</div>
              <h3 className="text-2xl text-gray-600 mb-3">
                No gigs posted yet in this category
              </h3>
              <p className="text-gray-500 mb-8">Be the first to post a gig!</p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-Green-100 text-white px-8 py-4 rounded-xl hover:bg-green-700"
              >
                Post Your First Gig
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
              {currentGigs.map((gig) => (
                <GigCard key={gig.id} gig={gig} />
              ))}
            </div>
          )}
        </div>
      </div>

      <PostGigModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Footer />
    </div>
  );
}
