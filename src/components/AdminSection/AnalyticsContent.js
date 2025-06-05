import React, { useState, useEffect } from 'react';

// --- AnalyticsContent component (remains mostly the same, only StatCard usage changes slightly) ---
const AnalyticsContent = () => {
  // --- State for Data and UI Controls ---
  const [salesData, setSalesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('30days');

  // --- Mock Data (includes trend values for StatCards) ---
  const mockAnalyticsData = {
    '7days': {
      totalRevenue: { value: 25780.50, trend: { value: 3.1, type: 'increase' } },
      totalOrders: { value: 210, trend: { value: 1.5, type: 'increase' } },
      averageOrderValue: { value: 122.76, trend: { value: 0.8, type: 'decrease' } },
      conversionRate: { value: 3.10, trend: { value: 0.2, type: 'increase' } },
      topSellingProduct: { name: 'Compact Sling Bag', sales: 350, revenue: 8750 },
      customerDemographics: { female: 55, male: 45, others: 0 },
      trafficSources: { organic: 60, socialMedia: 25, paid: 15 },
      recentSales: [
        { id: 'S001', product: 'Elegant Tote Bag', amount: 49.99, date: '2025-06-04' },
        { id: 'S002', product: 'Travel Duffle Bag', amount: 75.00, date: '2025-06-03' },
        { id: 'S003', product: 'Stylish Backpack', amount: 34.00, date: '2025-06-03' },
        { id: 'S004', product: 'Compact Sling Bag', amount: 25.99, date: '2025-06-02' },
      ],
    },
    '30days': {
      totalRevenue: { value: 152345.67, trend: { value: 2.3, type: 'increase' } },
      totalOrders: { value: 1289, trend: { value: 1.1, type: 'increase' } },
      averageOrderValue: { value: 118.19, trend: { value: 0.5, type: 'decrease' } },
      conversionRate: { value: 2.35, trend: { value: 0.1, type: 'increase' } },
      topSellingProduct: { name: 'Elegant Tote Bag (Leather)', sales: 1500, revenue: 75000 },
      customerDemographics: { female: 60, male: 40, others: 0 },
      trafficSources: { organic: 70, socialMedia: 20, paid: 10 },
      recentSales: [
        { id: 'S005', product: 'Laptop Messenger', amount: 65.00, date: '2025-05-30' },
        { id: 'S006', product: 'Backpack Pro', amount: 90.00, date: '2025-05-28' },
        { id: 'S007', product: 'Small Clutch', amount: 15.00, date: '2025-05-25' },
        { id: 'S008', product: 'Crossbody Bag', amount: 30.00, date: '2025-05-22' },
      ],
    },
    '90days': {
      totalRevenue: { value: 450123.45, trend: { value: 0.8, type: 'increase' } },
      totalOrders: { value: 3800, trend: { value: 0.2, type: 'increase' } },
      averageOrderValue: { value: 118.45, trend: { value: 0.1, type: 'increase' } },
      conversionRate: { value: 2.15, trend: { value: 0.3, type: 'decrease' } },
      topSellingProduct: { name: 'Premium Leather Briefcase', sales: 3200, revenue: 256000 },
      customerDemographics: { female: 62, male: 38, others: 0 },
      trafficSources: { organic: 65, socialMedia: 25, paid: 10 },
      recentSales: [
        { id: 'S009', product: 'Weekender Duffle', amount: 120.00, date: '2025-04-15' },
        { id: 'S010', product: 'Mini Backpack', amount: 28.00, date: '2025-04-10' },
        { id: 'S011', product: 'Card Holder', amount: 12.00, date: '2025-04-05' },
      ],
    },
  };

  // --- Data Fetching Effect ---
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));

        if (mockAnalyticsData[timeRange]) {
          setSalesData(mockAnalyticsData[timeRange]);
        } else {
          throw new Error('Data not found for selected time range.');
        }

      } catch (err) {
        console.error("Error fetching analytics:", err);
        setError("Failed to load analytics data. Please try again.");
        setSalesData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  // --- Formatting Helpers ---
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(2)}%`;
  };

  // --- Render Logic based on State ---
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 w-full min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-lg shadow-md border border-red-200 w-full min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-red-700 text-xl font-semibold mb-3">Error!</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!salesData) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 w-full min-h-[400px] flex items-center justify-center">
        <p className="text-gray-700 text-lg">No analytics data available for the selected period.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 w-full">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">Sales Analytics Dashboard</h2>

      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <p className="text-gray-600 text-lg">
          Insights for <span className="font-semibold text-gray-800">
            {timeRange === '7days' && 'Last 7 Days'}
            {timeRange === '30days' && 'Last 30 Days'}
            {timeRange === '90days' && 'Last 90 Days'}
          </span>
        </p>
        <div className="flex items-center space-x-2">
          <label htmlFor="timeRange" className="text-gray-700 font-medium text-sm">Time Range:</label>
          <select
            id="timeRange"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md shadow leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            {/* <option value="custom">Custom Range...</option> */}
          </select>
        </div>
      </div>

      {/* Overview Cards - Now using the updated StatCard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Revenue" value={formatCurrency(salesData.totalRevenue.value)} icon="attach_money" color="text-green-600" trend={salesData.totalRevenue.trend} onClick={() => console.log('View Revenue Details')} />
        <StatCard title="Total Orders" value={salesData.totalOrders.value} icon="shopping_cart" color="text-blue-600" trend={salesData.totalOrders.trend} onClick={() => console.log('View Order Details')} />
        <StatCard title="Avg. Order Value" value={formatCurrency(salesData.averageOrderValue.value)} icon="price_change" color="text-purple-600" trend={salesData.averageOrderValue.trend} onClick={() => console.log('View AOV Details')} />
        <StatCard title="Conversion Rate" value={formatPercentage(salesData.conversionRate.value)} icon="trending_up" color="text-orange-600" trend={salesData.conversionRate.trend} onClick={() => console.log('View Conversion Details')} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Selling Product */}
        <div className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <span className="material-symbols-outlined mr-2 text-yellow-600">star</span>
            Top Selling Product
          </h3>
          <p className="text-gray-800 text-lg">
            <strong className="font-bold">{salesData.topSellingProduct.name}</strong>
          </p>
          <p className="text-gray-600 text-sm mt-1">
            Units Sold: {salesData.topSellingProduct.sales} | Revenue: {formatCurrency(salesData.topSellingProduct.revenue)}
          </p>
          <div className="mt-4">
            {/* Placeholder for a small chart showing sales trend of this product */}
            <p className="text-gray-500 text-xs">Sales trend over selected period (placeholder chart)</p>
            <div className="h-16 bg-blue-100 rounded-md flex items-end overflow-hidden">
              <div className="w-1/4 h-1/2 bg-blue-400"></div>
              <div className="w-1/4 h-3/4 bg-blue-400"></div>
              <div className="w-1/4 h-2/3 bg-blue-400"></div>
              <div className="w-1/4 h-full bg-blue-400"></div>
            </div>
          </div>
        </div>

        {/* Customer Demographics - with simple bar chart */}
        <div className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <span className="material-symbols-outlined mr-2 text-indigo-600">people</span>
            Customer Demographics
          </h3>
          <div className="space-y-3">
            {Object.entries(salesData.customerDemographics).map(([gender, percentage]) => (
              percentage > 0 && (
                <div key={gender} className="flex flex-col">
                  <p className="text-gray-700 text-sm font-medium capitalize mb-1">
                    {gender}: {formatPercentage(percentage)}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-indigo-500 h-2.5 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            ))}
          </div>
          {/* Placeholder for a pie chart here */}
          <p className="text-gray-500 text-xs mt-4">More detailed demographics (placeholder chart)</p>
          <div className="h-32 w-32 mx-auto bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs">Pie Chart</div>
        </div>
      </div>

      {/* Traffic Sources & Recent Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources - with simple bar chart */}
        <div className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <span className="material-symbols-outlined mr-2 text-cyan-600">alt_route</span>
            Traffic Sources
          </h3>
          <div className="space-y-3">
            {Object.entries(salesData.trafficSources).map(([source, percentage]) => (
              percentage > 0 && (
                <div key={source} className="flex flex-col">
                  <p className="text-gray-700 text-sm font-medium capitalize mb-1">
                    {source.replace(/([A-Z])/g, ' $1').trim()}: {formatPercentage(percentage)}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-cyan-500 h-2.5 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Recent Sales Activity */}
        <div className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <span className="material-symbols-outlined mr-2 text-teal-600">receipt_long</span>
            Recent Sales Activity
          </h3>
          {salesData.recentSales.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {salesData.recentSales.map(sale => (
                    <tr key={sale.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sale.product}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(sale.amount)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 text-sm">No recent sales to display for this period.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// --- StatCard Component (from previous iteration) ---
const StatCard = ({ title, value, icon, color, trend, onClick }) => {
  const isIncrease = trend && trend.type === 'increase';
  const isDecrease = trend && trend.type === 'decrease';
  const isNoChange = trend && trend.type === 'noChange';

  const trendColor = isIncrease ? 'text-green-600' : (isDecrease ? 'text-red-600' : 'text-gray-500');
  const trendIcon = isIncrease ? 'arrow_upward' : (isDecrease ? 'arrow_downward' : 'remove');
  const cursorClass = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`bg-white p-5 rounded-lg shadow-md border border-gray-200 flex flex-col justify-between
                   transition-all duration-300 ease-in-out transform
                   ${onClick ? 'hover:shadow-lg hover:-translate-y-1' : ''} ${cursorClass}`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3 mb-3"> {/* Adjusted space-x and mb */}
        {/* Smaller icon background and icon size */}
        <div className={`p-3 rounded-full bg-gray-100 ${color}`}>
          <span className="material-symbols-outlined text-3xl">{icon}</span> {/* Reduced icon size */}
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-gray-500 font-medium">{title}</p> {/* Reduced title size */}
          <p className="text-2xl font-bold text-gray-900 leading-snug">{value}</p> {/* Reduced value size, adjusted line-height */}
        </div>
      </div>

      {trend && (
        <div className="flex items-center text-xs font-medium mt-auto"> {/* Reduced trend text size */}
          <span className={`material-symbols-outlined text-sm mr-1 ${trendColor}`}> {/* Reduced trend icon size */}
            {trendIcon}
          </span>
          <span className={`${trendColor}`}>
            {trend.value.toFixed(1)}% vs. last period
          </span>
        </div>
      )}
    </div>
  );
};

export default AnalyticsContent;