import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { BsArrowLeft, BsArrowRight, BsSearch, BsCheck } from 'react-icons/bs';
import { universities, studyLevels, programsByFaculty } from '../Data/universitiesData';

export default function OnboardingStep4() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [programSearch, setProgramSearch] = useState('');
  const [showProgramSuggestions, setShowProgramSuggestions] = useState(false);
  const programInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const selectedUniversity = watch('university');
  const selectedFaculty = watch('faculty');

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        programInputRef.current &&
        !programInputRef.current.contains(event.target)
      ) {
        setShowProgramSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get available faculties based on selected university
  const availableFaculties = useMemo(() => {
    if (!selectedUniversity) return [];
    const university = universities.find((u) => u.id === selectedUniversity);
    return university?.faculties || [];
  }, [selectedUniversity]);

  // Get available programs based on selected faculty
  const availablePrograms = useMemo(() => {
    if (!selectedFaculty) return [];
    return programsByFaculty[selectedFaculty] || [];
  }, [selectedFaculty]);

  // Filter programs based on search input
  const filteredPrograms = useMemo(() => {
    if (!programSearch.trim()) return availablePrograms;
    const searchLower = programSearch.toLowerCase();
    return availablePrograms.filter((program) =>
      program.toLowerCase().includes(searchLower)
    );
  }, [programSearch, availablePrograms]);

  const onSubmit = (data) => {
    console.log('Onboarding Step 4 Data:', data);
    // Save the data (you can add API call here if needed)
    // Navigate to skills selection page
    navigate('/onboarding/skills');
  };

  const handleProgramSelect = (program) => {
    setValue('program', program, { shouldValidate: true });
    setProgramSearch(program);
    setShowProgramSuggestions(false);
  };

  const handleProgramInputChange = (e) => {
    const value = e.target.value;
    setProgramSearch(value);
    setValue('program', value, { shouldValidate: true });
    setShowProgramSuggestions(true);
  };

  return (
    <div className="min-h-screen w-screen bg-white overflow-y-auto">
      <div className="flex flex-col items-center justify-center px-4 py-12 min-h-screen">
        <div className="w-full max-w-md">
          {/* Progress Indicator - 5 steps */}
          <div className="mb-10 flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  step <= 4
                    ? 'bg-Green-100'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-Green-100 mb-2">
              Tell us about your education
            </h1>
            <p className="text-base text-gray-700 font-medium">
              Select your university and program details
            </p>
          </div>

          {/* Form Container */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Field 1: University Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Name of university
              </label>
              <div className="relative">
                <select
                  {...register('university', {
                    required: 'Please select your university',
                  })}
                  className="w-full px-4 h-12 rounded-4xl border border-gray-300 focus:border-Green-100 focus:ring-2 focus:ring-Green-100 outline-none text-sm bg-white appearance-none pr-10"
                  onChange={(e) => {
                    setValue('university', e.target.value, { shouldValidate: true });
                    // Reset faculty and program when university changes
                    setValue('faculty', '', { shouldValidate: false });
                    setValue('program', '', { shouldValidate: false });
                    setProgramSearch('');
                  }}
                >
                  <option value="">Select your university</option>
                  {universities.map((uni) => (
                    <option key={uni.id} value={uni.id}>
                      {uni.name} ({uni.abbreviation})
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.university && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.university.message}
                </p>
              )}
            </div>

            {/* Field 2: Faculty/College Selection (Cascading) */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Faculty/College of Study
              </label>
              {selectedUniversity === 'other' ? (
                <input
                  type="text"
                  {...register('faculty', {
                    required: selectedUniversity === 'other' ? 'Please enter your faculty/college' : false,
                  })}
                  placeholder="Enter your faculty/college"
                  className="w-full px-4 h-12 rounded-4xl border border-gray-300 focus:border-Green-100 focus:ring-2 focus:ring-Green-100 outline-none text-sm bg-white"
                  onChange={(e) => {
                    setValue('faculty', e.target.value, { shouldValidate: true });
                    setValue('program', '', { shouldValidate: false });
                    setProgramSearch('');
                  }}
                />
              ) : (
                <div className="relative">
                  <select
                    {...register('faculty', {
                      required: selectedUniversity !== 'other' ? 'Please select your faculty/college' : false,
                    })}
                    disabled={!selectedUniversity || availableFaculties.length === 0}
                    className={`w-full px-4 h-12 rounded-4xl border border-gray-300 focus:border-Green-100 focus:ring-2 focus:ring-Green-100 outline-none text-sm bg-white appearance-none pr-10 ${
                      !selectedUniversity || availableFaculties.length === 0
                        ? 'bg-gray-100 cursor-not-allowed opacity-60'
                        : ''
                    }`}
                    onChange={(e) => {
                      setValue('faculty', e.target.value, { shouldValidate: true });
                      // Reset program when faculty changes
                      setValue('program', '', { shouldValidate: false });
                      setProgramSearch('');
                    }}
                  >
                    <option value="">
                      {!selectedUniversity
                        ? 'Select university first'
                        : availableFaculties.length === 0
                        ? 'No faculties available'
                        : 'Select your faculty/college'}
                    </option>
                    {availableFaculties.map((faculty) => (
                      <option key={faculty} value={faculty}>
                        {faculty}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              )}
              {errors.faculty && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.faculty.message}
                </p>
              )}
            </div>

            {/* Field 3: Current Academic Level */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Current academic level
              </label>
              <div className="relative">
                <select
                  {...register('level', {
                    required: 'Please select your level of study',
                  })}
                  className="w-full px-4 h-12 rounded-4xl border border-gray-300 focus:border-Green-100 focus:ring-2 focus:ring-Green-100 outline-none text-sm bg-white appearance-none pr-10"
                >
                  <option value="">Level</option>
                  {studyLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.level && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.level.message}
                </p>
              )}
            </div>

            {/* Field 4: Program/Course Selection (Searchable Combobox) */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Program/Course of Study
              </label>
              <div className="relative" ref={programInputRef}>
                {selectedUniversity !== 'other' && availablePrograms.length > 0 && (
                  <BsSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                )}
                <input
                  type="text"
                  value={programSearch}
                  onChange={handleProgramInputChange}
                  onFocus={() => {
                    if (selectedFaculty && availablePrograms.length > 0 && selectedUniversity !== 'other') {
                      setShowProgramSuggestions(true);
                    }
                  }}
                  placeholder={
                    !selectedFaculty
                      ? 'Select faculty first'
                      : selectedUniversity === 'other'
                      ? 'Enter your program/course of study'
                      : 'Type to search your program (e.g., Civil Engineering)'
                  }
                  disabled={selectedUniversity !== 'other' && (!selectedFaculty || availablePrograms.length === 0)}
                  className={`w-full ${selectedUniversity !== 'other' && availablePrograms.length > 0 ? 'pl-12' : 'pl-4'} pr-4 h-12 rounded-4xl border border-gray-300 focus:border-Green-100 focus:ring-2 focus:ring-Green-100 outline-none text-sm ${
                    selectedUniversity !== 'other' && (!selectedFaculty || availablePrograms.length === 0)
                      ? 'bg-gray-100 cursor-not-allowed opacity-60'
                      : 'bg-white'
                  }`}
                />
                <input
                  type="hidden"
                  {...register('program', {
                    required: 'Please select or enter your program',
                  })}
                />
              </div>

              {/* Suggestions Dropdown - Only show for non-other universities with available programs */}
              {showProgramSuggestions &&
                selectedFaculty &&
                selectedUniversity !== 'other' &&
                availablePrograms.length > 0 &&
                filteredPrograms.length > 0 && (
                  <div
                    ref={suggestionsRef}
                    className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-y-auto"
                  >
                    {filteredPrograms.map((program, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleProgramSelect(program)}
                        className="w-full text-left px-4 py-3 hover:bg-lightGreen-100 transition-colors text-sm border-b border-gray-100 last:border-b-0 first:rounded-t-xl last:rounded-b-xl"
                      >
                        {program}
                      </button>
                    ))}
                  </div>
                )}

              {errors.program && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.program.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-14 bg-Green-100 hover:bg-green-600 text-white font-semibold rounded-4xl transition-all duration-200 shadow-sm hover:shadow-md mt-8"
            >
              Click to continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

