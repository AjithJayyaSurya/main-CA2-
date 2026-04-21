import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";

export const getToken = async (studentId, password, set) => {
  try {
    const res = await axios.post(`${BASE_URL}/public/token`, {
      studentId,
      password,
      set
    });
    return res.data.token;
  } catch (error) {
    console.error("Token error:", error.response?.data || error.message);
    throw error;
  }
};

export const getPrivateData = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}/private/data`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.error("Data error:", error.response?.data || error.message);
    // Return mock data for development
    return getMockData();
  }
};

// Mock data for development
export const getMockData = () => ({
  activities: [
    { id: 1, name: "Morning Run", steps: 5000, caloriesburned: 400, workoutmins: 30, goalachieved: true, date: "2024-04-21" },
    { id: 2, name: "Evening Walk", steps: 3000, caloriesburned: 200, workoutmins: 20, goalachieved: true, date: "2024-04-21" },
    { id: 3, name: "Gym Session", steps: 1000, caloriesburned: 600, workoutmins: 60, goalachieved: false, date: "2024-04-20" },
    { id: 4, name: "Cycling", steps: 8000, caloriesburned: 500, workoutmins: 45, goalachieved: true, date: "2024-04-20" },
    { id: 5, name: "Yoga", steps: 500, caloriesburned: 150, workoutmins: 30, goalachieved: true, date: "2024-04-19" }
  ]
});