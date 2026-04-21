import { useContext, useMemo } from "react";
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
    // Validate ID - must be a positive integer
    const numId = parseInt(id, 10);
    if (isNaN(numId) || numId <= 0) {
      return <div>Invalid activity ID</div>;
    }

    const activity = activities.find(a => a.id === numId);

    // Handle invalid ID - not found
    if (!activity) {
      return <div>Activity not found</div>;
    }

    // Validate activity data
    if (!isValidActivity(activity)) {
      return <div>Invalid activity data</div>;
    }

    // Compute dynamic metrics safely
    const computedMetrics = useMemo(() => {
      const steps = Number(activity.steps) || 0;
      const calories = Number(activity.caloriesburned) || 0;
      const minutes = Number(activity.workoutmins) || 0;

      return {
        stepsPerMinute: minutes > 0 ? (steps / minutes).toFixed(2) : "N/A",
        caloriesPerMinute: minutes > 0 ? (calories / minutes).toFixed(2) : "N/A",
        caloriesPerStep: steps > 0 ? (calories / steps).toFixed(2) : "N/A",
        avgIntensity:
          minutes > 0 && steps > 0
            ? ((calories * steps) / (minutes * 1000)).toFixed(2)
            : "N/A"
      };
    }, [activity]);

    return (
      <div>
        <h2>{activity.name || "Unknown"}</h2>

        <h3>Basic Details</h3>
        <p><strong>ID:</strong> {activity.id}</p>
        <p><strong>Steps:</strong> {activity.steps}</p>
        <p><strong>Calories Burned:</strong> {activity.caloriesburned}</p>
        <p><strong>Workout Minutes:</strong> {activity.workoutmins}</p>
        <p><strong>Goal Achieved:</strong> {activity.goalachieved ? "Yes ✓" : "No ✗"}</p>
        <p><strong>Date:</strong> {activity.date || "No data"}</p>

        <h3>Computed Metrics</h3>
        <p><strong>Steps Per Minute:</strong> {computedMetrics.stepsPerMinute}</p>
        <p><strong>Calories Per Minute:</strong> {computedMetrics.caloriesPerMinute}</p>
        <p><strong>Calories Per Step:</strong> {computedMetrics.caloriesPerStep}</p>
        <p><strong>Activity Intensity:</strong> {computedMetrics.avgIntensity}</p>
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