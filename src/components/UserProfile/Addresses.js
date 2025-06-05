import React, { useState } from 'react';
import AddressForm from './AddressForm'; // Import the new form component

// A simple component to display a single address
const AddressCard = ({ address, isDefault, onSetDefault, onEdit, onDelete }) => {
  return (
    <div className={`relative bg-white shadow-md rounded-lg p-5 mb-4 border ${isDefault ? 'border-blue-500' : 'border-gray-200'}`}>
      {isDefault && (
        <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full absolute -top-3 left-3">
          Default
        </span>
      )}
      <h3 className="text-lg font-medium text-gray-800 mb-1">
        {address.street}
      </h3>
      <p className="text-gray-600 mb-1">
        {address.city}, {address.state} {address.zip}
      </p>
      <p className="text-gray-600">{address.country}</p>

      <div className="mt-4 flex space-x-3 text-sm">
        {!isDefault && (
          <button
            onClick={() => onSetDefault(address.id)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Set as Default
          </button>
        )}
        <button
          onClick={() => onEdit(address.id)}
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(address.id)}
          className="text-red-600 hover:text-red-800 font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const Addresses = () => {
  // In a real application, this data would come from an API or a global state.
  const [addresses, setAddresses] = useState([
    { id: 'addr1', street: '123 Rizal Avenue', city: 'Quezon City', state: 'Metro Manila', zip: '1100', country: 'Philippines', isDefault: true },
    { id: 'addr2', street: '456 Ayala Avenue', city: 'Makati City', state: 'Metro Manila', zip: '1200', country: 'Philippines', isDefault: false },
    { id: 'addr3', street: '789 Session Road', city: 'Baguio City', state: 'Benguet', zip: '2600', country: 'Philippines', isDefault: false },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState(null); // Stores the address object being edited

  const handleSetDefault = (idToSetDefault) => {
    setAddresses(prevAddresses =>
      prevAddresses.map(addr => ({
        ...addr,
        isDefault: addr.id === idToSetDefault,
      }))
    );
    // In a real app, you'd make an API call here
    alert(`Address ${idToSetDefault} set as default successfully!`);
  };

  const handleAddAddress = () => {
    setAddressToEdit(null); // Ensure we're adding a new address, not editing
    setShowForm(true);
  };

  const handleEditAddress = (idToEdit) => {
    const foundAddress = addresses.find(addr => addr.id === idToEdit);
    if (foundAddress) {
      setAddressToEdit(foundAddress);
      setShowForm(true);
    }
  };

  const handleDeleteAddress = (idToDelete) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      const isDefaultDeleted = addresses.find(addr => addr.id === idToDelete && addr.isDefault);
      let updatedAddresses = addresses.filter(addr => addr.id !== idToDelete);

      // If the default address was deleted and there are other addresses, set the first one as default
      if (isDefaultDeleted && updatedAddresses.length > 0) {
        updatedAddresses = updatedAddresses.map((addr, index) => ({
          ...addr,
          isDefault: index === 0, // Set the first remaining address as default
        }));
      } else if (updatedAddresses.length === 0) {
        // If no addresses left, ensure no default is set
        updatedAddresses = [];
      }

      setAddresses(updatedAddresses);
      // In a real app, you'd make an API call here
      alert('Address deleted successfully!');
    }
  };

  const handleSaveAddress = (newOrUpdatedAddress) => {
    if (newOrUpdatedAddress.id) { // Editing existing address
      setAddresses(prevAddresses =>
        prevAddresses.map(addr =>
          addr.id === newOrUpdatedAddress.id ? { ...newOrUpdatedAddress, isDefault: addr.isDefault } : addr
        )
      );
      alert('Address updated successfully!');
    } else { // Adding new address
      const newId = `addr${Date.now()}`; // Simple unique ID generation
      let updatedAddresses = [...addresses, { ...newOrUpdatedAddress, id: newId, isDefault: false }];

      // If this is the *very first* address, make it default
      if (addresses.length === 0) {
        updatedAddresses = [{ ...newOrUpdatedAddress, id: newId, isDefault: true }];
      }

      setAddresses(updatedAddresses);
      alert('Address added successfully!');
    }
    setShowForm(false); // Close the form
    setAddressToEdit(null); // Clear address being edited
    // In a real app, you'd make an API call here to persist changes
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setAddressToEdit(null); // Clear address being edited
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Addresses</h2>

      <button
        onClick={handleAddAddress}
        className="mb-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200"
      >
        Add New Address
      </button>

      {addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map(address => (
            <AddressCard
              key={address.id}
              address={address}
              isDefault={address.isDefault}
              onSetDefault={handleSetDefault}
              onEdit={handleEditAddress}
              onDelete={handleDeleteAddress}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-lg">You haven't added any addresses yet. Click "Add New Address" to get started!</p>
      )}

      {showForm && (
        <AddressForm
          addressToEdit={addressToEdit}
          onSave={handleSaveAddress}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
};

export default Addresses;