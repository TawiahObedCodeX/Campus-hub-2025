import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { useLocation, useNavigate } from 'react-router-dom';
import Video from '../assets/Icons/video.svg';
import { TfiClose } from "react-icons/tfi";
import Copy from "../assets/Icons/Copy.svg";

export default function JoinMeeting() {
  const location = useLocation();
  const navigate = useNavigate();
  const { editMeeting, editIndex } = location.state || {};
  const isEdit = !!editMeeting;

  const [showCreateModal, setShowCreateModal] = useState(!!editMeeting);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [meetingLink, setMeetingLink] = useState('');
  const [showToast, setShowToast] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (showCreateModal || showSuccessModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => document.body.style.overflow = 'unset';
  }, [showCreateModal, showSuccessModal]);

  useEffect(() => {
    if (isEdit) {
      setValue('title', editMeeting.title);
      setValue('host', editMeeting.host);
      setValue('date', editMeeting.date);
      setValue('time', editMeeting.time);
      setValue('duration', editMeeting.duration);
      setValue('attendees', editMeeting.attendees);
    }
  }, [isEdit, editMeeting, setValue]);

  const onSubmit = (data) => {
    if (isEdit) {
      const updatedMeeting = {
        title: data.title,
        host: data.host || "You",
        category: "Study Session",
        date: data.date,
        time: data.time,
        duration: data.duration || 2,
        attendees: data.attendees || 10,
        link: editMeeting.link // Keep existing link
      };

      let meetings = JSON.parse(localStorage.getItem('meetings')) || [];
      meetings[editIndex] = updatedMeeting;
      localStorage.setItem('meetings', JSON.stringify(meetings));

      navigate('/vmeet/scheduledmeet');
    } else {
      const fakeLink = `https://virtualmeet.example.com/meeting/${nanoid(10)}`;
      setMeetingLink(fakeLink);

      const newMeeting = {
        title: data.title,
        host: data.host || "You",
        category: "Study Session",
        date: data.date,
        time: data.time,
        duration: data.duration || 2,
        attendees: data.attendees || 10,
        link: fakeLink
      };

      let meetings = JSON.parse(localStorage.getItem('meetings')) || [];
      meetings.push(newMeeting);
      localStorage.setItem('meetings', JSON.stringify(meetings));

      setShowCreateModal(false);
      setShowSuccessModal(true);
      reset();
    }
  };

  const handleCloseCreate = () => {
    setShowCreateModal(false);
    reset();
    if (isEdit) {
      navigate('/vmeet/scheduledmeet');
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    setMeetingLink('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(meetingLink);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className='flex flex-col justify-center px-4'>
      {/* Header */}
      <div className="mt-8 flex justify-between items-center flex-wrap gap-7">
        <div className="flex flex-col">
          <h1 className='text-Green-100 text-xl md:text-3xl font-semibold font-montserrat-regular'>Virtual Meet</h1>
        <p className='text-base md:text-xl mt-2'>Connect with classmates through video calls and virtual co-working space</p>
        </div>
        <div className="">
           <button
             onClick={() => setShowCreateModal(true)}
           className='px-5 bg-Green-100 w-full max-w-[179px] h-[60px] rounded-xl cursor-pointer text-white font-medium'>
            Book A Session 
           </button>
        </div>
      </div>

      {/* Join / Create Section */}
      <div className='mt-8 md:mt-[50px] border border-[#D9D9D9] w-full max-w-[860px] h-[344px] rounded-2xl flex flex-col gap-8 justify-center items-center'>
        <div className="flex flex-col justify-center gap-3 text-center">
          <h1 className='text-Green-100 text-lg md:text-2xl font-montserrat-regular'>Join a Meeting</h1>
          <p>Enter meeting ID or paste link to join</p>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-6 items-center">
          <div className='lg:w-[520px] md:w-[520px] max-w-[520px] border border-[#D9D9D9] h-[60px] rounded-xl flex items-center px-4'>
            <input
              type="text"
              className='outline-none w-full'
              placeholder='Enter meeting ID or paste link'
            />
          </div>
          <button
            className='px-5  bg-Green-100 w-full max-w-[179px] h-[60px] rounded-xl cursor-pointer text-white font-medium'
          >
            Join Now
          </button>
        </div>
      </div>

      {/* ==================== COMPACT CREATE MEETING MODAL (NO SCROLL) ==================== */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">{isEdit ? 'Edit Meeting' : 'Create New Meeting'}</h2>
              <button
                onClick={handleCloseCreate}
                className="text-[#FF6C2D] hover:text-red-600 transition"
              >
                <TfiClose size={24} />
              </button>
            </div>

            {/* Compact Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 flex flex-col gap-4">
              <div className='grid grid-cols-2 gap-4'>
                {/* Meeting Title */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Meeting Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Database Design Group Project"
                    className="border border-[#D9D9D9] rounded-lg px-4 py-3 outline-none focus:border-Green-100 text-sm"
                    {...register('title', { required: 'Meeting title is required' })}
                  />
                  {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                </div>

                {/* Host Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Host Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Mensah"
                    className="border border-[#D9D9D9] rounded-lg px-4 py-3 outline-none focus:border-Green-100 text-sm"
                    {...register('host', { required: 'Host name is required' })}
                  />
                  {errors.host && <p className="text-red-500 text-xs">{errors.host.message}</p>}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    className="border border-[#D9D9D9] rounded-lg px-4 py-3 outline-none focus:border-Green-100 text-sm"
                    {...register('date', { required: 'Date is required' })}
                  />
                  {errors.date && <p className="text-red-500 text-xs">{errors.date.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Time</label>
                  <input
                    type="time"
                    className="border border-[#D9D9D9] rounded-lg px-4 py-3 outline-none focus:border-Green-100 text-sm"
                    {...register('time', { required: 'Time is required' })}
                  />
                  {errors.time && <p className="text-red-500 text-xs">{errors.time.message}</p>}
                </div>
              </div>

              {/* Duration & Attendees (smaller inputs) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Duration (hrs)</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="2"
                    className="border border-[#D9D9D9] rounded-lg px-4 py-3 outline-none focus:border-Green-100 text-sm"
                    {...register('duration', { valueAsNumber: true, min: { value: 1 } })}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Attendees</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="23"
                    className="border border-[#D9D9D9] rounded-lg px-4 py-3 outline-none focus:border-Green-100 text-sm"
                    {...register('attendees', { valueAsNumber: true, min: { value: 1 } })}
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-3 bg-Green-100 text-white font-semibold py-3.5 rounded-xl hover:bg-Green-200 transition"
              >
                {isEdit ? 'Update Meeting' : 'Create Meeting'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal (unchanged) */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex flex-col justify-center items-center z-50 px-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-lg">
            <div className="flex justify-between items-center p-6 pb-4 border-b">
              <h2 className="text-xl font-semibold">Here is your joining info</h2>
              <button onClick={handleCloseSuccess} className="text-[#FF6C2D] hover:text-[#ff8a50]">
                <TfiClose size={24} />
              </button>
            </div>
            <div className="p-6 pt-8 flex flex-col gap-6">
              <p className="text-gray-600 leading-relaxed text-center">
                Copy this meeting link and send to people you want to meet with.<br />
                Be sure to save it for later use.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-100 rounded-xl px-4 py-3 text-gray-700 text-sm break-all">
                  {meetingLink}
                </div>
                <button
                  onClick={copyToClipboard}
                  className="p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                  <img src={Copy} alt="Copy" />
                </button>
              </div>
            </div>
          </div>
          <div className={`mt-4 bg-white px-4 py-2 rounded-lg shadow transition-all duration-500 ease-in-out ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-28'}`}>
            Link copied to clipboard!
          </div>
        </div>
      )}
    </div>
  );
}