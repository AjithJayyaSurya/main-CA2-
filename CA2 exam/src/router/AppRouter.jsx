import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Filter from "../pages/Filter";
import Stats from "../pages/Stats";
import ToggleGoal from "../pages/ToggleGoal";

const AppRouter = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Home />} />
          <Route path="/activities/:id" element={<Home />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/toggle-goal" element={<ToggleGoal />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRouter;