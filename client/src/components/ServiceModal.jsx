import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const ServiceModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  organizations,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [status, setStatus] = useState(initialData?.status || "operational");
  const [organizationId, setOrganizationId] = useState(
    initialData?.organization_id || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, status, organization_id: organizationId });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Service" : "Create Service"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="operational">Operational</option>
              <option value="degraded_performance">Degraded Performance</option>
              <option value="partial_outage">Partial Outage</option>
              <option value="major_outage">Major Outage</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Organization</label>
            <select
              value={organizationId}
              onChange={(e) => setOrganizationId(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            >
              <option value="">Select an organization</option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
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

export default ServiceModal;
