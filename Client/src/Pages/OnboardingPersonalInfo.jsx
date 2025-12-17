import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function OnboardingPersonalInfo() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Personal Info:', data);
    // Navigate to next step (you can update this route as needed)
    navigate('/onboarding/student-id');
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-md">
        {/* Progress Indicator - 5 steps */}
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                step <= 2 ? "bg-Green-100" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-Green-100 text-center mb-8">
          Tell us about yourself
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* First name */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              First name
            </label>
            <input
              {...register('firstName', { required: 'First name is required' })}
              type="text"
              placeholder="John"
              className="w-full px-4 h-12 rounded-4xl border border-gray-300 focus:border-Green-100 focus:ring-2 focus:ring-Green-100 outline-none text-sm"
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          {/* Surname */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Surname
            </label>
            <input
              {...register('surname', { required: 'Surname is required' })}
              type="text"
              placeholder="John"
              className="w-full px-4 h-12 rounded-4xl border border-gray-300 focus:border-Green-100 focus:ring-2 focus:ring-Green-100 outline-none text-sm"
            />
            {errors.surname && (
              <p className="mt-1 text-xs text-red-600">{errors.surname.message}</p>
            )}
          </div>

          {/* Other name */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Other name
            </label>
            <input
              {...register('otherName')}
              type="text"
              placeholder="John"
              className="w-full px-4 h-12 rounded-4xl border border-gray-300 focus:border-Green-100 focus:ring-2 focus:ring-Green-100 outline-none text-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 bg-Green-100 text-white font-medium rounded-4xl hover:bg-green-600 transition cursor-pointer"
          >
            Click to continue
          </button>
        </form>
      </div>
    </div>
  );
}

