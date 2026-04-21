import { useContext, useMemo, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Stats = () => {
  const { state } = useContext(AppContext);
  const activities = state.activities || [];

  // Log for debugging
  useEffect(() => {
    console.log("Stats - Activities count:", activities.length);
    console.log("Stats - Activities data:", activities);
  }, [activities]);

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

  // Calculate stats using reduce on valid activities only
  const stats = useMemo(() => {
    const validActivities = activities.filter(isValidActivity);
    console.log("Stats - Valid activities count:", validActivities.length);

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

  console.log("Stats - Final stats:", stats);

  // Expose global state
  useMemo(() => {
    window.appState = {
      totalactivities: stats.total,
      goalachievementcount: stats.goalAchieved,
      goalnotachivedcount: stats.goalNotAchieved
    };
    console.log("window.appState set:", window.appState);
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