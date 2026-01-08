import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Logo from '../assets/Logo/Logo2.svg';
import Formbg from '../assets/BGIMAGE/imgbusiness.png';

export default function JoinasBusiness() {
  const options = [
    { value: 'registered', label: 'Registered company' },
    { value: 'sme', label: 'SME' },
    { value: 'ngo', label: "Non-gov't organization (NGO)" },
    { value: 'campus', label: 'Campus Department' },
    { value: 'individual', label: 'Individual recruiter' },
    { value: 'unregistered', label: 'Unregistered business' },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const dropdownRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    setValue('companyType', selectedOption, { shouldValidate: false });
  }, [selectedOption, setValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onSubmit = async (data) => {
    const isValid = await trigger();
    if (!isValid) return; // Prevent browser auto-scroll
    console.log('Form Data:', { ...data, document: selectedFile });
    // Proceed with submission
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-center gap-8 lg:gap-12">
          {/* Left side - Compact Form */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-5 lg:space-y-8 max-w-md lg:max-w-lg mx-auto lg:mx-0">
            <div className="relative w-full">
              <div className="absolute -bottom-2.5 lg:-bottom-8 sm:-left-6 lg:-left-24 z-10">
                <img src={Logo} alt="Logo" className="h-8 sm:h-10 lg:h-20 w-auto" />
              </div>

              <div className="flex justify-end items-center">
                <Link
                  to="/signin"
                  className="text-xs sm:text-sm text-gray-600 hover:text-green-600 transition-colors whitespace-nowrap"
                >
                  Already have an account? <span className="text-green-600 underline">Sign In</span>
                </Link>
              </div>
            </div>

            <div className="mt-4 sm:mt-6">
              {/* Progress Bar */}
              <div className="flex gap-2 mb-4">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`h-1 flex-1 rounded-full ${step <= 1 ? 'bg-green-600' : 'bg-gray-200'}`}
                  />
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 leading-tight">
                  Let’s get your business<br/> to the audience!
                </h1>

                {/* Business Name */}
                <div className="space-y-1">
                  <label htmlFor="businessName" className="block text-xs sm:text-sm font-medium text-gray-700">
                    Your business name
                  </label>
                  <input
                    id="businessName"
                    {...register('businessName', { required: 'Business name is required' })}
                    className={`w-full px-4 py-2 rounded-lg border text-sm focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none transition h-10 ${
                      errors.businessName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Business name"
                  />
                  {errors.businessName && <p className="text-xs text-red-600">{errors.businessName.message}</p>}
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  <div className="space-y-1">
                    <label htmlFor="businessEmail" className="block text-xs sm:text-sm font-medium text-gray-700">
                      Business email
                    </label>
                    <input
                      id="businessEmail"
                      type="email"
                      {...register('businessEmail', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      className={`w-full px-4 py-2 rounded-lg border text-sm focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none transition h-10 ${
                        errors.businessEmail ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="contact@company.com"
                    />
                    {errors.businessEmail && <p className="text-xs text-red-600">{errors.businessEmail.message}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="phoneNumber" className="block text-xs sm:text-sm font-medium text-gray-700">
                      Official phone number
                    </label>
                    <input
                      id="phoneNumber"
                      type="tel"
                      {...register('phoneNumber', { required: 'Phone number is required' })}
                      className={`w-full px-4 py-2 rounded-lg border text-sm focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none transition h-10 ${
                        errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="233 xxxxxxxx"
                    />
                    {errors.phoneNumber && <p className="text-xs text-red-600">{errors.phoneNumber.message}</p>}
                  </div>
                </div>

                {/* Company Type Dropdown */}
                <div className="relative space-y-1" ref={dropdownRef}>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">Registered Company Type</label>
                  <input
                    type="hidden"
                    {...register('companyType', { required: 'Please select a company type' })}
                  />
                  <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full px-4 py-2 text-left border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-200 transition flex items-center justify-between h-10 ${
                      errors.companyType && !selectedOption ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <span className="truncate">
                      {selectedOption ? options.find((o) => o.value === selectedOption)?.label : 'Select company type'}
                    </span>
                    <svg
                      className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isOpen && (
                    <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                      {options.map((option) => (
                        <li
                          key={option.value}
                          onClick={() => {
                            setSelectedOption(option.value);
                            setIsOpen(false);
                          }}
                          className="px-4 py-2 text-sm text-gray-900 hover:bg-green-50 cursor-pointer transition border-b border-gray-100 last:border-b-0"
                        >
                          {option.label}
                        </li>
                      ))}
                    </ul>
                  )}

                  {errors.companyType && !selectedOption && (
                    <p className="text-xs text-red-600">{errors.companyType.message}</p>
                  )}
                </div>

                {/* File Upload */}
                <div className="space-y-1">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">Verification document</label>
                  <div className="relative">
                    <input
                      type="file"
                      id="document"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 px-10 py-4 border border-dashed border-gray-300 rounded-xl bg-lightGreen-100 hover:bg-green-100 transition min-h-11">
                      <button
                        type="button"
                        className="bg-Green-100 text-white px-4 py-3 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 hover:bg-green-700 transition"
                      >
                        Choose file format
                      </button>
                      <p className="text-xs text-gray-600 font-light text-center sm:text-left">
                        PDF, JPG, PNG (10MB max)
                      </p>
                    </div>
                  </div>
                  {selectedFile && (
                    <div className="text-xs text-gray-700 truncate">
                      <span className="font-medium">{selectedFile.name}</span> (
                      {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB)
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-3">
                  <button
                    type="submit"
                    className="bg-green-600 text-white text-sm font-medium py-3 px-8 rounded-full hover:bg-green-700 transition"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="hidden lg:block lg:w-1/2">
            <div className="relative w-full h-auto aspect-4/5 xl:aspect-4/4 rounded-2xl overflow-hidden">
              <img
                src={Formbg}
                alt="Business illustration"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-72 inset-0 flex items-center justify-center text-white text-2xl xl:text-3xl font-bold text-center px-8 py-11 drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
                Let’s get your business <br/>to the audience!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}