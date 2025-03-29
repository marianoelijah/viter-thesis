import React from "react";

const ModalDetails = ({ isOpen, onClose, details, category }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">{category} Details</h2>
        <p><strong>Title:</strong> {details?.category_title}</p>
        <p><strong>Status:</strong> {details?.category_is_active ? "Active" : "Inactive"}</p>
        <p><strong>Description:</strong> {details?.category_description || "No description available."}</p>
        <p><strong>Category:</strong> {category}</p>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetails;
