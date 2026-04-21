// Export initialState for use in context
export const initialState = {
  activities: [],
  stats: {
    total: 0,
    goalAchieved: 0,
    goalNotAchieved: 0,
  },
  loading: true,
  error: null,
};

// Validation helper
const isValidActivity = (a) =>
  Number(a.steps) > 0 &&
  Number(a.caloriesburned) > 0 &&
  Number(a.workoutmins) > 0 &&
  typeof a.goalachieved === "boolean";

// Compute stats from valid activities
const computeStats = (activities) => {
  const validActivities = activities.filter(isValidActivity);

  return validActivities.reduce(
    (acc, activity) => {
      acc.total += 1;
      if (activity.goalachieved === true) {
        acc.goalAchieved += 1;
      } else {
        acc.goalNotAchieved += 1;
      }
      return acc;
    },
    { total: 0, goalAchieved: 0, goalNotAchieved: 0 }
  );
};

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };

    case "FETCH_SUCCESS":
      // Handle both direct array and {activities: [...]} response
      const activitiesData = Array.isArray(action.payload)
        ? action.payload
        : action.payload?.activities || [];
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

    case "COMPUTE_STATS":
      return {
        ...state,
        stats: computeStats(state.activities),
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