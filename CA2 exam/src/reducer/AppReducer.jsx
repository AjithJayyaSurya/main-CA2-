export const initialState = {
  activities: [],
  loading: true,
};

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      // Safe extraction of activities array
      const activitiesData = action.payload || [];
      console.log("SET_DATA - Activities loaded:", activitiesData.length);
      return {
        ...state,
        activities: Array.isArray(activitiesData) ? activitiesData : [],
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "TOGGLE_GOAL":
      // Validate input - must be valid activity ID
      if (!action.payload || typeof action.payload.id !== "number") {
        return state; // Ignore invalid
      }

      const activityId = action.payload.id;

      // Toggle activity goal if steps > 8000
      const updatedActivities = state.activities.map((activity) => {
        if (activity.id === activityId) {
          // Constraint: only toggle if steps > 8000
          if (Number(activity.steps) > 8000 && typeof activity.goalachieved === "boolean") {
            return {
              ...activity,
              goalachieved: !activity.goalachieved,
            };
          }
        }
        return activity;
      });

      return {
        ...state,
        activities: updatedActivities,
      };

    default:
      return state;
  }
};