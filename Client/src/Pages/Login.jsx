import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { BsArrowLeft, BsEye, BsEyeSlash } from 'react-icons/bs';
import Googlebtn from '../assets/Icons/Google.svg';
import Formbg from '../assets/BGIMAGE/formbg.png';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
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
        if (i === step) step = i + 1;
        else if (i > step) outOfOrder = true;
      } else break;
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
    console.log('Login Data:', data);
  };

  return (
    <div className="min-h-screen w-screen flex flex-col lg:flex-row">
      {/* Form Section - Always visible and centered */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-6">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-Green-100 text-white font-medium hover:bg-green-600 transition"
          >
            <BsArrowLeft className="text-lg" />
            Back
          </Link>

          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-Green-100">Welcome Back!</h1>
            <p className="mt-2 text-gray-600">Login to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                placeholder="makaveliblak@gmail.com"
                className="w-full px-4 h-11 rounded-4xl border border-gray-300 text-sm focus:border-Green-100 focus:ring-2 focus:ring-Green-100 outline-none transition"
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Password</label>
              <div className="relative">
                <input
                  {...register('password', { required: 'Password is required' })}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="w-full px-4 pr-12 h-11 rounded-4xl  border border-gray-300 text-sm focus:border-Green-100 focus:ring-2 focus:ring-Green-100 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                >
                  {showPassword ? <BsEyeSlash className="w-5 h-5" /> : <BsEye className="w-5 h-5" />}
                </button>
              </div>

              {/* Password Requirements Feedback */}
              <div className="mt-3 min-h-10">
                {transientError && (
                  <p className="text-sm text-red-600 font-medium animate-pulse">⚠️ {transientError}</p>
                )}
                {!transientError && currentReq && (
                  <div
                    className={`flex items-center text-sm font-medium ${
                      justCompleted ? 'text-green-600 animate-bounce' : 'text-gray-700'
                    }`}
                  >
                    <span className="mr-2 text-lg">{justCompleted ? '✓' : '→'}</span>
                    <span>{currentReq.text}</span>
                  </div>
                )}
                {!transientError && allComplete && password.length > 0 && (
                  <div className="flex items-center text-sm font-medium text-green-600">
                    <span className="mr-2 text-lg">✓</span>
                    <span>Strong password recognized! 🎉</span>
                  </div>
                )}
              </div>

              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-Green-100 hover:underline font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-11 bg-Green-100 hover:bg-green-600 text-white font-medium rounded-4xl  transition shadow-sm hover:shadow"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">or continue with</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            className="w-full h-12 flex items-center justify-center gap-3 border border-gray-300 rounded-3xl hover:bg-gray-50 transition"
          >
            <img src={Googlebtn} alt="Google" className="w-7 h-7" />
            <span className="text-lg font-medium text-gray-800">Google</span>
          </button>

          {/* Sign Up Link & Terms */}
          <div className="text-center text-sm text-gray-600 space-y-2">
            <p>
              Don’t have an account yet?{' '}
              <Link to="/signup" className="font-medium text-Green-100 hover:underline">
                Sign up
              </Link>
            </p>
            <p className="text-xs">
              By clicking continue, you agree to our{' '}
              <span className="underline">Terms</span> and{' '}
              <span className="underline">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>

      {/* Background Image - Only on large screens */}
      <div
        className="hidden lg:block flex-1 bg-cover bg-center"
        style={{ backgroundImage: `url(${Formbg})` }}
      />
    </div>
  );
}