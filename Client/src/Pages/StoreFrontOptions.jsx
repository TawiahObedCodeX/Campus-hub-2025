import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo/Logo2.svg';
import Formbg from '../assets/BGIMAGE/storefront.png';
import { FaArrowLeftLong, FaChevronDown } from "react-icons/fa6";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

// Import Verification component (adjust path if needed)
import Verification from './Verification'; // e.g., same folder or correct relative path

// Validation Schema
const schema = yup.object().shape({
  storeName: yup.string().required('Store name is required'),
  category: yup.string().required('Please select a category'),
  operatingHours: yup.string().required('Please select operating hours'),
  campusCoverage: yup.string().required('Please select a campus'),
  deliveryCapability: yup.string().required('Please select delivery capability'),
});

// Reusable Custom Select Component
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

export default function MerchantProfile() {
  const navigate = useNavigate();
  const [showVerification, setShowVerification] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      storeName: '',
      category: '',
      operatingHours: '',
      campusCoverage: '',
      deliveryCapability: '',
    },
    mode: 'onChange',
  });

  // Watch values for custom selects
  const categoryValue = watch('category');
  const operatingHoursValue = watch('operatingHours');
  const campusCoverageValue = watch('campusCoverage');
  const deliveryCapabilityValue = watch('deliveryCapability');

  const onSubmit = async (data) => {
    const isValid = await trigger();
    if (!isValid) return;

    console.log('Merchant Form Submitted:', data);
    // In real app: send data to backend here

    // Show verification modal
    setShowVerification(true);
  };

  // Options for dropdowns
  const categoryOptions = [
    { value: 'Food & Beverage', label: 'Food & Beverage' },
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Fashion', label: 'Fashion' },
    { value: 'Services', label: 'Services' },
    { value: 'Groceries', label: 'Groceries' },
  ];

  const operatingHoursOptions = [
    { value: '07:00 - 21:00', label: '07:00 - 21:00' },
    { value: '08:00 - 22:00', label: '08:00 - 22:00' },
    { value: '09:00 - 23:00', label: '09:00 - 23:00' },
    { value: '10:00 - 00:00', label: '10:00 - 00:00' },
    { value: '24 hours', label: '24 hours' },
  ];

  const campusCoverageOptions = [
    { value: 'KNUST Main Campus', label: 'KNUST Main Campus' },
    { value: 'UG Main Campus', label: 'UG Main Campus' },
    { value: 'KsTU', label: 'KsTU' },
    { value: 'UHAS', label: 'UHAS' },
    { value: 'UENR', label: 'UENR' },
  ];

  const deliveryCapabilityOptions = [
    { value: 'I have my own riders', label: 'I have my own riders' },
    { value: 'I need Hub delivery', label: 'I need Hub delivery' },
    { value: 'Pickup only', label: 'Pickup only' },
  ];

  return (
    <>
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 lg:gap-12">
            {/* Left side - Compact Form */}
            <div className="w-full lg:w-1/2 flex flex-col space-y-4 sm:space-y-5 max-w-md lg:max-w-lg mx-auto lg:mx-0">
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
                    className={`h-1 flex-1 rounded-full ${step <= 3 ? 'bg-green-600' : 'bg-gray-200'}`}
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

                <h2 className="text-xl font-semibold text-center text-gray-800">Merchant / Vendor’s Profile</h2>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                  {/* Store Name */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Store name
                    </label>
                    <input
                      {...register('storeName')}
                      type="text"
                      placeholder="e.g. Mommy's Kitchen"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-sm hover:bg-gray-50"
                    />
                    {errors.storeName && (
                      <p className="mt-1 text-xs text-red-600">{errors.storeName.message}</p>
                    )}
                  </div>

                  {/* Category & Operating Hours */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <CustomSelect
                      label="Category"
                      options={categoryOptions}
                      value={categoryValue}
                      onChange={(e) => setValue('category', e.target.value, { shouldValidate: true })}
                      placeholder="Select category"
                      name="category"
                      error={errors.category}
                    />

                    <CustomSelect
                      label="Operating hours"
                      options={operatingHoursOptions}
                      value={operatingHoursValue}
                      onChange={(e) => setValue('operatingHours', e.target.value, { shouldValidate: true })}
                      placeholder="Select operating hours"
                      name="operatingHours"
                      error={errors.operatingHours}
                    />
                  </div>

                  {/* Campus Coverage */}
                  <div className="lg:w-[65%] md:w-[65%] w-full">
                    <CustomSelect
                      label="Campus coverage"
                      options={campusCoverageOptions}
                      value={campusCoverageValue}
                      onChange={(e) => setValue('campusCoverage', e.target.value, { shouldValidate: true })}
                      placeholder="Which campus do you serve?"
                      name="campusCoverage"
                      error={errors.campusCoverage}
                    />
                  </div>

                  {/* Delivery Capability */}
                  <div className="lg:w-[65%] md:w-[65%] w-full">
                    <CustomSelect
                      label="Delivery capability"
                      options={deliveryCapabilityOptions}
                      value={deliveryCapabilityValue}
                      onChange={(e) => setValue('deliveryCapability', e.target.value, { shouldValidate: true })}
                      placeholder="Tell us your delivery capability"
                      name="deliveryCapability"
                      error={errors.deliveryCapability}
                    />
                  </div>

                  {/* Navigation */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-3 mt-4 sm:mt-5">
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
                      disabled={isSubmitting}
                      className="bg-green-600 hover:bg-green-700 text-white font-medium rounded-full py-2.5 px-6 sm:px-8 text-sm sm:text-base transition-colors shadow-md w-full sm:w-auto disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting...' : 'Complete registration'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="hidden lg:block lg:w-1/2">
              <div className="relative w-full aspect-4/5 xl:aspect-square rounded-3xl overflow-hidden shadow-2xl">
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