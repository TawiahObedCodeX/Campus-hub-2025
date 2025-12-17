import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OnboardingSkills() {
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState([]);

  const availableSkills = [
    'Web development',
    'Back-end',
    'UI/UX Design',
    'Graphic design',
    'Photography',
    'Front-end',
    'Leadership',
    'Social media Influencer',
    'Campus hypeman',
    'Copy-writing',
    'Event organizer',
    'DJ'
  ];

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      // Remove skill
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      // Add skill (max 3)
      if (selectedSkills.length < 3) {
        setSelectedSkills([...selectedSkills, skill]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected Skills:', selectedSkills);
    
    // Clear onboarding data from localStorage when onboarding is completed
    localStorage.removeItem('onboarding_student_id');
    
    // Navigate to next step or complete onboarding
    // navigate('/onboarding/complete');
    // For now, navigate to home or dashboard
    navigate('/');
  };

  const handleSkip = () => {
    // Clear onboarding data from localStorage when onboarding is completed
    localStorage.removeItem('onboarding_student_id');
    
    // Navigate to next step or complete onboarding
    // navigate('/onboarding/complete');
    // For now, navigate to home or dashboard
    navigate('/');
    console.log('Skipped skills selection');
  };

  return (
    <div className="min-h-screen w-screen bg-white overflow-y-auto">
      <div className="flex flex-col items-center justify-center px-4 py-12 min-h-screen">
        <div className="w-full max-w-2xl">
          {/* Progress Indicator - 5 steps */}
          <div className="mb-10 flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  step <= 5
                    ? 'bg-Green-100'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-Green-100 mb-6">
              Help us personal your experience even better!
            </h1>
            <p className="text-base md:text-lg text-gray-900 font-medium">
              Choose your top 3 skills
            </p>
          </div>

          {/* Skills Grid */}
          <form onSubmit={handleSubmit} className="mb-12">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8">
              {availableSkills.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    disabled={!isSelected && selectedSkills.length >= 3}
                    className={`px-4 py-3 md:py-4 rounded-xl transition-all duration-200 text-sm md:text-base font-medium ${
                      isSelected
                        ? 'bg-Green-100 text-white'
                        : selectedSkills.length >= 3
                        ? 'bg-gray-200 text-white opacity-50 cursor-not-allowed'
                        : 'bg-gray-200 text-white hover:bg-gray-300'
                    }`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                type="button"
                onClick={handleSkip}
                className="text-gray-900 font-medium hover:text-Green-100 transition-colors"
              >
                Skip for now
              </button>
              <button
                type="submit"
                disabled={selectedSkills.length === 0}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  selectedSkills.length > 0
                    ? 'bg-Green-100 text-white hover:bg-green-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

