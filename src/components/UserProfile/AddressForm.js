import React, { useState, useEffect } from 'react';

const AddressForm = ({ addressToEdit, onSave, onCancel }) => {
  const initialState = {
    id: '', // Will be generated for new addresses, or pre-filled for editing
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    isDefault: false, // Default to false for new addresses, handled by parent for edits
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (addressToEdit) {
      // If we're editing, pre-fill the form with the existing address data
      setFormData(addressToEdit);
    } else {
      // If we're adding a new address, clear the form
      setFormData(initialState);
    }
    // Always clear any previous validation errors when the form opens or switches mode
    setErrors({});
  }, [addressToEdit, initialState]); // Added initialState to the dependency array to resolve linter warning

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // As the user types, clear any validation error specific to that field
    if (errors[name]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    // Check if required fields are empty
    if (!formData.street.trim()) newErrors.street = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State/Province is required';
    if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    // If there are any validation errors, set them and stop the submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // If validation passes, call the onSave prop with the form data
    onSave(formData);
  };

  return (
    // This div creates a full-screen overlay for the modal effect
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {/* Display "Edit Address" or "Add New Address" based on addressToEdit prop */}
          {addressToEdit ? 'Edit Address' : 'Add New Address'}
        </h3>
        <form onSubmit={handleSubmit}>
          {/* Street Address Field */}
          <div className="mb-4">
            <label htmlFor="street" className="block text-gray-700 text-sm font-bold mb-2">
              Street Address:
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.street ? 'border-red-500' : ''}`}
              placeholder="e.g., 123 Main St."
            />
            {/* Display validation error if present */}
            {errors.street && <p className="text-red-500 text-xs italic mt-1">{errors.street}</p>}
          </div>

          {/* City and State/Province Fields (side-by-side) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
                City:
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.city ? 'border-red-500' : ''}`}
                placeholder="e.g., Quezon City"
              />
              {errors.city && <p className="text-red-500 text-xs italic mt-1">{errors.city}</p>}
            </div>
            <div>
              <label htmlFor="state" className="block text-gray-700 text-sm font-bold mb-2">
                State/Province:
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.state ? 'border-red-500' : ''}`}
                placeholder="e.g., Metro Manila"
              />
              {errors.state && <p className="text-red-500 text-xs italic mt-1">{errors.state}</p>}
            </div>
          </div>

          {/* ZIP Code and Country Fields (side-by-side) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="zip" className="block text-gray-700 text-sm font-bold mb-2">
                ZIP Code:
              </label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.zip ? 'border-red-500' : ''}`}
                placeholder="e.g., 1100"
              />
              {errors.zip && <p className="text-red-500 text-xs italic mt-1">{errors.zip}</p>}
            </div>
            <div>
              <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">
                Country:
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.country ? 'border-red-500' : ''}`}
                placeholder="e.g., Philippines"
              />
              {errors.country && <p className="text-red-500 text-xs italic mt-1">{errors.country}</p>}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onCancel} // Call the onCancel prop when clicked
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200"
            >
              {/* Button text changes based on mode */}
              {addressToEdit ? 'Save Changes' : 'Add Address'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;