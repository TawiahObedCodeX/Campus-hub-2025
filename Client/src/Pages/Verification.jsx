import React from 'react';
import Buzzer from '../assets/BGIMAGE/buzzer.png';
import Verify from '../assets/Icons/verify.svg';

import DocumentReview from '../assets/Icons/document.svg';
import Activation from '../assets/Icons/active.svg';
import Posting from '../assets/Icons/mouse-square.svg';
import { Link } from 'react-router-dom';

export default function Verification() {
  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <div
        className="w-full max-w-xl bg-white lg:shadow-xl  rounded-3xl overflow-hidden flex flex-col relative"
        style={{ height: '95dvh' }} // Uses dynamic viewport height for better mobile support
      >
        {/* Confetti Background - Responsive sizing */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img
            src={Buzzer}
            alt="Confetti"
            className="block max-w-full h-auto"
            style={{
              opacity: 0.7,
              position: 'absolute',
              top: '-8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'clamp(300px, 80vw, 587px)', // Scales down on small screens
              height: 'auto',
            }}
          />
        </div>

        {/* Green Checkmark */}
        <div className="relative pt-8 pb-6 flex justify-center items-center shrink-0 z-20">
          <img
            src={Verify}
            alt="Verified"
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-lg"
          />
        </div>

        {/* Main Content */}
        <div className="px-4 sm:px-6 flex-1 overflow-y-auto flex flex-col relative z-10">
          <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-between py-4">
            <div className="space-y-6">
              {/* Title */}
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-green-600 leading-tight text-center drop-shadow-md">
                Welcome to the Ecosystem.
                <br />
                Your Verification is In Progress.
              </h1>

              <p className="text-gray-500 text-xs sm:text-sm text-center px-2">
                Thank you for submitting your profile. To ensure the safety of our student community, we manually authenticate every external partner.
              </p>

              <h2 className="text-base sm:text-lg font-semibold text-green-600 text-center">
                What Happens Next?
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <img src={DocumentReview} alt="" className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 object-contain" />
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-gray-800">Document Review</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      We are validating your uploaded Identity/Business Documents.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <img src={Activation} alt="" className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 object-contain" />
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-gray-800">Activation</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      You will receive an email/notification once your Partner Badge is active.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <img src={Posting} alt="" className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 object-contain" />
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-gray-800">Start Posting</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Once approved, you can immediately publish Gigs, Events, or Products.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Button at the bottom */}
            <div className="mt-8 mb-6 shrink-0 flex justify-center">
            <Link to='/dashboard'>
                <button className="bg-green-600 text-white py-3 px-8 rounded-full w-full max-w-xs font-semibold hover:bg-green-700 transition text-sm sm:text-base shadow-lg">
                Go To Dashboard
              </button>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}