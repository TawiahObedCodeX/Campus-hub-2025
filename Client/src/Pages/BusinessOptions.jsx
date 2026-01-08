import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo/Logo2.svg';
import Formbg from '../assets/BGIMAGE/talent.png';
import Officebag from '../assets/Icons/briefcase.svg';
import Shop from '../assets/Icons/shop.svg';
import Calender from '../assets/Icons/calendar.svg';
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export default function BusinessOptions() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleCardClick = (option) => {
    setSelectedOption(option);
  };

  const handleCompleteRegistration = () => {
    if (!selectedOption) {
      // Optionally show a message: "Please select an option"
      return;
    }

    switch (selectedOption) {
      case 'hiring':
        navigate('/talent');
        break;
      case 'selling':
        navigate('/storefront');
        break;
      case 'hosting':
        navigate('/hostevent');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-12 xl:gap-16">
          {/* Left side - Form / Options */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-6 sm:space-y-8 max-w-md lg:max-w-lg mx-auto lg:mx-0">
            {/* Logo + Sign In link */}
            <div className="relative w-full">
              <div className="absolute -top-4 sm:-top-6 lg:-top-10 -left-2 sm:-left-4 lg:-left-8 z-10">
                <img src={Logo} alt="Logo" className="h-8 sm:h-10 lg:h-16 w-auto" />
              </div>

              <div className="flex justify-end">
                <Link
                  to="/signin"
                  className="text-xs sm:text-sm text-gray-600 hover:text-green-600 transition-colors duration-200"
                >
                  Already have an account?{' '}
                  <span className="text-green-600 underline font-medium">Sign In</span>
                </Link>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex gap-2 mb-4 sm:mb-6">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`h-1 flex-1 rounded-full ${step <= 2 ? 'bg-Green-100' : 'bg-gray-200'}`}
                />
              ))}
            </div>

            {/* Main Content */}
            <div className="flex flex-col space-y-6 sm:space-y-8">
              {/* Heading */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-Green-100 leading-tight">
                Let’s get your business
                <br />
                to the audience!
              </h1>

              {/* Cards */}
              <div className="w-full max-w-md lg:max-w-lg space-y-4 sm:space-y-5">
                {/* Card 1: Hiring */}
                <div
                  onClick={() => handleCardClick('hiring')}
                  className={`border rounded-xl p-4 sm:p-5 flex items-center gap-4 cursor-pointer transition-all duration-200 shadow-sm ${
                    selectedOption === 'hiring'
                      ? 'border-[#D9D9D9] bg-[#FF6C2D0D] shadow-md'
                      : 'border-[#D9D9D9] hover:bg-[#FF6C2D0D] hover:shadow-md'
                  }`}
                >
                  <img src={Officebag} alt="Hiring" className="h-10 w-10 sm:h-12 sm:w-12 shrink-0" />
                  <div className="text-left">
                    <h3 className="font-semibold text-base sm:text-lg text-gray-900">
                      HIRING TALENTS & POSTING JOBS
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-snug">
                      Post internships, entry-level jobs, national service positions
                    </p>
                  </div>
                </div>

                {/* Card 2: Selling */}
                <div
                  onClick={() => handleCardClick('selling')}
                  className={`border rounded-xl p-4 sm:p-5 flex items-center gap-4 cursor-pointer transition-all duration-200 shadow-sm ${
                    selectedOption === 'selling'
                      ? 'border-[#D9D9D9] bg-[#002EA30D] shadow-md'
                      : 'border-[#D9D9D9] hover:bg-[#002EA30D] hover:shadow-md'
                  }`}
                >
                  <img src={Shop} alt="Selling" className="h-10 w-10 sm:h-12 sm:w-12 shrink-0" />
                  <div className="text-left">
                    <h3 className="font-semibold text-base sm:text-lg text-gray-900">
                      SELLING PRODUCTS/SERVICES
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-snug">
                      Set up a storefront in the campus marketplace
                    </p>
                  </div>
                </div>

                {/* Card 3: Hosting */}
                <div
                  onClick={() => handleCardClick('hosting')}
                  className={`border rounded-xl p-4 sm:p-5 flex items-center gap-4 cursor-pointer transition-all duration-200 shadow-sm ${
                    selectedOption === 'hosting'
                      ? 'border-[#D9D9D9] bg-[#DBA9480D] shadow-md'
                      : 'border-[#D9D9D9] hover:bg-[#DBA9480D] hover:shadow-md'
                  }`}
                >
                  <img src={Calender} alt="Hosting" className="h-10 w-10 sm:h-12 sm:w-12 shrink-0" />
                  <div className="text-left">
                    <h3 className="font-semibold text-base sm:text-lg text-gray-900">
                      HOSTING EVENTS
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-snug">
                      Career fairs, bootcamps, concerts, virtual sessions
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full max-w-md lg:max-w-lg gap-4 mt-6 sm:mt-8">
                {/* Back button */}
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center justify-center sm:justify-start gap-2 text-gray-600 hover:text-gray-900 transition-colors text-base font-medium py-2 px-4 rounded-lg hover:bg-gray-100 w-full sm:w-auto"
                >
                  <FaArrowLeftLong className="text-xl" />
                  Back
                </button>

                {/* Complete registration button */}
                <button
                  onClick={handleCompleteRegistration}
                  className={`bg-green-600 hover:bg-green-700  text-white font-medium rounded-full py-3 px-8 text-base sm:text-lg transition-colors shadow-md w-full sm:w-auto ${
                    !selectedOption ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Complete registration
                </button>
              </div>
            </div>
          </div>

          {/* Right side - Image (hidden on mobile/tablet) */}
          <div className="hidden lg:block lg:w-1/2">
            <div className="relative w-full aspect-4/5 xl:aspect-4/4 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={Formbg}
                alt="Business illustration"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-72 inset-0 flex items-center justify-center text-white text-xl xl:text-3xl font-bold text-center px-8 drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
                Let’s get your business <br /> to the audience!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}