import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { universities } from '../Data/universitiesData';

export default function OnboardingSearch() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter universities based on search query
  const filteredUniversities = useMemo(() => {
    if (!searchQuery.trim()) {
      return universities.slice(0, 5); // Show top 5 when no search
    }
    const searchLower = searchQuery.toLowerCase();
    return universities.filter(
      (uni) =>
        uni.name.toLowerCase().includes(searchLower) ||
        uni.abbreviation.toLowerCase().includes(searchLower)
    );
  }, [searchQuery]);

  const handleUniversitySelect = (university) => {
    setSelectedUniversity(university);
    setSearchQuery(`${university.name} (${university.abbreviation})`);
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(true);
    if (!value) {
      setSelectedUniversity(null);
    }
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleContinue = () => {
    if (selectedUniversity) {
      // Save selected university to localStorage or pass as state
      console.log('Selected university:', selectedUniversity);
      // Navigate to next step
      navigate('/onboarding/step4', { state: { university: selectedUniversity } });
    }
  };

  return (
    <div className="min-h-screen w-screen bg-white overflow-y-auto font-montserrat-medium">
      <div className="flex flex-col items-center justify-center px-4 py-12 min-h-screen">
        <div className="w-full max-w-md flex flex-col items-center">
          {/* Progress Indicator - 4 steps */}
          <div className="mb-10 w-full flex justify-center gap-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  step <= 2 ? 'bg-Green-100' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-Green-100 mb-2">
              Search for your university
            </h1>
            <p className="text-base sm:text-lg text-gray-700 font-medium">
              Find and select your university
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full mb-6 relative" ref={searchInputRef}>
            <div className="relative">
              <BsSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                placeholder="Search for your university..."
                className="w-full pl-12 pr-4 h-12 rounded-4xl border border-gray-300 focus:border-Green-100 focus:ring-2 focus:ring-Green-100 outline-none text-sm bg-white"
              />
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && filteredUniversities.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute z-20 w-full mt-2 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-y-auto"
              >
                {filteredUniversities.map((university) => (
                  <button
                    key={university.id}
                    type="button"
                    onClick={() => handleUniversitySelect(university)}
                    className="w-full text-left px-4 py-3 hover:bg-lightGreen-100 transition-colors text-sm border-b border-gray-100 last:border-b-0 first:rounded-t-xl last:rounded-b-xl"
                  >
                    <div className="font-medium text-gray-800">
                      {university.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {university.abbreviation}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* No results message */}
            {showSuggestions && searchQuery.trim() && filteredUniversities.length === 0 && (
              <div className="absolute z-20 w-full mt-2 bg-white border border-gray-300 rounded-xl shadow-lg p-4">
                <p className="text-sm text-gray-500 text-center">
                  No universities found. Try a different search term.
                </p>
              </div>
            )}
          </div>

          {/* Continue Button */}
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedUniversity}
            className={`w-full h-14 font-semibold rounded-full transition-all duration-200 shadow-sm text-lg ${
              selectedUniversity
                ? 'bg-Green-100 hover:bg-green-700 text-white cursor-pointer'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Click to continue
          </button>
        </div>
      </div>
    </div>
  );
}

