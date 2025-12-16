import React from 'react';

export default function PostGigModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Fixed Top Bar
      <div className="border-b border-gray-200 px-6 sm:px-8 py-5 flex justify-between items-center bg-white shrink-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Post a Gig</h1>
        <button
          onClick={onClose}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-2xl sm:text-3xl text-gray-600 transition"
        >
          ×
        </button>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto px-6 sm:px-8 md:px-12 lg:px-24 py-8">
        <div className="max-w-4xl mx-auto">
          <form className="space-y-10 pb-32 sm:pb-10"> {/* Extra bottom padding so last fields aren't hidden under buttons */}
            {/* Gig Title */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Gig Title
              </label>
              <input
                type="text"
                placeholder="e.g. Need a website for my student club"
                className="w-full px-6 py-5 text-lg border-2 border-gray-300 rounded-2xl focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-500/20 transition"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Project Description
              </label>
              <textarea
                placeholder="Describe what you need, skills required, deliverables..."
                rows="6"
                className="w-full px-6 py-5 text-lg border-2 border-gray-300 rounded-2xl focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-500/20 resize-none transition"
                required
              />
            </div>

            {/* Budget & Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-2">
                  Budget (GHS)
                </label>
                <div className="relative">
                  <span className="absolute left-6 top-5 text-xl text-gray-600">₵</span>
                  <input
                    type="text"
                    placeholder="800 - 1200"
                    className="w-full pl-14 pr-6 py-5 text-lg border-2 border-gray-300 rounded-2xl focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-500/20 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2-3 weeks"
                  className="w-full px-6 py-5 text-lg border-2 border-gray-300 rounded-2xl focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-500/20 transition"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Category
              </label>
              <select className="w-full px-6 py-5 text-lg border-2 border-gray-300 rounded-2xl focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-500/20 bg-white transition">
                <option>Select a category</option>
                <option>Web Development</option>
                <option>Graphic Design</option>
                <option>Writing & Content</option>
                <option>Video Editing</option>
                <option>Digital Marketing</option>
                <option>Research & Data</option>
                <option>Others</option>
              </select>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Required Skills (Optional)
              </label>
              <input
                type="text"
                placeholder="React, Figma, Copywriting, Excel..."
                className="w-full px-6 py-5 text-lg border-2 border-gray-300 rounded-2xl focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-500/20 transition"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Sticky Bottom Buttons - Always Visible */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 sm:px-8 py-6 shrink-0">
        <div className="max-w-4xl mx-auto flex gap-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-5 border-2 border-gray-300 text-gray-700 font-semibold text-xl rounded-2xl hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-5 bg-green-500 text-white font-bold text-xl rounded-2xl hover:bg-green-600 transition shadow-lg hover:shadow-xl"
          >
            Post Gig
          </button>
        </div>
      </div>
    </div>
  );
}