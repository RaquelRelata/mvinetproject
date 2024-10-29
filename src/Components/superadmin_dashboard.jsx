import React, { useState } from 'react';
import { IoMdNotifications, IoMdAnalytics, IoMdSettings } from 'react-icons/io';
import { CgProfile, CgCalendar, CgBell } from 'react-icons/cg';
import { FiMessageSquare } from 'react-icons/fi';
import { MdCardMembership } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import TBIAdminRegistration from './TBIAdminRegistration'; 
import { Link } from 'react-router-dom';


function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false); // New state for modal

  const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);

  const sections = [
    { id: 'dashboard', label: 'Dashboard', icon: IoMdAnalytics },
    { id: 'memberslist', label: 'Members List', icon: MdCardMembership },
    { id: 'adminpanel', label: 'Admin Panel', icon: GrUserAdmin },
    { id: 'calendar', label: 'Calendar', icon: CgCalendar },
    { id: 'messages', label: 'Messages', icon: FiMessageSquare },
    { id: 'notifications', label: 'Notifications', icon: CgBell },
    { id: 'profile', label: 'Profile', icon: CgProfile },
    { id: 'settings', label: 'Settings', icon: IoMdSettings },
  ];

  return (
    <div className="flex h-screen relative">
      {/* Sidebar */}
      <nav className={`bg-gray-50 h-full transition-all duration-300 ${isSidebarExpanded ? 'w-64' : 'w-20'} flex-shrink-0`}>
        <div className="flex justify-end p-4">
          <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none">☰</button>
        </div>
        <ul className="mt-5 space-y-4">
          {sections.map((section) => (
            <li 
              key={section.id} 
              className={`flex items-center p-4 cursor-pointer text-gray-700 hover:bg-gray-100 ${activeSection === section.id ? 'bg-blue-100' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <section.icon className="text-2xl" />
              {isSidebarExpanded && <span className="ml-4">{section.label}</span>}
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-grow bg-gray-100 p-5">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-xl font-bold">Superadmin Dashboard</h1>
          
          {/* Profile Menu */}
          <div className="relative">
            <div className="flex items-center space-x-4">
              <div>
                <button onClick={() => setShowNotifications(!showNotifications)} className="text-gray-700 focus:outline-none">
                  <IoMdNotifications className="text-2xl" />
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded">
                    <div className="p-4">No new notifications</div>
                  </div>
                )}
              </div>

              {/* Profile button */}
              <div>
                <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center space-x-2 focus:outline-none">
                  <img src="\src\assets\superadminProfile.jpg" alt="Profile" className="w-10 h-10 rounded-full" />
                  <span>Raquel Relata</span>
                </button>

                {/* Profile dropdown menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                    <ul className="py-2">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">View Profile</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Account Settings</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Notifications</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Help Center</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <Link to="/Nav" className="block">Logout</Link>
                      </li>

                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section content based on active section */}
        <div>
          {activeSection === 'dashboard' && <div>Dashboard Content</div>}
          {activeSection === 'Members List' && <div>Dashboard Content</div>}
          {activeSection === 'adminpanel' && (
            <div>
              {/* Admin Panel Header with + Add Admin Button on the Right */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Admin Panel</h2>
                <button 
                  onClick={() => setShowAddAdminModal(true)} 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  + Add Admin
                </button>
              </div>
              
              {/* Admin Panel Content */}
              <div>Admin Panel Content</div>
            </div>
          )}
          {activeSection === 'calendar' && <div>Calendar Content</div>}
          {activeSection === 'messages' && <div>Messages Content</div>}
          {activeSection === 'notifications' && <div>Notifications Content</div>}
          {activeSection === 'profile' && <div>Profile Content</div>}
          {activeSection === 'settings' && <div>Settings Content</div>}
        </div>
      </div>

      {/* Modal for TBIAdminRegistration */}
      {showAddAdminModal && (
        <TBIAdminRegistration onClose={() => setShowAddAdminModal(false)} />
      )}
    </div>
  );
}

export default App;
