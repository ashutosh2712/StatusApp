import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  fetchServices,
  fetchOrganizations,
  createService,
  updateService,
  deleteService,
} from "@/services/api";
import ServiceModal from "@/components/ServiceModal";

const Services = () => {
  const [services, setServices] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    const loadServicesAndOrganizations = async () => {
      try {
        const servicesResponse = await fetchServices();
        setServices(servicesResponse.data);

        const organizationsResponse = await fetchOrganizations();
        setOrganizations(organizationsResponse.data);
      } catch (err) {
        console.error("Error fetching services or organizations:", err);
      }
    };

    loadServicesAndOrganizations();
  }, []);

  const handleCreateOrEdit = async (data) => {
    try {
      if (editingService) {
        await updateService(editingService.id, data);
      } else {
        await createService(data);
      }

      const response = await fetchServices();
      setServices(response.data); // Refresh services list
      setIsModalOpen(false);
      setEditingService(null);
    } catch (err) {
      console.error("Error saving service:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteService(id);
      setServices((prev) => prev.filter((service) => service.id !== id));
    } catch (err) {
      console.error("Error deleting service:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Services</h2>
      <Button onClick={() => setIsModalOpen(true)} className="mb-4">
        Add Service
      </Button>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Description</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Organization</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id} className="border-t">
              <td className="p-4">{service.name}</td>
              <td className="p-4">{service.description}</td>
              <td className="p-4">{service.status}</td>
              <td className="p-4">{service.organization_id}</td>
              <td className="p-4 flex justify-center space-x-4">
                <Button
                  onClick={() => {
                    setEditingService(service);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(service.id)}
                  className="bg-red-500 text-white"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <ServiceModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingService(null);
          }}
          onSubmit={handleCreateOrEdit}
          initialData={editingService}
          organizations={organizations}
        />
      )}
    </div>
  );
};

export default Services;
