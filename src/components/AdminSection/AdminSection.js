import React from 'react';
import AddProductForm from './AddProductForm';
import ProductListTable from './ProductListTable';
import DashboardOverview from './DashboardOverview';
import AnalyticsContent from './AnalyticsContent';

const AdminSection = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AddProductForm />
        <ProductListTable />
        <DashboardOverview />
        <AnalyticsContent />
      </div>
    </div>
  );
};

export default AdminSection;