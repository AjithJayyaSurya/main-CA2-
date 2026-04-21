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
    return res.data.activities || res.data;
  } catch (error) {
    console.error("Dataset error status:", error.response?.status);
    console.error("Dataset error data:", error.response?.data);
    throw error;
  }
};