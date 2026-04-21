import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";

export const getToken = async (studentId, password, set) => {
  try {
    console.log("Token request:", { studentId, password, set });
    const res = await axios.post(`${BASE_URL}/public/token`, {
      studentId,
      password,
      set,
    });
    console.log("Token response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Token error status:", error.response?.status);
    console.error("Token error data:", error.response?.data);
    throw error;
  }
};

export const getDataset = async (token, dataUrl) => {
  try {
    console.log("Fetching dataset from:", dataUrl);
    const res = await axios.get(dataUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Dataset response:", res.data);
    return res.data.activities || res.data;
  } catch (error) {
    console.error("Dataset error status:", error.response?.status);
    console.error("Dataset error data:", error.response?.data);
    throw error;
  }
};

// Fallback mock data
export const getMockData = () => ({
  activities: [
    { id: 1, name: "Morning Run", steps: 5000, caloriesburned: 400, workoutmins: 30, goalachieved: true, date: "2024-04-21" },
    { id: 2, name: "Evening Walk", steps: 3000, caloriesburned: 200, workoutmins: 20, goalachieved: true, date: "2024-04-21" },
    { id: 3, name: "Gym Session", steps: 1000, caloriesburned: 600, workoutmins: 60, goalachieved: false, date: "2024-04-20" },
    { id: 4, name: "Cycling", steps: 8000, caloriesburned: 500, workoutmins: 45, goalachieved: true, date: "2024-04-20" },
    { id: 5, name: "Yoga", steps: 500, caloriesburned: 150, workoutmins: 30, goalachieved: true, date: "2024-04-19" },
    { id: 6, name: "Long Run", steps: 12000, caloriesburned: 900, workoutmins: 90, goalachieved: true, date: "2024-04-18" },
    { id: 7, name: "Marathon", steps: 15000, caloriesburned: 1200, workoutmins: 120, goalachieved: false, date: "2024-04-17" },
    { id: 8, name: "Sprint Training", steps: 9000, caloriesburned: 700, workoutmins: 45, goalachieved: true, date: "2024-04-16" },
  ],
});