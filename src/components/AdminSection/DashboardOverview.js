import React from 'react';

const DashboardOverview = () => {
  // Mock data for demonstration purposes
  const stats = [
    { title: 'Total Users', value: '2,500', icon: 'people', color: 'text-blue-500' },
    { title: 'New Orders', value: '150', icon: 'shopping_cart', color: 'text-green-500' },
    { title: 'Pending Reviews', value: '25', icon: 'rate_review', color: 'text-orange-500' },
    { title: 'Products in Stock', value: '1,200', icon: 'inventory_2', color: 'text-purple-500' },
  ];

  const recentActivities = [
    { id: 1, type: 'New User Registered', detail: 'John Doe', time: '2 hours ago' },
    { id: 2, type: 'Order Placed', detail: 'Order #1001 by Jane Smith', time: '5 hours ago' },
    { id: 3, type: 'Product Added', detail: 'New: "Wireless Earbuds Pro"', time: '1 day ago' },
    { id: 4, type: 'Review Submitted', detail: 'Product X reviewed by Alex', time: '2 days ago' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 w-full">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">Admin Dashboard Overview</h2>

      {/* Welcome Message */}
      <div className="mb-8">
        <p className="text-gray-700 text-lg">
          Welcome back, <span className="font-semibold text-blue-600">Admin User</span>!
          Here's a quick look at your store's performance and recent activities.
        </p>
      </div>

      {/* Statistics Cards */}
      <h3 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
        <span className="material-symbols-outlined text-yellow-600 mr-2">insights</span>
        Key Metrics
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4">
            <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
              <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <h3 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
        <span className="material-symbols-outlined text-indigo-600 mr-2">history</span>
        Recent Activity
      </h3>
      <div className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200 mb-8">
        {recentActivities.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {recentActivities.map(activity => (
              <li key={activity.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="text-gray-800 font-medium">{activity.type}</p>
                  <p className="text-gray-600 text-sm">{activity.detail}</p>
                </div>
                <span className="text-gray-500 text-xs">{activity.time}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-sm">No recent activities to display.</p>
        )}
        <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
          View All Activities
        </button>
      </div>

      {/* Quick Actions section has been removed */}

    </div>
  );
};

export default DashboardOverview;