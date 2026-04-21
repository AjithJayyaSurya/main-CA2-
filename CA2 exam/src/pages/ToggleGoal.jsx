import { useState } from "react";
import { useApp, isValidActivity } from "../context/AppContext";

const ToggleGoal = () => {
  const { activities, loading, error, toggleGoal } = useApp();
  const [selectedId, setSelectedId] = useState("");
  const [message, setMessage] = useState("");

  if (loading) return <div>Loading activities...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  // Get valid activities
  const validActivities = activities.filter(isValidActivity);

  const handleToggleGoal = () => {
    setMessage("");

    if (selectedId === "") {
      setMessage("❌ Please select an activity");
      return;
    }

    const activityId = parseInt(selectedId, 10);
    if (isNaN(activityId)) {
      setMessage("❌ Invalid activity ID");
      return;
    }

    // Find the activity
    const activity = activities.find((a) => a.id === activityId);
    if (!activity) {
      setMessage("❌ Activity not found");
      return;
    }

    // Check constraint: steps > 8000
    if (Number(activity.steps) <= 8000) {
      setMessage(`❌ Cannot toggle: Activity has ${activity.steps} steps (need > 8000)`);
      return;
    }

    // Dispatch toggle action
    toggleGoal(activityId);

    const currentStatus = activity.goalachieved;
    const newStatus = !currentStatus;
    setMessage(
      `✅ Goal toggled for "${activity.name}": ${currentStatus ? "Yes" : "No"} → ${
        newStatus ? "Yes" : "No"
      }`
    );
  };

  return (
    <div>
      <h2>Toggle Goal Achievement</h2>
      <p><strong>Rule:</strong> Can only toggle if steps {`>`} 8000</p>

      <div style={{ marginBottom: "20px" }}>
        <h3>Select Activity</h3>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        >
          <option value="">-- Select an activity --</option>
          {validActivities.map((activity) => (
            <option key={activity.id} value={activity.id}>
              {activity.name} (Steps: {activity.steps}, Goal: {activity.goalachieved ? "Yes ✓" : "No ✗"})
            </option>
          ))}
        </select>
        <button onClick={handleToggleGoal} style={{ padding: "8px 16px" }}>
          Toggle Goal
        </button>
      </div>

      {message && (
        <div style={{
          padding: "12px",
          marginBottom: "20px",
          borderRadius: "4px",
          backgroundColor: message.includes("❌") ? "#ffe0e0" : "#e0ffe0"
        }}>
          {message}
        </div>
      )}

      <div>
        <h3>Activity List</h3>
        {validActivities.length > 0 ? (
          validActivities
            .sort((a, b) => Number(b.steps) - Number(a.steps))
            .map((activity) => (
              <div key={activity.id} style={{
                padding: "10px",
                marginBottom: "10px",
                border: Number(activity.steps) > 8000 ? "2px solid green" : "1px solid gray",
                borderRadius: "4px"
              }}>
                <h4>{activity.name}</h4>
                <p><strong>Steps:</strong> {activity.steps} {Number(activity.steps) > 8000 ? "✓ (Can toggle)" : "✗ (Cannot toggle)"}</p>
                <p><strong>Goal:</strong> {activity.goalachieved ? "Yes ✓" : "No ✗"}</p>
              </div>
            ))
        ) : (
          <p>No valid activities</p>
        )}
      </div>
    </div>
  );
};

export default ToggleGoal;
