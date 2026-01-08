import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo/Logo2.svg';
import Formbg from '../assets/BGIMAGE/talent.png';
import { FaArrowLeftLong, FaChevronDown } from "react-icons/fa6";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

// Import the Verification component
import Verification from './Verification'; // Adjust the path if needed

// Validation Schema
const schema = yup.object().shape({
  industry: yup.string().required('Industry sector is required'),
  companySize: yup.string().required('Company size is required'),
  hiringFocus: yup.string().required('Hiring focus is required'),
  officeLocation: yup.string().required('Primary office location is required'),
  website: yup
    .string()
    .required('Website/LinkedIn URL is required')
    .matches(
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
      'Please enter a valid URL'
    ),
});

const CustomSelect = ({ label, options, value, onChange, placeholder, name, error }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;

  return (
    <div className="relative">
      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div
        className={`w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-sm bg-white cursor-pointer flex items-center justify-between ${
          isOpen ? 'ring-2 ring-green-500 border-green-500' : 'hover:bg-gray-50'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? 'text-gray-900' : 'text-gray-400'}>
          {selectedLabel}
        </span>
        <FaChevronDown
          className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-green-100 transition-colors ${
                value === option.value ? 'bg-green-50 text-green-800' : 'text-gray-700'
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {error && <p className="mt-1 text-xs text-red-600">{error.message}</p>}
    </div>
  );
};

export default function TalentOptions() {
  const navigate = useNavigate();
  const [showVerification, setShowVerification] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      industry: '',
      companySize: '',
      hiringFocus: '',
      officeLocation: '',
      website: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    const isValid = await trigger();
    if (!isValid) return;

    console.log('Form submitted:', data);
    // Here you would normally make an API call
    // For now, we just show the verification modal
    setShowVerification(true);
  };

  // Watch values for custom selects
  const industryValue = watch('industry');
  const companySizeValue = watch('companySize');

  const industryOptions = [
    { value: 'Banking', label: 'Banking' },
    { value: 'Tech', label: 'Tech' },
    { value: 'Mining Sector', label: 'Mining Sector' },
    { value: 'Fintech', label: 'Fintech' },
    { value: 'Fashion', label: 'Fashion' },
  ];

  const companySizeOptions = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '50-200', label: '50-200 employees' },
    { value: '200+', label: '200+ employees' },
  ];

  return (
    <>
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 lg:gap-12">
            {/* Left side - Compact Form */}
            <div className="w-full lg:w-1/2 flex flex-col space-y-4 sm:space-y-6 max-w-md lg:max-w-lg mx-auto lg:mx-0">
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
              <div className="flex gap-2 mb-3 sm:mb-4">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`h-1 flex-1 rounded-full ${step <= 3 ? 'bg-green-500' : 'bg-gray-200'}`}
                  />
                ))}
              </div>

              {/* Main Content */}
              <div className="flex flex-col space-y-4 sm:space-y-5">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 leading-tight">
                  Let’s get your business
                  <br />
                  to the audience!
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                  {/* Industry + Company Size */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <CustomSelect
                      label="Industry sector"
                      options={industryOptions}
                      value={industryValue}
                      onChange={(e) => setValue('industry', e.target.value, { shouldValidate: true })}
                      placeholder="Select industry sector"
                      name="industry"
                      error={errors.industry}
                    />

                    <CustomSelect
                      label="Company size"
                      options={companySizeOptions}
                      value={companySizeValue}
                      onChange={(e) => setValue('companySize', e.target.value, { shouldValidate: true })}
                      placeholder="Choose company size"
                      name="companySize"
                      error={errors.companySize}
                    />
                  </div>

                  {/* Hiring focus */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Hiring focus
                    </label>
                    <input
                      {...register('hiringFocus')}
                      type="text"
                      placeholder="Your hiring focus"
                      className="w-full lg:max-w-[65%] px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-sm hover:bg-gray-50"
                    />
                    {errors.hiringFocus && (
                      <p className="mt-1 text-xs text-red-600">{errors.hiringFocus.message}</p>
                    )}
                  </div>

                  {/* Primary office location */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Primary office location
                    </label>
                    <input
                      {...register('officeLocation')}
                      type="text"
                      placeholder="Office location"
                      className="w-full lg:max-w-[65%] px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-sm hover:bg-gray-50"
                    />
                    {errors.officeLocation && (
                      <p className="mt-1 text-xs text-red-600">{errors.officeLocation.message}</p>
                    )}
                  </div>

                  {/* Website/LinkedIn URL */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Website/LinkedIn URL
                    </label>
                    <input
                      {...register('website')}
                      type="url"
                      placeholder="Your website link or LinkedIn profile link"
                      className="w-full lg:max-w-[65%] px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-sm hover:bg-gray-50 min-h-[70px] resize-y"
                    />
                    {errors.website && (
                      <p className="mt-1 text-xs text-red-600">{errors.website.message}</p>
                    )}
                  </div>

                  {/* Navigation */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-3 lg:mt-12 sm:mt-5">
                    <button
                      type="button"
                      onClick={() => navigate(-1)}
                      className="flex items-center justify-center sm:justify-start gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-100 w-full sm:w-auto"
                    >
                      <FaArrowLeftLong className="text-lg" />
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-[#508F11] hover:bg-green-700 text-white font-medium rounded-full py-2.5 px-6 sm:px-8 text-sm sm:text-base transition-colors shadow-md w-full sm:w-auto"
                    >
                      Complete registration
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="hidden lg:block lg:w-1/2">
              <div className="relative w-full aspect-4/5 xl:aspect-square rounded-3xl overflow-hidden ">
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

      {/* Verification Modal with Dark Overlay */}
      {showVerification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-60 px-4">
          <div className="w-full max-w-xl">
            <Verification />
          </div>
        </div>
      )}
    </>
  );
}