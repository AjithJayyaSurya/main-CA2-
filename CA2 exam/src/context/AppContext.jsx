import { createContext, useReducer, useEffect } from "react";
import { AppReducer, initialState } from "../reducer/AppReducer";
import { getToken, getPrivateData, getMockData } from "../services/api";

export const AppContext = createContext();

const STUDENT_ID = "E0323030";
const PASSWORD = "621780";
const SET = "b";

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken(STUDENT_ID, PASSWORD, SET);
        const data = await getPrivateData(token);
        dispatch({ type: "SET_DATA", payload: data });
      } catch (error) {
        console.error("API Error:", error.message);
        console.log("Using mock data as fallback...");
        // Use mock data if API fails
        const mockData = getMockData();
        dispatch({ type: "SET_DATA", payload: mockData });
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};