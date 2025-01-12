import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const MaintenanceModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  services,
  organizations,
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [startTime, setStartTime] = useState(initialData?.start_time || "");
  const [endTime, setEndTime] = useState(initialData?.end_time || "");
  const [selectedServices, setSelectedServices] = useState(
    initialData?.services.map((service) => service.id) || []
  );
  const [organizationId, setOrganizationId] = useState(
    initialData?.organization?.id || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      start_time: startTime,
      end_time: endTime,
      service_ids: selectedServices,
      organization_id: organizationId,
    });
  };

  const handleServiceChange = (id) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Maintenance" : "Schedule Maintenance"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
          <div className="mb-4">
            <label className="block text-gray-700">Services</label>
            <div className="flex flex-wrap gap-2">
              {services.map((service) => (
                <label key={service.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={service.id}
                    checked={selectedServices.includes(service.id)}
                    onChange={() => handleServiceChange(service.id)}
                  />
                  <span>{service.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Start Time</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">End Time</label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
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

export default MaintenanceModal;
