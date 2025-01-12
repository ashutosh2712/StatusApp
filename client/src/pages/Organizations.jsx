import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  fetchOrganizations,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} from "@/services/api";
import OrganizationModal from "@/components/OrganizationModal";

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState(null); // Organization being edited

  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        const response = await fetchOrganizations();
        setOrganizations(response.data);
      } catch (err) {
        console.error("Error fetching organizations:", err);
      }
    };

    loadOrganizations();
  }, []);

  const handleCreateOrEdit = async (data) => {
    try {
      if (editingOrg) {
        await updateOrganization(editingOrg.id, data);
      } else {
        await createOrganization(data);
      }

      const response = await fetchOrganizations(); // Refresh organizations
      setOrganizations(response.data);
      setIsModalOpen(false);
      setEditingOrg(null);
    } catch (err) {
      console.error("Error saving organization:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrganization(id);
      setOrganizations((prev) => prev.filter((org) => org.id !== id)); // Optimistic update
    } catch (err) {
      console.error("Error deleting organization:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Organizations</h2>
      <Button onClick={() => setIsModalOpen(true)} className="mb-4">
        Create Organization
      </Button>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Created At</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {organizations.map((org) => (
            <tr key={org.id} className="border-t">
              <td className="p-4">{org.name}</td>
              <td className="p-4">
                {new Date(org.created_at).toLocaleDateString()}
              </td>
              <td className="p-4 flex justify-center space-x-4">
                <Button
                  onClick={() => {
                    setEditingOrg(org);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(org.id)}
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
        <OrganizationModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingOrg(null);
          }}
          onSubmit={handleCreateOrEdit}
          initialData={editingOrg}
        />
      )}
    </div>
  );
};

export default Organizations;
