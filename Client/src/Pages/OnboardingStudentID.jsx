import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsCheckCircle, BsExclamationCircle } from 'react-icons/bs';
import { HiOutlineDocument } from 'react-icons/hi';
import sendSquareIcon from '../assets/Icons/send-square.svg';
import refreshIcon from '../assets/Icons/vuesax/bulk/refresh-2.svg';

export default function OnboardingStudentID() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [uploadData, setUploadData] = useState(() => {
    const savedData = localStorage.getItem('onboarding_student_id');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        if (data.fileName && data.imagePreview && data.uploadStatus === 'completed') {
          // Create a mock file object for display
          const mockFile = {
            name: data.fileName,
            size: data.fileSize || 350000,
            type: data.fileType || 'image/jpeg'
          };
          return {
            selectedFile: mockFile,
            imagePreview: data.imagePreview,
            uploadStatus: 'completed',
            uploadProgress: 100
          };
        }
      } catch (error) {
        console.error('Error restoring saved file:', error);
      }
    }
    return {
      selectedFile: null,
      imagePreview: null,
      uploadProgress: 0,
      uploadStatus: 'idle' // 'idle', 'uploading', 'completed'
    };
  });

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadData(prev => ({ ...prev, selectedFile: file, uploadStatus: 'uploading', uploadProgress: 0 }));

      // Create preview for image files
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const preview = reader.result;
          setUploadData(prev => ({ ...prev, imagePreview: preview }));

          // Save to localStorage
          localStorage.setItem('onboarding_student_id', JSON.stringify({
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            imagePreview: preview,
            uploadStatus: 'completed'
          }));
        };
        reader.readAsDataURL(file);
      } else {
        setUploadData(prev => ({ ...prev, imagePreview: null }));
        // Save PDF info
        localStorage.setItem('onboarding_student_id', JSON.stringify({
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          imagePreview: null,
          uploadStatus: 'completed'
        }));
      }

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadData(prev => {
          const newProgress = prev.uploadProgress + 10;
          if (newProgress >= 100) {
            clearInterval(interval);
            // Update localStorage with completed status
            const savedData = localStorage.getItem('onboarding_student_id');
            if (savedData) {
              const data = JSON.parse(savedData);
              data.uploadStatus = 'completed';
              localStorage.setItem('onboarding_student_id', JSON.stringify(data));
            }
            return { ...prev, uploadProgress: 100, uploadStatus: 'completed' };
          }
          return { ...prev, uploadProgress: newProgress };
        });
      }, 200);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const event = { target: { files: [file] } };
      handleFileSelect(event);
    }
  };


  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + 'B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + 'KB';
    return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
  };

  const handleContinue = () => {
    if (uploadData.uploadStatus === 'completed') {
      navigate('/onboarding/step4');
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center px-4 py-8" style={{ backgroundColor: '#243126' }}>
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 md:p-8">
        {/* Progress Indicator - 5 steps */}
        <div className="mb-10 flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                step <= 3 ? 'bg-Green-100' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-Green-100 mb-2">
            Let's get you started!
          </h1>
          <p className="text-sm md:text-base text-gray-700">
            Upload your student ID
          </p>
        </div>

        {/* File Upload Area */}
        <div
          className="mb-4 p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all"
          style={{ 
            borderColor: '#E8F5E9',
            backgroundColor: '#E8F5E9'
          }}
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,.svg"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center text-center">
            <img 
              src={sendSquareIcon} 
              alt="Upload icon" 
              className="w-16 h-16 mb-3"
            />
            <p className="text-base font-medium text-gray-800 mb-1">
              Click to upload your student ID
            </p>
            <p className="text-xs text-gray-600 mb-0.5">
              Recommended size: 350 by 350
            </p>
            <p className="text-xs text-gray-600">
              File type: PDF, PNG, JPG or SVG
            </p>
          </div>
        </div>

        {/* Uploaded File Display */}
        {uploadData.selectedFile && (
          <div className="mb-4 p-3 bg-white border rounded-2xl" style={{ borderColor: '#E8F5E9' }}>
            <div className="flex items-center gap-3">
              <div className="shrink-0">
                {uploadData.imagePreview ? (
                  <img
                    src={uploadData.imagePreview}
                    alt="Uploaded student ID"
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <HiOutlineDocument className="text-xl text-blue-500" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate mb-1.5">
                  {uploadData.selectedFile.name}
                </p>
                {uploadData.uploadStatus === 'uploading' && (
                  <>
                    <div className="mb-1.5 flex items-center gap-2 text-xs text-gray-500">
                      <span>
                        {Math.round((uploadData.uploadProgress / 100) * (uploadData.selectedFile.size || 350000) / 1024)} of {formatFileSize(uploadData.selectedFile.size || 350000)}
                      </span>
                    </div>
                    <div className="mb-1.5 w-full bg-gray-200 rounded-full h-1">
                      <div
                        className="bg-Green-100 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${uploadData.uploadProgress}%` }}
                      />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <img
                        src={refreshIcon}
                        alt="Uploading"
                        className="w-4 h-4 animate-spin"
                      />
                      <span>Uploading...</span>
                    </div>
                  </>
                )}
                {uploadData.uploadStatus === 'completed' && (
                  <>
                    <div className="mb-1.5 flex items-center gap-2 text-xs text-gray-500">
                      <span>
                        {formatFileSize(uploadData.selectedFile.size || 350000)} of {formatFileSize(uploadData.selectedFile.size || 350000)}
                      </span>
                    </div>
                    <div className="mb-1.5 w-full bg-Green-100 rounded-full h-1" />
                    <div className="flex items-center gap-2 text-sm text-Green-100">
                      <BsCheckCircle />
                      <span className="font-medium">Completed</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Warning/Info Bar */}
        <div 
          className="mb-6 p-3 rounded-2xl flex items-start gap-2.5"
          style={{ backgroundColor: '#FFF3E0' }}
        >
          <div className="shrink-0">
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
              <BsExclamationCircle className="text-orange-500 text-sm" />
            </div>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed">
            Name on student ID should match the name you're using to create this account
          </p>
        </div>

        {/* Continue Button */}
        <button
          type="button"
          onClick={handleContinue}
          disabled={uploadData.uploadStatus !== 'completed'}
          className={`w-full h-12 rounded-4xl font-semibold text-base transition-all duration-200 ${
            uploadData.uploadStatus === 'completed'
              ? 'bg-Green-100 hover:bg-green-600 text-white shadow-md hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Click to continue
        </button>

      </div>
    </div>
  );
}
