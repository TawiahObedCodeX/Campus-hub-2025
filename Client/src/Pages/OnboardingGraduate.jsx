import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft, BsChevronDown } from 'react-icons/bs';
import { universities } from '../Data/universitiesData';
import GraduateBg from '../assets/BGIMAGE/academic.png';
import GraduateLogo from '../assets/Logo/Logo2.svg';

export default function OnboardingGraduate() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const selectedUniversity = watch('university');

  // Get available faculties based on selected university
  const availableFaculties = useMemo(() => {
    if (!selectedUniversity) return [];
    const university = universities.find((u) => u.id === selectedUniversity);
    return university?.faculties || [];
  }, [selectedUniversity]);

  // Generate year options (from 1970 to current year)
  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from({ length: currentYear - 1969 }, (_, i) => currentYear - i);

  const onSubmit = (data) => {
    console.log('Graduate Data:', data);
    // Save the data (you can add API call here if needed)
    // Navigate to next step
    navigate('/onboarding/graduate/details');
  };

  const handleBack = () => {
    navigate('/onboarding/role');
  };

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden font-montserrat-medium text-[#1a1a1a]">
      {/* Left Section - Form */}
      <div className="w-full lg:w-[45%] flex flex-col px-8 md:px-12 lg:px-16 py-6 md:py-8 relative overflow-y-auto">
        {/* Logo */}
        <div className="mb-6">
          <img 
            src={GraduateLogo} 
            alt="CampusHub Logo" 
            className="h-16 w-auto"
          />
        </div>

        {/* Progress Bar - Fixed width bars */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`h-1 w-12 rounded-full transition-all duration-300 ${
                step <= 1 ? 'bg-Green-100' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-Green-100 mb-6 leading-tight">
          Tell us about yourself
        </h1>

        {/* Form Fields */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col justify-between min-h-0">
          <div className="space-y-5">
            {/* University Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                University attended
              </label>
              <div className="relative group">
                <select
                  {...register('university', {
                    required: 'Please select the university you completed',
                  })}
                  className="w-full h-12 px-4 bg-white border border-gray-300 rounded-4xl appearance-none text-sm focus:outline-none focus:border-Green-100 focus:ring-2 focus:ring-Green-100 transition-all cursor-pointer"
                  onChange={(e) => {
                    setValue('university', e.target.value, { shouldValidate: true });
                    setValue('faculty', '', { shouldValidate: false });
                  }}
                >
                  <option value="" disabled>Select the university you completed</option>
                  {universities.map((uni) => (
                    <option key={uni.id} value={uni.id} className="text-[#1a1a1a]">
                      {uni.name} ({uni.abbreviation})
                    </option>
                  ))}
                </select>
                <BsChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a0a0a0] w-5 h-5 pointer-events-none group-hover:text-Green-100 transition-colors" />
              </div>
              {errors.university && (
                <p className="mt-1 text-xs text-red-600 font-medium">
                  {errors.university.message}
                </p>
              )}
            </div>

            {/* Year of Graduation */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Year of Graduation
              </label>
              <div className="relative group">
                <select
                  {...register('graduationYear', {
                    required: 'Please select your year of graduation',
                  })}
                  className="w-full h-12 px-4 bg-white border border-gray-300 rounded-4xl appearance-none text-sm focus:outline-none focus:border-Green-100 focus:ring-2 focus:ring-Green-100 transition-all cursor-pointer"
                >
                  <option value="" disabled>Select year</option>
                  {graduationYears.map((year) => (
                    <option key={year} value={year} className="text-[#1a1a1a]">
                      {year}
                    </option>
                  ))}
                </select>
                <BsChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a0a0a0] w-5 h-5 pointer-events-none group-hover:text-Green-100 transition-colors" />
              </div>
              {errors.graduationYear && (
                <p className="mt-1 text-xs text-red-600 font-medium">
                  {errors.graduationYear.message}
                </p>
              )}
            </div>

            {/* Faculty/College Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Faculty/College
              </label>
              {selectedUniversity === 'other' ? (
                <input
                  type="text"
                  {...register('faculty', {
                    required: selectedUniversity === 'other' ? 'Please enter your faculty/college' : false,
                  })}
                  placeholder="Select your college or faculty"
                  className="w-full h-12 px-4 bg-white border border-gray-300 rounded-4xl text-sm focus:outline-none focus:border-Green-100 focus:ring-2 focus:ring-Green-100 transition-all"
                />
              ) : (
                <div className="relative group">
                  <select
                    {...register('faculty', {
                      required: selectedUniversity !== 'other' ? 'Please select your college or faculty' : false,
                    })}
                    disabled={!selectedUniversity || availableFaculties.length === 0}
                    className={`w-full h-12 px-4 bg-white border border-gray-300 rounded-4xl appearance-none text-sm focus:outline-none focus:border-Green-100 focus:ring-2 focus:ring-Green-100 transition-all cursor-pointer ${
                      !selectedUniversity || availableFaculties.length === 0
                        ? 'bg-gray-100 cursor-not-allowed opacity-60'
                        : ''
                    }`}
                  >
                    <option value="" disabled>
                      {!selectedUniversity
                        ? 'Select university first'
                        : availableFaculties.length === 0
                        ? 'No faculties available'
                        : 'Select your college or faculty'}
                    </option>
                    {availableFaculties.map((faculty) => (
                      <option key={faculty} value={faculty} className="text-[#1a1a1a]">
                        {faculty}
                      </option>
                    ))}
                  </select>
                  <BsChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a0a0a0] w-5 h-5 pointer-events-none group-hover:text-Green-100 transition-colors" />
                </div>
              )}
              {errors.faculty && (
                <p className="mt-1 text-xs text-red-600 font-medium">
                  {errors.faculty.message}
                </p>
              )}
            </div>

            {/* Student ID (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Student ID (Optional)
              </label>
              <input
                type="text"
                {...register('studentId')}
                placeholder="Your student ID"
                className="w-full h-12 px-4 bg-white border border-gray-300 rounded-4xl text-sm focus:outline-none focus:border-Green-100 focus:ring-2 focus:ring-Green-100 transition-all"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-6 flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              <BsArrowLeft className="w-5 h-5" />
              Back
            </button>
            
            <button
              type="submit"
              className="bg-Green-100 hover:bg-green-600 text-white px-8 py-3 rounded-4xl text-sm font-semibold transition-all shadow-sm hover:shadow-md"
            >
              Click to continue
            </button>
          </div>
        </form>
      </div>

      {/* Right Section - Hero Image */}
      <div className="hidden lg:block lg:w-[55%] p-6">
        <div className="relative h-full w-full rounded-[40px] overflow-hidden group">
          {/* Blurred Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{
              backgroundImage: `url(${GraduateBg})`,
              filter: 'blur(4px) brightness(0.8)'
            }}
          />
          
          {/* Overlay Content */}
          <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-end p-12 pb-16 text-center">
            <h2 className="text-white text-4xl md:text-5xl font-bold leading-[1.1] max-w-2xl">
              Join our unique platform <br /> as a graduate profession
            </h2>
          </div>

          {/* Decorative subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Mobile Image Overlay (Subtle hint for mobile users) */}
      <div className="lg:hidden absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-Green-100 via-[#4e8523] to-Green-100" />
    </div>
  );
}
