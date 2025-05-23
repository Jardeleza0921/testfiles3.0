import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import AdminManagementSidebar from './components/AdminSection/AdminManagementSidebar';
import DashboardOverview from './components/AdminSection/DashboardOverview';
import AddProductForm from './components/AdminSection/AddProductForm';
import ProductListTable from './components/AdminSection/ProductListTable';
import AnalyticsContent from './components/AdminSection/AnalyticsContent';
import LogoutSection from './components/LogoutSection';
import CreateAdmin from './components/AdminSection/CreateAdmin';
import ManageAdmins from './components/AdminSection/ManageAdmins';

const AdminApp = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAdminManagementSidebarOpen, setIsAdminManagementSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleAdminManagementSidebar = () => {
    setIsAdminManagementSidebarOpen(!isAdminManagementSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header onToggleSidebar={toggleSidebar} />
      <div className="flex flex-grow max-w-7xl w-full mx-auto mt-16 rounded-lg shadow-xl relative"> {/* Added relative positioning */}
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div className={`flex-grow p-4 ${isSidebarOpen ? 'ml-64' : ''} ${isAdminManagementSidebarOpen ? 'mr-64' : ''}`}>
          <Routes>
            <Route path="/dashboard" element={<DashboardOverview />} />
            <Route path="/add-product" element={<AddProductForm />} />
            <Route path="/products" element={<ProductListTable />} />
            <Route path="/analytics" element={<AnalyticsContent />} />
            <Route path="/logout" element={<LogoutSection onLogout={onLogout} />} />
            <Route path="/create-admin" element={<CreateAdmin />} />
            <Route path="/manage-admins" element={<ManageAdmins />} />
            <Route path="/" element={<DashboardOverview />} />
            <Route path="*" element={<div className="p-4 text-center"><h1 className="text-3xl font-bold mb-4 text-gray-800">Admin Content Not Found</h1><p className="text-lg text-gray-600">The specific admin content you are looking for does not exist.</p></div>} />
          </Routes>
        </div>
        <AdminManagementSidebar isAdminManagementSidebarOpen={isAdminManagementSidebarOpen} />
        {/* Toggle button for the admin management sidebar */}
        <button
          onClick={toggleAdminManagementSidebar}
          className="fixed bottom-4 right-4 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none z-30 flex items-center"
        >
          <span className="material-symbols-outlined text-xl mr-2">settings</span> {/* Settings/Cog icon */}
          {isAdminManagementSidebarOpen ? 'Hide Admin Mgmt' : 'Show Admin Mgmt'}
        </button>
      </div>
    </div>
  );
};

export default AdminApp;