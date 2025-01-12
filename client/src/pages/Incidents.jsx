import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  fetchIncidents,
  createIncident,
  updateIncident,
  deleteIncident,
  fetchServices,
  fetchOrganizations,
} from "@/services/api";
import IncidentModal from "@/components/IncidentModal";

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [services, setServices] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIncident, setEditingIncident] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [incidentsResponse, servicesResponse, organizationsResponse] =
          await Promise.all([
            fetchIncidents(),
            fetchServices(),
            fetchOrganizations(),
          ]);

        const incidentsWithDetails = incidentsResponse.data.map((incident) => {
          const organization = organizationsResponse.data.find(
            (org) => org.id === incident.organization_id
          );
          const serviceDetails = incident.service_ids.map((serviceId) =>
            servicesResponse.data.find((service) => service.id === serviceId)
          );

          return {
            ...incident,
            organization: organization ? organization.name : "N/A",
            services: serviceDetails.filter(Boolean),
          };
        });

        setIncidents(incidentsWithDetails);
        setServices(servicesResponse.data);
        setOrganizations(organizationsResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    loadData();
  }, []);

  const handleCreateOrEdit = async (data) => {
    try {
      if (editingIncident) {
        await updateIncident(editingIncident.id, data);
      } else {
        await createIncident(data);
      }

      const response = await fetchIncidents();
      setIncidents(response.data); // Refresh incidents list
      //   console.log("incidents", incidents);
      setIsModalOpen(false);
      setEditingIncident(null);
    } catch (err) {
      console.error("Error saving incident:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteIncident(id);
      setIncidents((prev) => prev.filter((incident) => incident.id !== id));
    } catch (err) {
      console.error("Error deleting incident:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Incidents</h2>
      <Button onClick={() => setIsModalOpen(true)} className="mb-4">
        Report Incident
      </Button>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Description</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Organization</th>
            <th className="p-4 text-left">Services</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {incidents.length > 0 ? (
            incidents.map((incident) => (
              <tr key={incident.id} className="border-t">
                <td className="p-4">{incident.title}</td>
                <td className="p-4">{incident.description}</td>
                <td className="p-4">{incident.status}</td>
                <td className="p-4">{incident.organization}</td>
                <td className="p-4">
                  {incident.services.length > 0
                    ? incident.services
                        .map((service) => service.name)
                        .join(", ")
                    : "No Services"}
                </td>
                <td className="p-4 flex justify-center space-x-4">
                  <Button
                    onClick={() => {
                      setEditingIncident(incident);
                      setIsModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(incident.id)}
                    className="bg-red-500 text-white"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4">
                No incidents available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <IncidentModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingIncident(null);
          }}
          onSubmit={handleCreateOrEdit}
          initialData={editingIncident}
          services={services}
          organizations={organizations}
        />
      )}
    </div>
  );
};

export default Incidents;
