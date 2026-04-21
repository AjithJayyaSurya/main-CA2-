import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Filter from "../pages/Filter";
import Stats from "../pages/Stats";
import ToggleGoal from "../pages/ToggleGoal";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {/* Activities Routes */}
      <Route path="/activities" element={<Home />} />
      <Route path="/activities/:id" element={<Home />} />
      <Route path="/filter" element={<Filter />} />
      <Route path="/stats" element={<Stats />} />

      {/* Question 4: Toggle Goal Route */}
      <Route path="/toggle-goal" element={<ToggleGoal />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;