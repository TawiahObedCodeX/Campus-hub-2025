import React, { useState } from 'react';
import { BsCalendar3, BsClock, BsPeople } from "react-icons/bs";
import { MdVideocam } from "react-icons/md";
import { TfiClose } from "react-icons/tfi";
import { useNavigate } from 'react-router-dom';
import Calendar from "../assets/Icons/calendar2.svg"
import Clock from "../assets/Icons/clock1.svg"
import People from "../assets/Icons/people2.svg"


export default function ScheduledMeet() {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('meetings')) || [];
      return stored;
    } catch {
      return [];
    }
  });

  const deleteMeeting = (index) => {
    const updated = meetings.filter((_, i) => i !== index);
    setMeetings(updated);
    localStorage.setItem('meetings', JSON.stringify(updated));
  };

  const deleteAllMeetings = () => {
    setMeetings([]);
    localStorage.removeItem('meetings');
  };

  const editMeeting = (meeting, index) => {
    navigate('/vmeet/joinmeeting', { state: { editMeeting: meeting, editIndex: index } });
  };

  function isToday(dateStr) {
    const today = new Date().toISOString().split('T')[0];
    return dateStr === today;
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }

  function formatTime(timeStr) {
    const [hour, min] = timeStr.split(':');
    const h = parseInt(hour);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hh = h % 12 || 12;
    return `${hh}:${min} ${ampm}`;
  }

  return (
    <div className='flex flex-col px-4'>
      <div>
        <h1 className='text-Green-100 text-xl md:text-3xl font-semibold'>Virtual Meet</h1>
        <p className='text-base md:text-xl'>Connect with classmates through video calls and virtual co-working space</p>
      </div>
      {/* list of upcoming virtual meetings */}
      <div className='mt-8'>
        {/* header */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div>
              <h1 className='text-xl md:text-2xl font-semibold font-montserrat-regular'>Upcoming Meetings</h1>
              <p className='text-xl'>Your scheduled video calls and virtual classes</p>
            </div>
            {meetings.length > 0 && (
              <button
                onClick={deleteAllMeetings}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete All
              </button>
            )}
          </div>
        </div>
        {/* meetings list */}
        <div className="flex flex-col gap-6 mt-8">
          {meetings.length === 0 ? (
            <p className="text-gray-500">No upcoming meetings scheduled.</p>
          ) : (
            meetings.map((meeting, index) => (
              <div key={index} className="bg-white rounded-lg ">
                <div className="bg-green-50 p-2 flex items-center gap-2 h-[7vh]">
                  <img src={Calendar} alt=""  className='h-10'/>
                  <span>{isToday(meeting.date) ? 'Today' : formatDate(meeting.date)} {formatTime(meeting.time)}</span>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold">{meeting.title}</h2>
                  <p className="text-gray-500">Hosted by {meeting.host}</p>
                  <div className="flex items-center gap-7 mt-4">
                    <span className="bg-orange-100 text--range-600 px-3 py-1 rounded-full">{meeting.category}</span>
                    <div className="flex items-center gap-1">
                      <img src={Clock} alt="" />
                      <span>{meeting.duration} hours</span>
                    </div>
                    <div className="flex items-center gap-1">
                       <img src={People} alt="" />
                      <span>{meeting.attendees} Attending</span>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => editMeeting(meeting, index)}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteMeeting(index)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => window.open(meeting.link, '_blank')}
                      className="border-2 border-Green-100  px-4 py-2 rounded flex items-center gap-2"
                    >
                      <MdVideocam />
                      Join
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}