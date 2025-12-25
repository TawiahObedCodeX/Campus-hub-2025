import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './PhoneInput.css'; // Keep your custom styles if needed
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import Googlebtn from '../assets/Icons/Google.svg';
import Formbg from '../assets/BGIMAGE/formbg2.png';

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const password = watch('password', '');

  const requirements = [
    { id: 1, check: () => password.length >= 8, text: '≥ 8 characters' },
    { id: 2, check: () => /[A-Z]/.test(password), text: '1 uppercase' },
    { id: 3, check: () => /[a-z]/.test(password), text: '1 lowercase' },
    { id: 4, check: () => /\d/.test(password), text: '1 number' },
    { id: 5, check: () => /[!@#$%^&*(),.?":{}|<>]/.test(password), text: '1 special char' },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [transientError, setTransientError] = useState('');
  const [justCompleted, setJustCompleted] = useState(false);

  useEffect(() => {
    let step = 0;
    let outOfOrder = false;

    for (let i = 0; i < requirements.length; i++) {
      if (requirements[i].check()) {
        if (i === step) step = i + 1;
        else if (i > step) outOfOrder = true;
      } else break;
    }

    if (outOfOrder && step < requirements.length) {
      setTransientError('Follow steps in order');
      setTimeout(() => setTransientError(''), 2500);
      return;
    }

    setTransientError('');

    if (step > currentStep) {
      setJustCompleted(true);
      setTimeout(() => setJustCompleted(false), 600);
    }

    setCurrentStep(step);
  }, [password]);

  const allComplete = currentStep >= requirements.length;

  const onSubmit = async (data) => {
    if (!allComplete) return;
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5002/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          phone: data.phone,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('token', result.token);
        navigate('/onboarding/role');
      } else {
        setError(result.message || 'Signup failed');
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50">
      {/* Header / Logo - can be added if you want to match Login */}
      {/* <div className="pt-4 px-4 lg:pt-6 lg:px-12">
        <img src={Weblogo} alt="Logo" className="h-8 sm:h-10 lg:h-16 w-auto" />
      </div> */}

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-6 lg:py-0">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-center">
          {/* Form side – no card background */}
          <div className="w-full lg:w-5/12 max-w-md">
            {/* Header */}
            <div className="text-center mb-6">
              <p className="mt-2 text-gray-600">Create your account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Email</label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  placeholder="example@email.com"
                  className="w-full px-4 h-10 sm:h-11 rounded-full border border-gray-300 text-sm focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none transition"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Phone</label>
                <PhoneInput
                  international
                  defaultCountry="GH"
                  value={phone}
                  onChange={(value) => {
                    setPhone(value || '');
                    setValue('phone', value || '', { shouldValidate: true });
                  }}
                  className="custom-phone-input w-full h-10 sm:h-11 rounded-full border border-gray-300 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-200 outline-none transition px-4 text-sm"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Password</label>
                <div className="relative">
                  <input
                    {...register('password', { required: 'Password is required' })}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    className="w-full px-4 pr-12 h-10 sm:h-11 rounded-full border border-gray-300 text-sm focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <BsEyeSlash className="w-5 h-5" /> : <BsEye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Password feedback */}
                <div className="mt-2 min-h-6 text-xs">
                  {transientError && (
                    <p className="text-red-600 font-medium animate-pulse">⚠️ {transientError}</p>
                  )}
                  {!transientError && currentStep < requirements.length && (
                    <div className="flex items-center text-gray-600">
                      <span className="text-base mr-2">{justCompleted ? '✓' : '→'}</span>
                      <span>{requirements[currentStep].text}</span>
                    </div>
                  )}
                  {!transientError && allComplete && password.length > 0 && (
                    <div className="flex items-center text-green-600">
                      <span className="text-base mr-2">✓</span>
                      <span>Strong password!</span>
                    </div>
                  )}
                </div>

                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Confirm Password</label>
                <div className="relative">
                  <input
                    {...register('confirmPassword', {
                      required: 'Please confirm password',
                      validate: (val) => val === password || "Passwords don't match",
                    })}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Re-enter password"
                    className="w-full px-4 pr-12 h-10 sm:h-11 rounded-full border border-gray-300 text-sm focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <BsEyeSlash className="w-5 h-5" /> : <BsEye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Error */}
              {error && (
                <p className="text-sm text-red-600 text-center bg-red-50 py-2 rounded-xl">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={!allComplete || loading}
                className={`w-full h-11 text-white font-medium rounded-full transition shadow-md ${
                  allComplete && !loading
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {loading ? 'Creating...' : 'Sign Up'}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-gray-500 text-sm">or</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            {/* Google */}
            <button
              type="button"
              className="w-full h-11 flex items-center justify-center gap-3 border border-gray-300 rounded-full hover:bg-gray-50 transition text-sm"
            >
              <img src={Googlebtn} alt="Google" className="w-5 h-5" />
              <span className="font-medium text-gray-800">Continue with Google</span>
            </button>

            {/* Footer */}
            <div className="text-center text-sm text-gray-600 mt-6 space-y-2">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-green-600 hover:underline">
                  Log in
                </Link>
              </p>
              <p>
                By continuing, you agree to our{' '}
                <span className="underline">Terms</span> &{' '}
                <span className="underline">Privacy Policy</span>
              </p>
            </div>
          </div>

          {/* Larger image side */}
          <div className="hidden lg:block lg:w-7/12 max-w-3xl">
            <img
              src={Formbg}
              alt="Illustration"
              className="w-full h-auto object-contain rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}