import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  fetchMaintenances,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
  fetchServices,
  fetchOrganizations,
} from "@/services/api";
import MaintenanceModal from "@/components/MaintenanceModal";

const Maintenance = () => {
  const [maintenances, setMaintenances] = useState([]);
  const [services, setServices] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMaintenance, setEditingMaintenance] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [maintenancesResponse, servicesResponse, organizationsResponse] =
          await Promise.all([
            fetchMaintenances(),
            fetchServices(),
            fetchOrganizations(),
          ]);

        // Map maintenances directly as the API response already includes organization and services
        const maintenancesWithDetails = maintenancesResponse.data.map(
          (maintenance) => {
            return {
              ...maintenance,
              organization: maintenance.organization || { name: "N/A" }, // Fallback to N/A if no organization
              services:
                maintenance.services.length > 0 ? maintenance.services : [], // Fallback to an empty array if no services
            };
          }
        );

        setMaintenances(maintenancesWithDetails);
        setServices(servicesResponse.data || []);
        setOrganizations(organizationsResponse.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    loadData();
  }, []);

  const handleCreateOrEdit = async (data) => {
    try {
      if (editingMaintenance) {
        await updateMaintenance(editingMaintenance.id, data);
      } else {
        await createMaintenance(data);
      }

      const response = await fetchMaintenances();
      setMaintenances(response.data); // Refresh maintenances list
      setIsModalOpen(false);
      setEditingMaintenance(null);
    } catch (err) {
      console.error("Error saving maintenance:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMaintenance(id);
      setMaintenances((prev) =>
        prev.filter((maintenance) => maintenance.id !== id)
      );
    } catch (err) {
      console.error("Error deleting maintenance:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Maintenances</h2>
      <Button onClick={() => setIsModalOpen(true)} className="mb-4">
        Schedule Maintenance
      </Button>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Description</th>
            <th className="p-4 text-left">Start Time</th>
            <th className="p-4 text-left">End Time</th>
            <th className="p-4 text-left">Organization</th>
            <th className="p-4 text-left">Services</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {maintenances.length > 0 ? (
            maintenances.map((maintenance) => (
              <tr key={maintenance.id} className="border-t">
                <td className="p-4">{maintenance.title}</td>
                <td className="p-4">{maintenance.description}</td>
                <td className="p-4">
                  {new Date(maintenance.start_time).toLocaleString()}
                </td>
                <td className="p-4">
                  {new Date(maintenance.end_time).toLocaleString()}
                </td>
                <td className="p-4">
                  {maintenance.organization?.name || "N/A"}
                </td>
                <td className="p-4">
                  {maintenance.services.length > 0
                    ? maintenance.services
                        .map((service) => service.name)
                        .join(", ")
                    : "No Services"}
                </td>
                <td className="p-4 flex justify-center space-x-4">
                  <Button
                    onClick={() => {
                      setEditingMaintenance(maintenance);
                      setIsModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(maintenance.id)}
                    className="bg-red-500 text-white"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-4">
                No maintenances available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <MaintenanceModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingMaintenance(null);
          }}
          onSubmit={handleCreateOrEdit}
          initialData={editingMaintenance}
          services={services}
          organizations={organizations}
        />
      )}
    </div>
  );
};

export default Maintenance;
