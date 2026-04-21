import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Home = () => {
  const { state } = useContext(AppContext);
  const { id } = useParams();
  const activities = state.activities || [];

  // If ID is provided, show single activity detail
  if (id) {
    const activity = activities.find(a => String(a.id) === String(id));
    if (!activity) return <div>Activity not found</div>;
    return (
      <div>
        <h2>{activity.name}</h2>
        <p>Steps: {activity.steps}</p>
        <p>Calories Burned: {activity.caloriesburned}</p>
        <p>Workout Minutes: {activity.workoutmins}</p>
        <p>Goal Achieved: {activity.goalachieved ? "Yes" : "No"}</p>
        <p>Date: {activity.date}</p>
      </div>
    );
  }

  // Show list of all activities
  return (
    <div>
      <h2>Activities</h2>
      {activities && activities.map((item) => (
        <div key={item.id} data-testid="activity-item">
          <h3>{item.name}</h3>
          <p>Steps: {item.steps}</p>
          <p>Calories: {item.caloriesburned}</p>
          <p>Duration: {item.workoutmins} mins</p>
          <p>Goal: {item.goalachieved ? "✓ Achieved" : "✗ Not achieved"}</p>
          <p>Date: {item.date}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;