import { createContext, useContext, useEffect, useReducer } from "react";
import { getToken, getDataset } from "../services/api";
import { AppReducer, initialState } from "../reducer/AppReducer";

export const AppContext = createContext(null);

// Export validation function for reuse
export const isValidActivity = (a) =>
  Number(a.steps) > 0 &&
  Number(a.caloriesburned) > 0 &&
  Number(a.workoutmins) > 0 &&
  typeof a.goalachieved === "boolean";

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    let isMounted = true;
    const fetchActivities = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const tokenRes = await getToken("E0323030", "621780", "setB");
        const dataset = await getDataset(tokenRes.token, tokenRes.dataUrl);
        if (!isMounted) return;
        dispatch({ type: "FETCH_SUCCESS", payload: dataset });
      } catch (error) {
        if (!isMounted) return;
        dispatch({ type: "FETCH_ERROR", payload: error?.message || "Unable to fetch activities." });
      }
    };
    fetchActivities();
    return () => { isMounted = false; };
  }, []);

  const toggleGoal = (id) => dispatch({ type: "TOGGLE_GOAL", payload: { id } });

  return (
    <AppContext.Provider value={{
      activities: state.activities,
      loading: state.loading,
      error: state.error,
      toggleGoal,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};