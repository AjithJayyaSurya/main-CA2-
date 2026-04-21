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

    default:
      return state;
  }
};