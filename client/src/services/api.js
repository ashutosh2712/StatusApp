import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8001"; // Backend URL

// COMPONENTS MANAGEMENT
// Fetch all users
export const loginUser = async (username, password) => {
  return await axios.post(`${API_BASE_URL}/api/users/login/`, {
    username,
    password,
  });
};
