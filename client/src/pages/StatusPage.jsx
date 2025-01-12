import React, { useState, useEffect } from "react";
import { fetchCurrentStatus, fetchIncidentTimeline } from "@/services/api";
import StatusUpdates from "@/components/StatusUpdates";

const StatusPage = () => {
  const [services, setServices] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Fetch both current status and timeline
        const [statusResponse, timelineResponse] = await Promise.all([
          fetchCurrentStatus(),
          fetchIncidentTimeline(),
        ]);

        setServices(statusResponse.data.services || []);
        setTimeline(timelineResponse.data.timeline || []);
      } catch (err) {
        console.error("Error fetching public status data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Public Status Page</h1>
      <StatusUpdates />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Current Status Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Current Status</h2>
            <table className="w-full bg-white shadow rounded">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-4 text-left">Service</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Description</th>
                  <th className="p-4 text-left">Active Incidents</th>
                  <th className="p-4 text-left">Active Maintenances</th>
                </tr>
              </thead>
              <tbody>
                {services.length > 0 ? (
                  services.map((service) => (
                    <tr key={service.id} className="border-t">
                      <td className="p-4">{service.name}</td>
                      <td className="p-4 capitalize">
                        {service.status.replace("_", " ")}
                      </td>
                      <td className="p-4">{service.description || "N/A"}</td>
                      <td className="p-4">
                        {service.active_incidents.length > 0
                          ? service.active_incidents.map((incident) => (
                              <div key={incident.id}>{incident.title}</div>
                            ))
                          : "No Active Incidents"}
                      </td>
                      <td className="p-4">
                        {service.active_maintenances.length > 0
                          ? service.active_maintenances.map((maintenance) => (
                              <div key={maintenance.id}>
                                {maintenance.title}
                              </div>
                            ))
                          : "No Active Maintenances"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-4">
                      No services found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>

          {/* Incident Timeline Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Incident Timeline</h2>
            {timeline.length > 0 ? (
              <ul className="space-y-4">
                {timeline.map((incident) => (
                  <li
                    key={incident.id}
                    className="p-4 bg-gray-100 rounded shadow"
                  >
                    <h3 className="font-semibold">{incident.title}</h3>
                    <p>{incident.description}</p>
                    <p className="text-sm text-gray-500">
                      Resolved at:{" "}
                      {incident.resolved_at
                        ? new Date(incident.resolved_at).toLocaleString()
                        : "Ongoing"}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No past incidents available.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default StatusPage;
