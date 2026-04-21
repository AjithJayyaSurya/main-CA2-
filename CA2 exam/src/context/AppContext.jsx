import { createContext, useContext, useReducer, useEffect } from "react";
import { AppReducer } from "../reducer/AppReducer";
import { getToken, getDataset } from "../services/api";

const initialState = {
  activities: [],
  stats: {
    total: 0,
    goalAchieved: 0,
    goalNotAchieved: 0,
  },
  loading: true,
  error: null,
};

export const AppContext = createContext();

// Export validation function for reuse
export const isValidActivity = (a) =>
  Number(a.steps) > 0 &&
  Number(a.caloriesburned) > 0 &&
  Number(a.workoutmins) > 0 &&
  typeof a.goalachieved === "boolean";

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Fetch activities from server
  useEffect(() => {
    let isMounted = true;
    const fetchActivities = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        // Step 1: Get Token
        const tokenRes = await getToken(
          "E0323030", // replace during exam
          "621780", // replace during exam
          "setB", // dataset set
        );

        // Step 2: Fetch dataset
        const activities = await getDataset(tokenRes.token, tokenRes.dataUrl);

        if (!isMounted) return;
        dispatch({ type: "FETCH_SUCCESS", payload: activities });
      } catch (err) {
        if (!isMounted) return;
        console.error("Error fetching data:", err.message);
        dispatch({ type: "FETCH_ERROR", payload: err?.message || "Unable to fetch activities." });
      }
    };

    fetchActivities();
    return () => { isMounted = false; };
  }, []);

  // Sync stats automatically when activities change
  useEffect(() => {
    dispatch({ type: "COMPUTE_STATS" });
  }, [state.activities]);

  // Dispatch methods
  const toggleGoal = (id) => dispatch({ type: "TOGGLE_GOAL", payload: { id } });

  return (
    <AppContext.Provider
      value={{
        activities: state.activities,
        stats: state.stats,
        loading: state.loading,
        error: state.error,
        toggleGoal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);