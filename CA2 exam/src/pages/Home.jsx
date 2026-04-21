import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp, isValidActivity } from "../context/AppContext";

const Home = () => {
  const { activities, loading, error, toggleGoal } = useApp();
  const { id } = useParams();
  const navigate = useNavigate();

  if (loading) return <div className="container"><h2>Loading activities...</h2></div>;
  if (error) return <div className="container" style={{ color: "red" }}><h2>Error: {error}</h2></div>;

  // If ID is provided, show single activity detail
  if (id) {
    const numId = parseInt(id, 10);
    if (isNaN(numId) || numId <= 0) {
      return <div className="container"><h2>Invalid activity ID</h2></div>;
    }

    const activity = activities.find(a => a.id === numId);
    if (!activity) return <div className="container"><h2>Activity not found</h2></div>;
    if (!isValidActivity(activity)) return <div className="container"><h2>Invalid activity data</h2></div>;

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
      <div className="container">
        <button onClick={() => navigate("/activities")} style={{ marginBottom: "20px" }}>
          ← Back to Activities
        </button>
        <h2>{activity.name || "Unknown Activity"}</h2>

        <div style={{ backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
          <h3>Basic Details</h3>
          <p><strong>Activity ID:</strong> {activity.id}</p>
          <p><strong>Name:</strong> {activity.name || "Unknown"}</p>
          <p><strong>Steps:</strong> {activity.steps}</p>
          <p><strong>Calories Burned:</strong> {activity.caloriesburned}</p>
          <p><strong>Workout Minutes:</strong> {activity.workoutmins}</p>
          <p><strong>Goal Achieved:</strong> {activity.goalachieved ? "Yes ✓" : "No ✗"}</p>
          <p><strong>Date:</strong> {activity.date || "No data"}</p>
        </div>

        <div style={{ backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "8px" }}>
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
    <div className="container">
      <h2>Activities List ({validActivities.length} valid activities)</h2>
      {validActivities.length > 0 ? (
        <div style={{ display: "grid", gap: "15px" }}>
          {validActivities.map((item) => (
            <div
              key={item.id}
              data-testid="activity-item"
              style={{
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                cursor: "pointer",
                transition: "all 0.3s"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <div style={{ flex: 1 }} onClick={() => navigate(`/activities/${item.id}`)}>
                  <h3 style={{ margin: "0 0 10px 0" }}>{item.name}</h3>
                  <div style={{ fontSize: "14px", color: "#666" }}>
                    <p style={{ margin: "5px 0" }}>
                      <strong>ID:</strong> {item.id} | <strong>Steps:</strong> {item.steps} | <strong>Calories:</strong> {item.caloriesburned}
                    </p>
                    <p style={{ margin: "5px 0" }}>
                      <strong>Workout:</strong> {item.workoutmins} mins | <strong>Date:</strong> {item.date}
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: "right", marginLeft: "10px" }}>
                  <div style={{
                    padding: "8px 12px",
                    backgroundColor: item.goalachieved ? "#e8f5e9" : "#ffebee",
                    borderRadius: "4px",
                    marginBottom: "10px",
                    fontWeight: "bold",
                    color: item.goalachieved ? "#2e7d32" : "#c62828"
                  }}>
                    {item.goalachieved ? "✓ Goal Achieved" : "✗ Goal Not Achieved"}
                  </div>

                  {Number(item.steps) > 8000 && (
                    <button
                      onClick={() => toggleGoal(item.id)}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#1976d2",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: "bold"
                      }}
                    >
                      Toggle Goal
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: "20px", backgroundColor: "#fff3cd", borderRadius: "4px" }}>
          <h3>No valid activities found</h3>
          <p>Activities must have: steps greater than 0, calories greater than 0, workout minutes greater than 0, and goal as boolean</p>
        </div>
      )}
    </div>
  );
};

export default Home;
