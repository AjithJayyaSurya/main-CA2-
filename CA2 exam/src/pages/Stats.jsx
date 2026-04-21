import { useMemo } from "react";
import { useApp } from "../context/AppContext";

const Stats = () => {
  const { stats, loading, error } = useApp();

  if (loading) return <div><h2>Loading statistics...</h2></div>;
  if (error) return <div><h2>Error: {error}</h2></div>;

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