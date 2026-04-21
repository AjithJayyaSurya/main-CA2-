export const initialState = {
  activities: []
};

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        activities: action.payload.activities || []
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
              goalachieved: !activity.goalachieved
            };
          }
        }
        return activity;
      });

      return {
        ...state,
        activities: updatedActivities
      };

    default:
      return state;
  }
};