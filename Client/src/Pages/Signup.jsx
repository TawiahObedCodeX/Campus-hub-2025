import React, { useState, useEffect } from 'react';
import Formbg from '../assets/BGIMAGE/formbg.png';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './PhoneInput.css';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const [phone, setPhone] = useState('');

  const password = watch('password', '');

  const requirements = [
    { id: 1, check: () => password.length >= 8, text: 'Use at least 8 characters' },
    { id: 2, check: () => /[A-Z]/.test(password), text: 'Add one uppercase letter (A-Z)' },
    { id: 3, check: () => /[a-z]/.test(password), text: 'Add one lowercase letter (a-z)' },
    { id: 4, check: () => /\d/.test(password), text: 'Include one number (0-9)' },
    { id: 5, check: () => /[!@#$%^&*(),.?":{}|<>]/.test(password), text: 'Add one special character (!@# etc.)' },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [transientError, setTransientError] = useState('');
  const [justCompleted, setJustCompleted] = useState(false);

  useEffect(() => {
    let step = 0;
    let outOfOrder = false;

    for (let i = 0; i < requirements.length; i++) {
      if (requirements[i].check()) {
        if (i === step) {
          step = i + 1;
        } else if (i > step) {
          outOfOrder = true;
        }
      } else {
        break;
      }
    }

    if (outOfOrder && step < requirements.length) {
      setTransientError('Please follow the steps in order');
      setTimeout(() => setTransientError(''), 3000);
      return;
    }

    setTransientError('');

    if (step > currentStep) {
      setJustCompleted(true);
      setTimeout(() => setJustCompleted(false), 800);
    }

    setCurrentStep(step);
  }, [password]);

  const allComplete = currentStep >= requirements.length;
  const currentReq = currentStep < requirements.length ? requirements[currentStep] : null;

  const onSubmit = (data) => {
    if (!allComplete) return;
    console.log('Submitted:', data);
  };

  return (
    <div className="h-screen w-screen flex flex-col lg:flex-row overflow-hidden">
      <div className="flex-1 flex items-center justify-center px-4 py-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-Green-100">Welcome to CampusHub</h1>
            <p className="mt-2 text-gray-600">Create your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-800">Email</label>
              <input
                {...register('email', { required: 'Email is required' })}
                type="email"
                placeholder="makaveliblak@gmail.com"
                className="mt-1 w-full px-4 h-11 rounded-4xl  border border-gray-300 focus:border-Green-100 focus:ring-2 focus:ring-Green-100 outline-none text-sm"
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-800">Phone number</label>
              <PhoneInput
                international
                defaultCountry="GH"
                value={phone}
                onChange={(value) => {
                  setPhone(value || '');
                  setValue('phone', value || '', { shouldValidate: true });
                }}
                className="mt-1 custom-phone-input "
              />
            </div>

            {/* Create Password */}
            <div>
              <label className="block text-sm font-medium text-gray-800">Create Password</label>
              <div className="relative">
                <input
                  {...register('password', {
                    required: 'Password is required',
                    validate: () => allComplete || 'Please complete all password requirements',
                  })}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="mt-1 block w-full px-5 pr-14 h-12 rounded-4xl border border-gray-300 text-sm focus:border-Green-100 focus:ring-2 focus:ring-Green-100 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-600 hover:text-gray-900"
                >
                  {showPassword ? <BsEyeSlash className="w-5 h-5" /> : <BsEye className="w-5 h-5" />}
                </button>
              </div>

              {/* Single Step Feedback */}
              <div className="mt-4 min-h-10">
                {transientError && (
                  <p className="text-sm text-red-600 font-medium animate-pulse">
                    ⚠️ {transientError}
                  </p>
                )}

                {!transientError && currentReq && (
                  <div
                    className={`flex items-center text-sm font-medium transition-all duration-500 ${
                      justCompleted ? 'text-green-600 animate-bounce' : 'text-gray-700 animate-pulse'
                    }`}
                  >
                    <span className="mr-3 text-lg">{justCompleted ? '✓' : '→'}</span>
                    <span>{currentReq.text}</span>
                  </div>
                )}

                {!transientError && allComplete && password.length > 0 && (
                  <div className="flex items-center text-sm font-medium text-green-600 animate-fadeIn">
                    <span className="mr-3 text-lg">✓</span>
                    <span>Strong password! Well done 🎉</span>
                  </div>
                )}
              </div>

              {errors.password && !transientError && (
                <p className="mt-2 text-xs text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password - Now with real-time mismatch error */}
            <div>
              <label className="block text-sm font-medium text-gray-800">Confirm Password</label>
              <div className="relative">
                <input
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === watch('password') || 'Passwords do not match',
                  })}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  className="mt-1 block w-full px-5 pr-14 h-12 rounded-4xl  border border-gray-300 text-sm focus:border-Green-100 focus:ring-2 focus:ring-Green-100 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-600 hover:text-gray-900"
                >
                  {showConfirmPassword ? <BsEyeSlash className="w-5 h-5" /> : <BsEye className="w-5 h-5" />}
                </button>
              </div>

              {/* Real-time error message */}
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!allComplete}
              className={`w-full h-11 text-white font-medium rounded-4xl  transition ${
                allComplete
                  ? 'bg-Green-100 hover:bg-green-600 cursor-pointer'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Create Account
            </button>
          </form>

          <div className="mt-5 text-center text-sm text-gray-600">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-Green-100 hover:underline">
                Login
              </Link>
            </p>
            <p className="mt-2 text-xs text-gray-500">
              By continuing, you agree to our Terms & Privacy Policy
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block flex-1 bg-cover bg-center" style={{ backgroundImage: `url(${Formbg})` }} />
    </div>
  );
}