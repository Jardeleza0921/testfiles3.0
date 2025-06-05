import React, { useState } from 'react';

const ProfileInfo = () => {
  // --- Main Profile Data State ---
  const [profileData, setProfileData] = useState({
    firstName: 'Jaru',
    lastName: 'Iori',
    email: 'jaru.jardeleza@example.com',
    gender: 'Female',
    birthDate: '1995-03-20',
    profilePicture: 'https://via.placeholder.com/150/F87171/FFFFFF?text=JP', // Default/placeholder image
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profileData);
  const [errors, setErrors] = useState({});

  // --- Change Password State ---
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordMessage, setPasswordMessage] = useState('');

  // --- Profile Picture Upload State ---
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(profileData.profilePicture);
  const [uploadMessage, setUploadMessage] = useState('');

  // --- Handlers for Main Profile Info ---
  const handleEditClick = () => {
    setIsEditing(true);
    setFormData(profileData);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = 'Invalid email address format.';
    }
    if (formData.birthDate && !/^\d{4}-\d{2}-\d{2}$/.test(formData.birthDate)) {
      newErrors.birthDate = 'Date format should be YYYY-MM-DD.';
    }
    return newErrors;
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulate API call for saving profile data
    try {
      // In a real app: await fetch('/api/user/profile', { method: 'PUT', body: JSON.stringify(formData) });
      setProfileData(prev => ({...prev, ...formData})); // Only update changed fields, keep profilePicture etc.
      setIsEditing(false);
      alert('Profile information updated successfully!');
    } catch (error) {
      console.error("Error saving profile:", error);
      alert('An error occurred while saving profile information.');
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setErrors({});
    setFormData(profileData);
  };

  // --- Handlers for Change Password ---
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    });
    setPasswordErrors(prevErrors => {
      const newErrors = { ...prevErrors };
      delete newErrors[name];
      return newErrors;
    });
    setPasswordMessage(''); // Clear message on input change
  };

  const validatePasswordForm = () => {
    const errors = {};
    if (!passwordForm.currentPassword) errors.currentPassword = 'Current password is required.';
    if (!passwordForm.newPassword) {
      errors.newPassword = 'New password is required.';
    } else if (passwordForm.newPassword.length < 8) {
      errors.newPassword = 'New password must be at least 8 characters long.';
    }
    if (!passwordForm.confirmNewPassword) {
      errors.confirmNewPassword = 'Confirm new password is required.';
    }
    if (passwordForm.newPassword && passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      errors.confirmNewPassword = 'New password and confirmation do not match.';
    }
    if (passwordForm.currentPassword && passwordForm.newPassword && passwordForm.currentPassword === passwordForm.newPassword) {
      errors.newPassword = 'New password cannot be the same as current password.';
    }
    return errors;
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const validationErrors = validatePasswordForm();
    if (Object.keys(validationErrors).length > 0) {
      setPasswordErrors(validationErrors);
      return;
    }

    // Simulate API call for changing password
    try {
      // In a real app: await fetch('/api/user/change-password', { method: 'POST', body: JSON.stringify(passwordForm) });
      setPasswordMessage('Password changed successfully!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' }); // Clear form
      // alert('Password changed successfully!'); // Or use a less intrusive notification
    } catch (error) {
      setPasswordMessage('Failed to change password. Please try again.');
      console.error("Error changing password:", error);
    }
  };

  // --- Handlers for Profile Picture ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file)); // Create a local URL for preview
      setUploadMessage('');
    } else {
      setSelectedFile(null);
      setImagePreview(profileData.profilePicture);
    }
  };

  const handleUploadPicture = async () => {
    if (!selectedFile) {
      setUploadMessage('Please select a file first.');
      return;
    }

    setUploadMessage('Uploading...');
    // Simulate file upload API call
    try {
      // In a real app, you'd send `selectedFile` via FormData to your backend
      // const formData = new FormData();
      // formData.append('profileImage', selectedFile);
      // const response = await fetch('/api/user/profile-picture', { method: 'POST', body: formData });
      // const data = await response.json();
      // const newImageUrl = data.imageUrl; // Get the new image URL from response

      // Simulate a successful upload
      const newImageUrl = URL.createObjectURL(selectedFile); // Use local URL for demo

      setProfileData(prev => ({ ...prev, profilePicture: newImageUrl }));
      setImagePreview(newImageUrl);
      setSelectedFile(null); // Clear selected file
      setUploadMessage('Profile picture updated successfully!');

      // Clean up the object URL after the image has loaded if using local URLs for preview
      // URL.revokeObjectURL(imagePreview); // If imagePreview was also a blob URL
    } catch (error) {
      setUploadMessage('Failed to upload picture. Please try again.');
      console.error("Error uploading picture:", error);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-8"> {/* Added space-y for section separation */}
      {/* --- Profile Information Section --- */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">Profile Information</h2>

        {isEditing ? (
          // Editing mode for profile info
          <form onSubmit={handleSaveClick}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.firstName ? 'border-red-500' : ''}`}
                  placeholder="Jaru" />
                {errors.firstName && <p className="text-red-500 text-xs italic mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.lastName ? 'border-red-500' : ''}`}
                  placeholder="Iori" />
                {errors.lastName && <p className="text-red-500 text-xs italic mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                placeholder="your.email@example.com" />
              {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">Gender:</label>
                <select id="gender" name="gender" value={formData.gender} onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.gender ? 'border-red-500' : ''}`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
                {errors.gender && <p className="text-red-500 text-xs italic mt-1">{errors.gender}</p>}
              </div>
              <div>
                <label htmlFor="birthDate" className="block text-gray-700 text-sm font-bold mb-2">Birth Date:</label>
                <input type="date" id="birthDate" name="birthDate" value={formData.birthDate} onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.birthDate ? 'border-red-500' : ''}`}
                />
                {errors.birthDate && <p className="text-red-500 text-xs italic mt-1">{errors.birthDate}</p>}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button type="button" onClick={handleCancelClick}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200">
                Cancel
              </button>
              <button type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200">
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          // Viewing mode for profile info
          <div className="text-gray-700 text-lg">
            <div className="mb-3">
              <span className="font-semibold text-gray-800">Name: </span>
              {profileData.firstName} {profileData.lastName}
            </div>
            <div className="mb-3">
              <span className="font-semibold text-gray-800">Email: </span>
              {profileData.email}
            </div>
            <div className="mb-3">
              <span className="font-semibold text-gray-800">Gender: </span>
              {profileData.gender || 'N/A'}
            </div>
            <div className="mb-6">
              <span className="font-semibold text-gray-800">Birth Date: </span>
              {profileData.birthDate || 'N/A'}
            </div>

            <div className="flex justify-end">
              <button onClick={handleEditClick}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200">
                Edit Profile Info
              </button>
            </div>
          </div>
        )}
      </div>

      {/* --- Profile Picture Section --- */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">Profile Picture</h2>
        <div className="flex flex-col items-center justify-center space-y-4">
          <img
            src={imagePreview}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-lg"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full max-w-xs text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
          />
          {selectedFile && (
            <button
              onClick={handleUploadPicture}
              className="mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200"
            >
              Upload Picture
            </button>
          )}
          {uploadMessage && <p className="text-sm font-medium text-center mt-2">{uploadMessage}</p>}
        </div>
      </div>

      {/* --- Change Password Section --- */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">Change Password</h2>
        <form onSubmit={handleChangePassword}>
          <div className="mb-4">
            <label htmlFor="currentPassword" className="block text-gray-700 text-sm font-bold mb-2">Current Password:</label>
            <input type="password" id="currentPassword" name="currentPassword" value={passwordForm.currentPassword} onChange={handlePasswordChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${passwordErrors.currentPassword ? 'border-red-500' : ''}`} />
            {passwordErrors.currentPassword && <p className="text-red-500 text-xs italic mt-1">{passwordErrors.currentPassword}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">New Password:</label>
            <input type="password" id="newPassword" name="newPassword" value={passwordForm.newPassword} onChange={handlePasswordChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${passwordErrors.newPassword ? 'border-red-500' : ''}`} />
            {passwordErrors.newPassword && <p className="text-red-500 text-xs italic mt-1">{passwordErrors.newPassword}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="confirmNewPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm New Password:</label>
            <input type="password" id="confirmNewPassword" name="confirmNewPassword" value={passwordForm.confirmNewPassword} onChange={handlePasswordChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${passwordErrors.confirmNewPassword ? 'border-red-500' : ''}`} />
            {passwordErrors.confirmNewPassword && <p className="text-red-500 text-xs italic mt-1">{passwordErrors.confirmNewPassword}</p>}
          </div>

          <div className="flex justify-end">
            <button type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200">
              Change Password
            </button>
          </div>
          {passwordMessage && <p className="text-sm font-medium text-center mt-3">{passwordMessage}</p>}
        </form>
      </div>

      {/* --- Other Potential Sections (future additions) --- */}
      {/*
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">Account Deactivation</h2>
        <p className="text-gray-700 mb-4">
          If you wish to temporarily deactivate or permanently delete your account,
          please proceed with caution. This action cannot always be undone.
        </p>
        <button className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg">
          Deactivate Account
        </button>
      </div>
      */}
    </div>
  );
};

export default ProfileInfo;