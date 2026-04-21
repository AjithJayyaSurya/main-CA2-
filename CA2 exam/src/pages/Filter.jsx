import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Filter = () => {
  const { state } = useContext(AppContext);
  const activities = state.activities || [];
  const [search, setSearch] = useState("");

  // Validation function
  const isValidActivity = (activity) => {
    return (
      activity &&
      Number(activity.steps) > 0 &&
      Number(activity.caloriesburned) > 0 &&
      Number(activity.workoutmins) > 0 &&
      typeof activity.goalachieved === "boolean"
    );
  };

  // Filter valid activities and then search
  const filtered = activities
    .filter(isValidActivity)
    .filter(item =>
      (item.name || "Unknown").toLowerCase().includes(search.toLowerCase())
    )
    .map((item) => ({
      ...item,
      name: item.name || "Unknown",
      date: item.date || "No data"
    }));

  return (
    <div>
      <h2>Filter Activities</h2>
      <input
        data-testid="filter-input"
        placeholder="Search activities by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length > 0 ? (
        filtered.map(item => (
          <div key={item.id} data-testid="activity-item">
            <h3>{item.name}</h3>
            <p>Steps: {item.steps}</p>
            <p>Calories: {item.caloriesburned}</p>
            <p>Duration: {item.workoutmins} mins</p>
            <p>Date: {item.date}</p>
          </div>
        ))
      ) : (
        <p>No valid activities found</p>
      )}
    </div>
  );
};

export default Filter;