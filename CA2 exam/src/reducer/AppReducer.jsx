export const initialState = {
  activities: [],
  loading: true,
  error: null,
};

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };

    case "FETCH_SUCCESS":
      // Handle both direct array and {activities: [...]} response
      const activitiesData = Array.isArray(action.payload) ? action.payload : action.payload?.activities || [];
      return {
        ...state,
        activities: activitiesData,
        loading: false,
        error: null,
      };

    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        activities: [],
      };

    case "TOGGLE_GOAL":
      // Validate input
      if (!action.payload || typeof action.payload.id !== "number") {
        return state;
      }

      const activityId = action.payload.id;
      const updatedActivities = state.activities.map((activity) => {
        if (activity.id === activityId) {
          // Only toggle if steps > 8000
          if (Number(activity.steps) > 8000 && typeof activity.goalachieved === "boolean") {
            return { ...activity, goalachieved: !activity.goalachieved };
          }
        }
        return activity;
      });

      return { ...state, activities: updatedActivities };

    default:
      return state;
  }
};