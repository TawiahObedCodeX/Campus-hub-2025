import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo/Logo2.svg';
import Formbg from '../assets/BGIMAGE/event.png';
import { FaArrowLeftLong, FaChevronDown } from "react-icons/fa6";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

// Import Verification component (adjust path if needed)
import Verification from './Verification'; // e.g., same folder or correct relative path

// Validation Schema
const schema = yup.object().shape({
  organizationCategory: yup.string().required('Organization category is required'),
  eventType: yup.string().required('Event type is required'),
  ticketing: yup.string().required('Ticketing option is required'),
  needsVirtualRooms: yup.boolean(),
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

export default function HostEventOptions() {
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
      organizationCategory: '',
      eventType: '',
      ticketing: '',
      needsVirtualRooms: false,
    },
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    const isValid = await trigger();
    if (!isValid) return;

    console.log('Event Host Form Submitted:', data);
    // In real app: send to backend here

    // Show success verification modal
    setShowVerification(true);
  };

  // Watch values for custom selects and ticketing
  const organizationCategoryValue = watch('organizationCategory');
  const eventTypeValue = watch('eventType');

  const organizationCategoryOptions = [
    { value: 'training_institute', label: 'Training Institute' },
    { value: 'religious_body', label: 'Religious Body' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'corporate_brand', label: 'Corporate Brand' },
    { value: 'solopreneur', label: 'SoloPreneur' },
  ];

  const eventTypeOptions = [
    { value: 'music_movie_show', label: 'Music/Movie Show' },
    { value: 'tech_bootcamp', label: 'Tech BootCamp' },
    { value: 'webinar', label: 'Webinar' },
    { value: 'concerts', label: 'Concerts' },
    { value: 'career_fairs', label: 'Career Fairs' },
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
              <div className="flex flex-col space-y-9 sm:space-y-9">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 leading-tight">
                  Let’s get your business
                  <br />
                  to the audience!
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-9 lg:space-y-9">
                  {/* Organization Category + Event Type */}
                  <div className="grid grid-cols-1 gap-6">
                    {/* Organization Category */}
                    <div className="lg:w-[70%] w-full">
                      <CustomSelect
                        label="Organization Category"
                        options={organizationCategoryOptions}
                        value={organizationCategoryValue}
                        onChange={(e) => setValue('organizationCategory', e.target.value, { shouldValidate: true })}
                        placeholder="Select category"
                        name="organizationCategory"
                        error={errors.organizationCategory}
                      />
                    </div>

                    {/* Event Type */}
                    <div>
                      <CustomSelect
                        label="Event Type"
                        options={eventTypeOptions}
                        value={eventTypeValue}
                        onChange={(e) => setValue('eventType', e.target.value, { shouldValidate: true })}
                        placeholder="Select event type"
                        name="eventType"
                        error={errors.eventType}
                      />
                      <p className="text-[#FF6C2D6E] text-sm mt-1">Multiselect allowed for this section</p>
                    </div>
                  </div>

                  {/* Ticketing */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <label className="text-xs sm:text-sm font-medium text-gray-700">
                        Ticketing needs
                      </label>
                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => setValue('ticketing', 'free', { shouldValidate: true })}
                          className={`py-2 px-6 text-sm font-medium rounded-full border transition-colors ${
                            watch('ticketing') === 'free'
                              ? 'bg-[#508F11] text-white border-[#508F11]'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          Free Events
                        </button>
                        <button
                          type="button"
                          onClick={() => setValue('ticketing', 'paid', { shouldValidate: true })}
                          className={`py-2 px-6 text-sm font-medium rounded-full border transition-colors ${
                            watch('ticketing') === 'paid'
                              ? 'bg-[#508F11] text-white border-[#508F11]'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          Paid Ticketing
                        </button>
                      </div>
                    </div>
                    {errors.ticketing && (
                      <p className="mt-2 text-xs text-red-600">{errors.ticketing.message}</p>
                    )}
                  </div>

                  {/* Virtual Rooms Toggle */}
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-medium text-gray-700">
                      Need Virtual Webinar Rooms?
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        {...register('needsVirtualRooms')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:bg-green-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
                    </label>
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
              <div className="relative w-full aspect-4/5 xl:aspect-square rounded-3xl overflow-hidden">
                <img
                  src={Formbg}
                  alt="Event illustration"
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