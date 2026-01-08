import Logoicon from '../assets/Logo/Logo2.svg';
import Notification from '../assets/Icons/notificationicon.svg';
import UserProfile from '../assets/BGIMAGE/userprofile.png';
import { IoIosArrowDown } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import Video from "../assets/Icons/video.svg";
import Calender from "../assets/Icons/graycalendar.svg";
import Voice from "../assets/Icons/voicesquare.svg";
import People from "../assets/Icons/people.svg";
import Settings from "../assets/Icons/setting.svg";
import Support from "../assets/Icons/headphone.svg";
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';

const menuItems = [
  { label: 'Join meeting', path: '/vmeet/joinmeeting', Icon: Video },
  { label: 'Scheduled meeting', path: '/vmeet/scheduledmeet', Icon: Calender },
  { label: 'Active Sessions', path: '/vmeet/activesessions', Icon: Voice },
  { label: 'Co-working rooms', path: '/vmeet/co-working', Icon: People },
];

const bottomItems = [
  { label: 'Support', path: '/vmeet/support', Icon: Support },
  { label: 'Settings', path: '/vmeet/settings', Icon: Settings },
];

export default function VMeetLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header - Fixed */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-300 shadow-sm">
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-3 sm:py-2">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <img 
              src={Logoicon} 
              alt="CampusHub Logo" 
              className="h-10 sm:h-12 md:h-14 lg:h-16" 
            />
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-green-600">
              CampusHub
            </h1>
          </div>

          {/* Right Side: Notification + User */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleSidebar}
              className="p-2 lg:hidden text-2xl text-gray-700 hover:bg-gray-100 rounded-lg"
              aria-label="Toggle menu"
            >
              <IoMenu />
            </button>

            {/* Notification */}
            <img 
              src={Notification} 
              alt="Notifications" 
              className="hidden sm:block h-9 w-9 sm:h-10 sm:w-10 cursor-pointer hover:opacity-80" 
            />

            {/* Divider */}
            <div className="hidden sm:block w-px h-12 bg-gray-300" />

            {/* User Profile */}
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:bg-gray-100 rounded-lg p-1 sm:p-2 -m-1 sm:-m-2 transition">
              <img 
                src={UserProfile} 
                alt="User Profile" 
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover border-2 border-gray-200" 
              />
              <span className="hidden sm:block text-sm sm:text-base font-medium text-gray-800">
                My Account
              </span>
              <IoIosArrowDown className="text-gray-600 text-sm sm:text-base" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout: Sidebar + Content */}
      <div className="flex flex-1 pt-16 sm:pt-20 lg:pt-20">
        {/* Sidebar */}
        <aside
          className={`fixed top-16 sm:top-20 lg:top-20 left-0 z-30 w-72 sm:w-80 bg-white border-r border-gray-300 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } flex flex-col h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] lg:h-[calc(100vh-5rem)]`}
        >
          {/* Sidebar Inner - Full height flex column */}
          <div className="flex flex-col flex-1">
            {/* Main Menu Items - Takes available space */}
            <nav className="flex-1 px-6 py-6 overflow-y-auto">
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-green-100 text-green-700 font-semibold shadow-sm'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`
                    }
                  >
                    <img src={item.Icon} alt={item.label} className="h-6 w-6 shrink-0" />
                    <span className="text-base">{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </nav>

            {/* Bottom Items - Pushed to bottom */}
            <nav className="px-6 py-6 border-t border-gray-200">
              <div className="space-y-2">
                {bottomItems.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-green-100 text-green-700 font-semibold shadow-sm'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`
                    }
                  >
                    <img src={item.Icon} alt={item.label} className="h-6 w-6 shrink-0" />
                    <span className="text-base">{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </nav>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0  bg-opacity-50 z-20 lg:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-5 lg:ml-80 xl:p-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}