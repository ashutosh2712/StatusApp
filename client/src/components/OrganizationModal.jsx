import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const OrganizationModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Organization" : "Create Organization"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Organization Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button type="button" onClick={onClose} className="bg-gray-500">
              Cancel
            </Button>
            <Button type="submit">{initialData ? "Save" : "Create"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrganizationModal;
