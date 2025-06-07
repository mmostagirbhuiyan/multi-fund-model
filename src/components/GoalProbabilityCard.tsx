import React from 'react';
import { Percent } from 'lucide-react';
import MetricCard from './MetricCard';

interface Props {
  probability: number;
}

const GoalProbabilityCard: React.FC<Props> = ({ probability }) => {
  const pct = Math.max(0, Math.min(100, probability));
  return (
    <MetricCard
      icon={Percent}
      title="Goal Probability"
      value={`${pct.toFixed(0)}%`}
      subtitle="Chance of reaching target"
      gradient="from-green-500 to-emerald-600"
    >
      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden my-1">
        <div className="h-full bg-gradient-to-r from-green-400 to-blue-500" style={{ width: `${pct}%` }} />
      </div>
    </MetricCard>
  );
};

export default GoalProbabilityCard;
