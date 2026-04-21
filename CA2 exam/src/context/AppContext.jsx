import { createContext, useReducer, useEffect } from "react";
import { AppReducer, initialState } from "../reducer/AppReducer";
import { getToken, getPrivateData } from "../services/api";

export const AppContext = createContext();

const STUDENT_ID = "e0323030";
const PASSWORD = "621780";
const SET = "b";

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching token with:", { STUDENT_ID, PASSWORD, SET });
        const token = await getToken(STUDENT_ID, PASSWORD, SET);
        console.log("Token received:", token);
        const data = await getPrivateData(token);
        console.log("Data received:", data);
        dispatch({ type: "SET_DATA", payload: data });
      } catch (error) {
        console.error("API Error:", error.message);
        console.error("Full error:", error);
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