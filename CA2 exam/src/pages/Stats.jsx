import { useMemo } from "react";
import { useApp, isValidActivity } from "../context/AppContext";

const Stats = () => {
  const { activities, loading, error } = useApp();

  if (loading) return <div>Loading activities...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  // Calculate stats using reduce on valid activities only
  const stats = useMemo(() => {
    const validActivities = activities.filter(isValidActivity);

    return validActivities.reduce(
      (acc, activity) => {
        acc.total += 1;
        if (activity.goalachieved === true) {
          acc.goalAchieved += 1;
        } else {
          acc.goalNotAchieved += 1;
        }
        return acc;
      },
      { total: 0, goalAchieved: 0, goalNotAchieved: 0 }
    );
  }, [activities]);

  // Expose global state
  useMemo(() => {
    window.appState = {
      totalactivities: stats.total,
      goalachievementcount: stats.goalAchieved,
      goalnotachivedcount: stats.goalNotAchieved
    };
  }, [stats]);

  return (
    <div>
      <h2>Activity Stats</h2>
      <div>
        <h3>Total Activities (Valid)</h3>
        <div data-testid="total-activities">{stats.total}</div>
      </div>
      <div>
        <h3>Goal Achieved</h3>
        <div data-testid="goal-achieved">{stats.goalAchieved}</div>
      </div>
      <div>
        <h3>Goal Not Achieved</h3>
        <div data-testid="goal-not-achieved">{stats.goalNotAchieved}</div>
      </div>
    </div>
  );
};

export default Stats;