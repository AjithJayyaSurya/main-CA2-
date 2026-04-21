import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Filter = () => {
  const { state } = useContext(AppContext);
  const activities = state.activities || [];
  const [search, setSearch] = useState("");

  const filtered = activities.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

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
        <p>No activities found</p>
      )}
    </div>
  );
};

export default Filter;