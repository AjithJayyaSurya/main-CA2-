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
    const fullUrl = `${BASE_URL}${dataUrl}`;
    console.log("Fetching dataset from:", fullUrl);
    const res = await axios.get(fullUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Dataset response:", res.data);

    // Handle nested data structure: { data: { activities: [...] } }
    const activities = res.data?.data?.activities || res.data?.activities || res.data || [];

    // Map API field names to our expected format
    return activities.map(activity => ({
      id: activity.activityId,
      name: activity.name,
      steps: activity.steps,
      caloriesburned: activity.caloriesBurned,
      workoutmins: activity.workoutMinutes,
      goalachieved: activity.goalAchieved,
      date: activity.date,
    }));
  } catch (error) {
    console.error("Dataset error status:", error.response?.status);
    console.error("Dataset error data:", error.response?.data);
    throw error;
  }
};