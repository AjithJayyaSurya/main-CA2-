import { useState } from "react";
import { useApp } from "../context/AppContext";

const Filter = () => {
  const { activities } = useApp();
  const [searchName, setSearchName] = useState("");
  const [stepsInput, setStepsInput] = useState("");
  const [stepError, setStepError] = useState("");

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

  // Handle steps input change with validation
  const handleStepsChange = (e) => {
    const value = e.target.value;
    setStepsInput(value);

    if (value === "") {
      setStepError(""); // Clear error if empty
    } else if (isNaN(value) || Number(value) < 0) {
      setStepError("Invalid input: must be a non-negative number");
    } else {
      setStepError(""); // Clear error on valid input
    }
  };

  // Filter valid activities first, then apply filters independently
  const validActivities = activities.filter(isValidActivity);

  // Apply name filter
  const nameFiltered = validActivities.filter((item) =>
    (item.name || "Unknown").toLowerCase().includes(searchName.toLowerCase())
  );

  // Apply steps filter only if input is valid or empty
  let filtered = nameFiltered;
  if (stepsInput !== "" && !isNaN(stepsInput) && Number(stepsInput) >= 0) {
    const stepsThreshold = Number(stepsInput);
    filtered = nameFiltered.filter((item) => Number(item.steps) >= stepsThreshold);
  }

  // Map with fallbacks
  const finalResults = filtered.map((item) => ({
    ...item,
    name: item.name || "Unknown",
    date: item.date || "No data"
  }));

  return (
    <div>
      <h2>Filter Activities</h2>

      {/* Name Search Filter */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Search by Name</h3>
        <input
          data-testid="filter-input"
          placeholder="Enter activity name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          type="text"
        />
      </div>

      {/* Steps Filter */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Filter by Steps ({">"}= value)</h3>
        <input
          placeholder="Enter minimum steps"
          value={stepsInput}
          onChange={handleStepsChange}
          type="number"
          min="0"
        />
        {stepsInput === "" && (
          <p style={{ color: "orange" }}>⚠️ Empty input: showing all activities</p>
        )}
        {stepError && (
          <p style={{ color: "red" }}>❌ {stepError}</p>
        )}
      </div>

      {/* Results */}
      <div>
        <h3>Results</h3>
        {finalResults.length > 0 ? (
          finalResults.map((item) => (
            <div key={item.id} data-testid="activity-item">
              <h4>{item.name}</h4>
              <p>Steps: {item.steps}</p>
              <p>Calories: {item.caloriesburned}</p>
              <p>Duration: {item.workoutmins} mins</p>
              <p>Date: {item.date}</p>
            </div>
          ))
        ) : (
          <p>No activities match your filters</p>
        )}
      </div>
    </div>
  );
};

export default Filter;