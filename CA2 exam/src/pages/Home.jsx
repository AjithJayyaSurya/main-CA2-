import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp, isValidActivity } from "../context/AppContext";

const Home = () => {
  const { activities, loading, error, toggleGoal } = useApp();
  const { id } = useParams();
  const navigate = useNavigate();

  if (loading) return <div><h2>Loading activities...</h2></div>;
  if (error) return <div><h2>Error: {error}</h2></div>;

  // If ID is provided, show single activity detail
  if (id) {
    const numId = parseInt(id, 10);
    if (isNaN(numId) || numId <= 0) {
      return <div><h2>Invalid activity ID</h2></div>;
    }

    const activity = activities.find(a => a.id === numId);
    if (!activity) return <div><h2>Activity not found</h2></div>;
    if (!isValidActivity(activity)) return <div><h2>Invalid activity data</h2></div>;

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
        <button onClick={() => navigate("/activities")}>
          Back to Activities
        </button>
        <h2>{activity.name || "Unknown Activity"}</h2>

        <div>
          <h3>Basic Details</h3>
          <p><strong>Activity ID:</strong> {activity.id}</p>
          <p><strong>Name:</strong> {activity.name || "Unknown"}</p>
          <p><strong>Steps:</strong> {activity.steps}</p>
          <p><strong>Calories Burned:</strong> {activity.caloriesburned}</p>
          <p><strong>Workout Minutes:</strong> {activity.workoutmins}</p>
          <p><strong>Goal Achieved:</strong> {activity.goalachieved ? "Yes" : "No"}</p>
          <p><strong>Date:</strong> {activity.date || "No data"}</p>
        </div>

        <div>
          <h3>Computed Metrics</h3>
          <p><strong>Steps Per Minute:</strong> {computedMetrics.stepsPerMinute}</p>
          <p><strong>Calories Per Minute:</strong> {computedMetrics.caloriesPerMinute}</p>
          <p><strong>Calories Per Step:</strong> {computedMetrics.caloriesPerStep}</p>
          <p><strong>Activity Intensity:</strong> {computedMetrics.avgIntensity}</p>
        </div>
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
      <h2>Activities List ({validActivities.length} valid activities)</h2>
      {validActivities.length > 0 ? (
        <div>
          {validActivities.map((item) => (
            <div key={item.id} data-testid="activity-item">
              <h3>{item.name}</h3>
              <p>
                <strong>ID:</strong> {item.id} | <strong>Steps:</strong> {item.steps} | <strong>Calories:</strong> {item.caloriesburned}
              </p>
              <p>
                <strong>Workout:</strong> {item.workoutmins} mins | <strong>Date:</strong> {item.date}
              </p>
              <p>
                <strong>Goal:</strong> {item.goalachieved ? "Achieved" : "Not Achieved"}
              </p>
              <button onClick={() => navigate(`/activities/${item.id}`)}>
                View Details
              </button>
              {Number(item.steps) > 8000 && (
                <button onClick={() => toggleGoal(item.id)}>
                  Toggle Goal
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h3>No valid activities found</h3>
          <p>Activities must have: steps greater than 0, calories greater than 0, workout minutes greater than 0, and goal as boolean</p>
        </div>
      )}
    </div>
  );
};

export default Home;
