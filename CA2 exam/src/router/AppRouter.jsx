import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Filter from "../pages/Filter";
import Stats from "../pages/Stats";
import ToggleGoal from "../pages/ToggleGoal";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root redirect to activities */}
        <Route path="/" element={<Navigate to="/activities" replace />} />

        {/* Activities Routes */}
        <Route path="/activities" element={<Home />} />
        <Route path="/activities/:id" element={<Home />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/stats" element={<Stats />} />

        {/* Toggle Goal Route */}
        <Route path="/toggle-goal" element={<ToggleGoal />} />

        {/* 404 Catch All */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;