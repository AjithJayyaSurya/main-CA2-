import { createContext, useReducer, useEffect } from "react";
import { AppReducer, initialState } from "../reducer/AppReducer";
import { getToken, getPrivateData } from "../services/api";

export const AppContext = createContext();

const STUDENT_ID = "E0323030";
const PASSWORD = "621780";
const SET = "b";

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken(STUDENT_ID, PASSWORD,SET);
      const data = await getPrivateData(token);

      dispatch({ type: "SET_DATA", payload: data });
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};