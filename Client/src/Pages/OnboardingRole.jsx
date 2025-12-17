import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import profileIcon from "../assets/Icons/profile2user.svg";

export default function OnboardingRole() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleContinue = () => {
    if (selectedRole) {
      console.log("Selected role:", selectedRole);
      // Navigate to personal info form
      navigate("/onboarding/personal-info");
    }
  };

  return (
    <div className="min-h-screen w-screen bg-white overflow-y-auto font-montserrat-medium">
      <div className="flex flex-col items-center justify-center px-4 py-12 min-h-screen">
        <div className="w-full max-w-5xl flex flex-col items-center">
          {/* Progress Indicator - 5 steps */}
          <div className="mb-10 w-full max-w-md flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  step === 1 ? "bg-Green-100" : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          {/* Header */}
          <div className="text-center mb-14 space-y-3">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-Green-100">
              How do you plan on using CampusHub?
            </h1>
            <p className="text-base sm:text-lg text-black font-medium">
              Tell us how you would like to join this platform
            </p>
          </div>

          {/* Choice Cards */}
          <div className="flex flex-col md:flex-row gap-6 mb-16 w-full justify-center max-w-4xl">
            {/* Student Card */}
            <button
              type="button"
              onClick={() => setSelectedRole("student")}
              className={`relative p-6 rounded-2xl border transition-all duration-200 text-left w-full md:w-80 bg-white ${
                selectedRole === "student"
                  ? "border-Green-100 shadow-md"
                  : "border-gray-200 hover:border-Green-100"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={profileIcon} 
                  alt="Student icon" 
                  className="w-5 h-5"
                />
                <h3 className="text-Green-100 font-bold text-lg">
                  Join As a Student
                </h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Ace classes. Find gigs. Manage money
              </p>
            </button>

            {/* Graduate Card */}
            <button
              type="button"
              onClick={() => setSelectedRole("graduate")}
              className={`relative p-6 rounded-2xl border transition-all duration-200 text-left w-full md:w-80 bg-white ${
                selectedRole === "graduate"
                  ? "border-Green-100 shadow-md"
                  : "border-gray-200 hover:border-Green-100"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={profileIcon} 
                  alt="Graduate icon" 
                  className="w-5 h-5"
                />
                <h3 className="text-Green-100 font-bold text-lg">
                  Join As a Graduate
                </h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Mentor talent. Network. Stay connected
              </p>
            </button>
          </div>

          {/* Continue Button */}
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`w-full max-w-md h-14 font-semibold rounded-full transition-all duration-200 shadow-sm text-lg ${
              selectedRole
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


