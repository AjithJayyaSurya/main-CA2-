import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Home = () => {
  const { state } = useContext(AppContext);
  const { id } = useParams();
  const activities = state.activities || [];

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

  // If ID is provided, show single activity detail
  if (id) {
    const activity = activities.find(a => String(a.id) === String(id));

    if (!activity) return <div>Activity not found</div>;

    if (!isValidActivity(activity)) {
      return <div>Invalid activity data</div>;
    }

    return (
      <div>
        <h2>{activity.name || "Unknown"}</h2>
        <p>Steps: {activity.steps}</p>
        <p>Calories Burned: {activity.caloriesburned}</p>
        <p>Workout Minutes: {activity.workoutmins}</p>
        <p>Goal Achieved: {activity.goalachieved ? "Yes" : "No"}</p>
        <p>Date: {activity.date || "No data"}</p>
      </div>
    );
  }

  // Show list of valid activities only
  const validActivities = activities
    .filter(isValidActivity)
    .map((item) => ({
      ...item,
      name: item.name || "Unknown",
      date: item.date || "No data"
    }));

  return (
    <div>
      <h2>Activities</h2>
      {validActivities.length > 0 ? (
        validActivities.map((item) => (
          <div key={item.id} data-testid="activity-item">
            <h3>{item.name}</h3>
            <p>Steps: {item.steps}</p>
            <p>Calories: {item.caloriesburned}</p>
            <p>Duration: {item.workoutmins} mins</p>
            <p>Goal: {item.goalachieved ? "✓ Achieved" : "✗ Not achieved"}</p>
            <p>Date: {item.date}</p>
          </div>
        ))
      ) : (
        <div>No valid activities found</div>
      )}
    </div>
  );
};

export default Home;