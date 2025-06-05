import React, { useState } from 'react';

const Contacts = () => {
  // In a real application, this data would be fetched from an API
  const [contactInfo, setContactInfo] = useState({
    phone: '(+63) 921-555-1234', // Example number
    email: 'jaru.jardeleza@example.com',
    // You could add more fields like primary contact name, alternate phone, etc.
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(contactInfo); // State for form inputs during editing
  const [errors, setErrors] = useState({}); // State for validation errors

  const handleEditClick = () => {
    setIsEditing(true);
    setFormData(contactInfo); // Populate form with current info
    setErrors({}); // Clear any previous errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for the current field as user types
    if (errors[name]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\(\+\d{2}\)\s\d{3}-\d{3}-\d{4}$/.test(formData.phone.trim())) {
      // Basic regex for (+XX) XXX-XXX-XXXX format
      newErrors.phone = 'Invalid phone number format. Expected: (+XX) XXX-XXX-XXXX';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      // Basic regex for email format
      newErrors.email = 'Invalid email address format.';
    }
    return newErrors;
  };

  const handleSaveClick = (e) => {
    e.preventDefault(); // Prevent default form submission
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // In a real app, you would send formData to your backend API
    // If API call is successful:
    setContactInfo(formData); // Update displayed info
    setIsEditing(false);     // Exit editing mode
    alert('Contact information updated successfully!');
    // If API call fails, handle error (e.g., set specific error message)
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setErrors({}); // Clear errors when canceling
  };

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">Contact Information</h2>

      {isEditing ? (
        // Editing mode
        <form onSubmit={handleSaveClick}>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
              Phone Number:
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phone ? 'border-red-500' : ''}`}
              placeholder="(+63) 9XX-XXX-XXXX"
            />
            {errors.phone && <p className="text-red-500 text-xs italic mt-1">{errors.phone}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancelClick}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        // Viewing mode
        <div className="text-gray-700 text-lg">
          <div className="mb-3">
            <span className="font-semibold text-gray-800">Phone: </span>
            {contactInfo.phone || 'N/A'}
          </div>
          <div className="mb-6">
            <span className="font-semibold text-gray-800">Email: </span>
            {contactInfo.email || 'N/A'}
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleEditClick}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200"
            >
              Edit Contact Info
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;