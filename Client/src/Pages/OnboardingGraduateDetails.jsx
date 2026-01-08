import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft, BsChevronDown } from 'react-icons/bs';
import GraduateBg from '../assets/BGIMAGE/academic.png';
import GraduateLogo from '../assets/Logo/Logo2.svg';

export default function OnboardingGraduateDetails() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      employmentStatus: '',
      company: '',
      jobTitle: '',
      industry: '',
      notifyAbout: '',
      studentContact: false,
      openToMentoring: false,
      careerAdvice: false,
    },
  });

  const employmentOptions = [
    'Employed full-time',
    'Employed part-time',
    'Self-employed',
    'Unemployed',
    'Student',
  ];

  const industryOptions = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'Marketing',
    'Art & Design',
  ];

  const notificationOptions = [
    'New job opportunities',
    'Messages from students',
    'Platform updates',
    'Mentoring requests',
    'Career advice requests',
    'All of the above',
  ];

  const studentContact = watch('studentContact');
  const openToMentoring = watch('openToMentoring');
  const careerAdvice = watch('careerAdvice');

  const toggleSwitch = (field) => {
    const currentValue = watch(field);
    setValue(field, !currentValue, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    console.log('Graduate Details Data:', data);
    // Save the data (you can add API call here if needed)
    // Navigate to next step or dashboard
    navigate('/dashboard');
  };

  const handleBack = () => {
    navigate('/onboarding/graduate');
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

        {/* Progress Bar - Step 2 */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`h-1 w-12 rounded-full transition-all duration-300 ${
                step <= 2 ? 'bg-Green-100' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-Green-100 mb-6 leading-tight">
          Tell us about yourself
        </h1>

        {/* Form Fields */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col justify-between min-h-0"
        >
          <div className="space-y-5">
            {/* Employment Status Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Current employment status
              </label>
              <div className="relative group">
                <select
                  {...register('employmentStatus', {
                    required: 'Please select your current employment status',
                  })}
                  className="w-full h-12 px-4 bg-white border border-gray-300 rounded-4xl appearance-none text-sm focus:outline-none focus:border-Green-100 focus:ring-2 focus:ring-Green-100 transition-all cursor-pointer"
                >
                  <option value="" disabled>
                    Select your current employment status
                  </option>
                  {employmentOptions.map((option) => (
                    <option key={option} value={option} className="text-[#1a1a1a]">
                      {option}
                    </option>
                  ))}
                </select>
                <BsChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none group-hover:text-Green-100 transition-colors" />
              </div>
              {errors.employmentStatus && (
                <p className="mt-1 text-xs text-red-600 font-medium">
                  {errors.employmentStatus.message}
                </p>
              )}
            </div>

            {/* Company Input */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Current company/organization
              </label>
              <input
                type="text"
                {...register('company')}
                placeholder="Doe"
                className="w-full h-12 px-4 bg-white border border-gray-300 rounded-4xl text-sm focus:outline-none focus:border-Green-100 focus:ring-2 focus:ring-Green-100 transition-all"
              />
            </div>

            {/* Job Title Input */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Job Title
              </label>
              <input
                type="text"
                {...register('jobTitle')}
                placeholder="e.g Senior DevsOps Engineer"
                className="w-full h-12 px-4 bg-white border border-gray-300 rounded-4xl text-sm focus:outline-none focus:border-Green-100 focus:ring-2 focus:ring-Green-100 transition-all"
              />
            </div>

            {/* Industry Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Industry
              </label>
              <div className="relative group">
                <select
                  {...register('industry')}
                  className="w-full h-12 px-4 bg-white border border-gray-300 rounded-4xl appearance-none text-sm focus:outline-none focus:border-Green-100 focus:ring-2 focus:ring-Green-100 transition-all cursor-pointer"
                >
                  <option value="" disabled>
                    Your industry
                  </option>
                  {industryOptions.map((option) => (
                    <option key={option} value={option} className="text-[#1a1a1a]">
                      {option}
                    </option>
                  ))}
                </select>
                <BsChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none group-hover:text-Green-100 transition-colors" />
              </div>
              {errors.industry && (
                <p className="mt-1 text-xs text-red-600 font-medium">
                  {errors.industry.message}
                </p>
              )}
            </div>

            {/* Notify About Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Notify me about?
              </label>
              <div className="relative group">
                <select
                  {...register('notifyAbout')}
                  className="w-full h-12 px-4 bg-white border border-gray-300 rounded-4xl appearance-none text-sm focus:outline-none focus:border-Green-100 focus:ring-2 focus:ring-Green-100 transition-all cursor-pointer"
                >
                  <option value="" disabled>
                    Select notification preferences
                  </option>
                  {notificationOptions.map((option) => (
                    <option key={option} value={option} className="text-[#1a1a1a]">
                      {option}
                    </option>
                  ))}
                </select>
                <BsChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none group-hover:text-Green-100 transition-colors" />
              </div>
              {errors.notifyAbout && (
                <p className="mt-1 text-xs text-red-600 font-medium">
                  {errors.notifyAbout.message}
                </p>
              )}
            </div>

            {/* Toggles */}
            <div className="space-y-4 pt-4">
              {/* Student Contact Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">
                  Can students contact you for student advice?
                </span>
                <button
                  type="button"
                  onClick={() => toggleSwitch('studentContact')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                    studentContact ? 'bg-Green-100' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      studentContact ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Career Advice Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">
                  Can a student contact you for career advice?
                </span>
                <button
                  type="button"
                  onClick={() => toggleSwitch('careerAdvice')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                    careerAdvice ? 'bg-Green-100' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      careerAdvice ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Mentoring Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">
                  Are you open to mentoring?
                </span>
                <button
                  type="button"
                  onClick={() => toggleSwitch('openToMentoring')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                    openToMentoring ? 'bg-Green-100' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      openToMentoring ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
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
              Complete registration
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
              filter: 'blur(4px) brightness(0.8)',
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

      {/* Mobile Image Overlay */}
      <div className="lg:hidden absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-Green-100 via-[#4e8523] to-Green-100" />
    </div>
  );
}
