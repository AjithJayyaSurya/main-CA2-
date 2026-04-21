import { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";

const Stats = () => {
  const { state } = useContext(AppContext);
  const activities = state.activities || [];

  // Calculate stats using reduce
  const stats = useMemo(() => {
    return activities.reduce(
      (acc, activity) => {
        acc.total += 1;
        if (activity.goalachieved === true || activity.goalachieved === "true") {
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
        <h3>Total Activities</h3>
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