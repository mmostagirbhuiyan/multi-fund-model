import React from 'react';
import { Target } from 'lucide-react';
import MetricCard from './MetricCard';

interface RangeSummaryProps {
  pessimistic: number;
  likely: number;
  optimistic: number;
}

const abbreviate = (num: number) => {
  if (num >= 1_000_000)
    return `$${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000)
    return `$${Math.round(num / 1000)}K`;
  return `$${Math.round(num)}`;
};

const RangeSummary: React.FC<RangeSummaryProps> = ({ pessimistic, likely, optimistic }) => {
  const subtitle = `Range: ${abbreviate(pessimistic)} - ${abbreviate(optimistic)}`;
  return (
    <MetricCard
      icon={Target}
      title="Likely Projection"
      value={abbreviate(likely)}
      subtitle={subtitle}
      gradient="from-blue-500 to-purple-600"
    />
  );
};

export default RangeSummary;
