import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import profileIcon from "../assets/Icons/profile.svg";

export default function OnboardingRole() {
  const navigate = useNavigate();
  // Initialize with saved role from localStorage if available
  const [selectedRole, setSelectedRole] = useState(() => {
    return localStorage.getItem('onboarding_role') || null;
  });

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    // Save selected role to localStorage
    localStorage.setItem('onboarding_role', role);
  };

  const handleContinue = () => {
    if (selectedRole === 'student') {
      // Only students go through the full onboarding flow
      console.log("Selected role: student - proceeding with onboarding");
      navigate("/onboarding/personal-info");
    } else if (selectedRole === 'graduate') {
      console.log("Selected role: graduate - proceeding with graduate onboarding");
      navigate("/onboarding/graduate");
    } else if (selectedRole === 'business') {
      navigate("/selectoptions");
      // For business role, redirect to business options
      console.log(`Selected role: ${selectedRole} - redirecting to selectoptions`);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-white overflow-y-auto font-montserrat-medium">
      <div className="flex flex-col items-center justify-center px-4 py-12 min-h-screen">
        <div className="w-full max-w-6xl flex flex-col items-center">
          {/* Progress Indicator - 5 steps */}
          <div className="mb-10 w-full max-w-md flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  step <= 1 ? "bg-Green-100" : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          {/* Header */}
          <div className="text-center mb-12 space-y-3">
            <h1 className="text-4xl font-bold text-Green-100">
              How do you plan on using CampusHub?
            </h1>
            <p className="text-base text-black">
              Tell us how you would like to join this platform
            </p>
          </div>

          {/* Choice Cards */}
          <div className="flex flex-col md:flex-row gap-6 mb-12 w-full justify-center max-w-5xl">
            {/* Student Card */}
            <button
              type="button"
              onClick={() => handleRoleSelect("student")}
              className={`relative p-6 rounded-lg border text-left w-full md:flex-1 transition-all duration-200 ${
                selectedRole === "student"
                  ? "border-Green-100 bg-lightGreen-100"
                  : "border-gray-300 bg-white"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={profileIcon} 
                  alt="Student icon" 
                  className="w-6 h-6"
                />
                <h3 className="text-Green-100 font-bold text-base">
                  Join As a Student
                </h3>
              </div>
              <p className="text-sm text-black leading-relaxed">
                Ace classes. Find gigs. Manage money.
              </p>
            </button>

            {/* Graduate Card */}
            <button
              type="button"
              onClick={() => handleRoleSelect("graduate")}
              className={`relative p-6 rounded-lg border text-left w-full md:flex-1 transition-all duration-200 ${
                selectedRole === "graduate"
                  ? "border-Green-100 bg-lightGreen-100"
                  : "border-gray-300 bg-white"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={profileIcon} 
                  alt="Graduate icon" 
                  className="w-6 h-6"
                />
                <h3 className="text-Green-100 font-bold text-base">
                  Join As a Graduate
                </h3>
              </div>
              <p className="text-sm text-black leading-relaxed">
                Mentor talent. Network. Stay connected.
              </p>
            </button>

            {/* Business Card */}
            <button
              type="button"
              onClick={() => handleRoleSelect("business")}
              className={`relative p-6 rounded-lg border text-left w-full md:flex-1 transition-all duration-200 ${
                selectedRole === "business"
                  ? "border-Green-100 bg-lightGreen-100"
                  : "border-gray-300 bg-white"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={profileIcon} 
                  alt="Business icon" 
                  className="w-6 h-6"
                />
                <h3 className="text-Green-100 font-bold text-base">
                  Join As a Business
                </h3>
              </div>
              <p className="text-sm text-black leading-relaxed">
                Join your business to reach many audience.
              </p>
            </button>
          </div>

          {/* Continue Button */}
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`w-full max-w-md h-12 font-semibold rounded-4xl text-base transition-all duration-200 ${
              selectedRole
                ? 'bg-Green-100 hover:bg-green-600 text-white cursor-pointer shadow-sm hover:shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {selectedRole === 'student' 
              ? 'Click to continue' 
              : selectedRole 
              ? 'Continue' 
              : 'Click to continue'}
          </button>
        </div>
      </div>
    </div>
  );
}


