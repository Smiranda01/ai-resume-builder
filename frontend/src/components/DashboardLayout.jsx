// src/components/DashboardLayout.jsx
import React, { useState } from 'react';

const DashboardLayout = ({ children }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-white shadow-lg transition-all fixed md:static inset-y-0 z-50 ${openSidebar ? 'w-64' : 'w-20 md:w-64'} duration-300`}>
        <div className="p-4 flex justify-between items-center border-b">
          <h1 className={`text-xl font-bold text-purple-600 ${openSidebar || window.innerWidth >= 768 ? 'opacity-100' : 'hidden'}`}>AI Resume Builder</h1>
          <button onClick={() => setOpenSidebar(!openSidebar)} className="md:hidden p-2 rounded-full hover:bg-gray-200">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        <nav className="py-4">
          <ul className="space-y-2">
            <li>
              <button
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors ${activeSection === 'dashboard' && 'bg-gray-100'}`}
                onClick={() => setActiveSection('dashboard')}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors ${activeSection === 'create' && 'bg-gray-100'}`}
                onClick={() => setActiveSection('create')}
              >
                Create Resume
              </button>

            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors ${activeSection === 'profile' && 'bg-gray-100'}`}
                onClick={() => setActiveSection('profile')}
              >
                Profile
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Top bar toggle on mobile */}
        <div className="md:hidden flex justify-between mb-4">
          <h1 className="text-xl font-bold">AI Resume Builder</h1>
          <button onClick={() => setOpenSidebar(!openSidebar)} className="p-2 rounded hover:bg-gray-200">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Slot: dynamic children passed by pages */}
        {children(activeSection)}
      </main>
    </div>
  );
};

export default DashboardLayout;
