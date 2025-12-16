import React from "react";
import Dollarcurrency from "../assets/Icons/dollarcircle.svg";
import Clock from "../assets/Icons/clock.svg";
import Profile from "../assets/Icons/profile2user.svg";

export default function GigCard({ gig }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition 
    w-full max-w-sm h-auto">

      {/* Image */}
      <img
        src={gig.image}
        className="w-full h-52 sm:h-60 object-cover rounded-t-2xl"
        alt=""
      />

      <div className="p-4">
        
        {/* Tag, Title, Description */}
        <span className="bg-green-100 text-Green-100 px-3 py-1 rounded-full text-xs sm:text-sm">
          {gig.tags[0] || "Freelance"}
        </span>

        <h2 className="text-lg sm:text-xl font-semibold mt-3">{gig.title}</h2>

        <p className="text-gray-600 text-sm mt-2">{gig.description}</p>

        {/* Budget / Duration / Applicants */}
        <div className="flex flex-wrap gap-6 mt-5 text-sm">

          <div className="flex items-center gap-2">
            <img src={Dollarcurrency} className="w-5 h-5" />
            <span>{gig.budget}</span>
          </div>

          <div className="flex items-center gap-2">
            <img src={Clock} className="w-5 h-5" />
            <span>{gig.duration}</span>
          </div>

          <div className="flex items-center gap-2">
            <img src={Profile} className="w-5 h-5" />
            <span>{gig.applicants} Applicants</span>
          </div>

        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {gig.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-lightGreen-100 text-gray-700 px-3 py-1 rounded-md text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex justify-between items-center mt-5">
          <span className="text-sm text-gray-500">
            Posted by {gig.postedBy}
          </span>

          <button className="bg-Green-100 text-white px-5 py-2 rounded-xl hover:bg-green-700 transition">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
