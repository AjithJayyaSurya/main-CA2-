import { createContext, useContext, useReducer, useEffect } from "react";
import { AppReducer } from "../reducer/AppReducer";
import { getToken, getDataset, getMockData } from "../services/api";

const initialState = {
  activities: [],
  loading: true,
};

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Credential - replace during exam with your details
  const STUDENT_ID = "E0323030";
  const PASSWORD = "621780";
  const SET = "b";

  // Fetch activities from server
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Step 1: Get Token
        const tokenRes = await getToken(STUDENT_ID, PASSWORD, SET);

        // Step 2: Fetch dataset (might need dataUrl from tokenRes)
        const dataUrl = tokenRes.dataUrl || `${process.env.REACT_APP_API_URL}/private/data`;
        const activities = await getDataset(tokenRes.token, dataUrl);

        dispatch({ type: "SET_DATA", payload: activities || [] });
        dispatch({ type: "SET_LOADING", payload: false });
      } catch (err) {
        console.error("Error fetching activities:", err.message);
        // Fallback to mock data
        const mockData = getMockData();
        dispatch({ type: "SET_DATA", payload: mockData.activities });
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchActivities();
  }, []);

  // Dispatch methods
  const toggleGoal = (id) => dispatch({ type: "TOGGLE_GOAL", payload: { id } });

  return (
    <AppContext.Provider
      value={{
        activities: state.activities,
        loading: state.loading,
        dispatch,
        toggleGoal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easy context access
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};