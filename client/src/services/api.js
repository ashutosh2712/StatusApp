import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8001"; // Backend URL
// const API_BASE_URL = "http://34.173.112.130:8001"; // LIVE URL

// USER MANAGEMENT
export const loginUser = async (username, password) => {
  return await axios.post(`${API_BASE_URL}/api/users/login/`, {
    username,
    password,
  });
};

export const registerUser = async (data) => {
  return await axios.post(`${API_BASE_URL}/api/users/register-user/`, data);
};

// ORGANIZATIONS MANAGEMENT
export const fetchOrganizations = async () => {
  return await axios.get(`${API_BASE_URL}/api/orgs/list-organizations/`);
};

export const createOrganization = async (data) => {
  return await axios.post(
    `${API_BASE_URL}/api/orgs/register-organization/`,
    data
  );
};

export const updateOrganization = async (id, data) => {
  return await axios.put(
    `${API_BASE_URL}/api/orgs/${id}/update-organization/`,
    data
  );
};

export const deleteOrganization = async (id) => {
  return await axios.delete(
    `${API_BASE_URL}/api/orgs/${id}/delete-organization/`
  );
};

// SERVICES MANAGEMENT
export const fetchServices = async () => {
  return await axios.get(`${API_BASE_URL}/api/service/list-services/`);
};

export const createService = async (data) => {
  return await axios.post(
    `${API_BASE_URL}/api/service/register-service/`,
    data
  );
};

export const updateService = async (id, data) => {
  return await axios.put(
    `${API_BASE_URL}/api/service/${id}/update-service/`,
    data
  );
};

export const deleteService = async (id) => {
  return await axios.delete(
    `${API_BASE_URL}/api/service/${id}/delete-service/`
  );
};

// INCIDENTS MANAGEMENT
export const fetchIncidents = async () => {
  return await axios.get(`${API_BASE_URL}/api/incident/list-incidents`);
};

export const createIncident = async (data) => {
  return await axios.post(
    `${API_BASE_URL}/api/incident/create-incident/`,
    data
  );
};

export const updateIncident = async (id, data) => {
  return await axios.put(
    `${API_BASE_URL}/api/incident/${id}/update-incident/`,
    data
  );
};

export const deleteIncident = async (id) => {
  return await axios.delete(
    `${API_BASE_URL}/api/incident/${id}/delete-incident/`
  );
};

// MAINTENANCE MANAGEMENT
export const fetchMaintenances = async () => {
  return await axios.get(`${API_BASE_URL}/api/maintenance/list-maintenance/`);
};

export const createMaintenance = async (data) => {
  return await axios.post(
    `${API_BASE_URL}/api/maintenance/create-maintenance/`,
    data
  );
};

export const updateMaintenance = async (id, data) => {
  return await axios.put(
    `${API_BASE_URL}/api/maintenance/${id}/update-maintenance/`,
    data
  );
};

export const deleteMaintenance = async (id) => {
  return await axios.delete(
    `${API_BASE_URL}/api/maintenance/${id}/delete-maintenance/`
  );
};

// STATUS PAGE
export const fetchCurrentStatus = async () => {
  return await axios.get(`${API_BASE_URL}/api/status/current-status/`);
};

export const fetchIncidentTimeline = async () => {
  return await axios.get(`${API_BASE_URL}/api/status/incident-timeline/`);
};
