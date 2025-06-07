import React from 'react';

interface RangeSummaryProps {
  pessimistic: number;
  likely: number;
  optimistic: number;
}

const formatCurrency = (val: number) =>
  `$${Math.round(val).toLocaleString()}`;

const RangeSummary: React.FC<RangeSummaryProps> = ({ pessimistic, likely, optimistic }) => {
  return (
    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 flex justify-between text-center">
      <div className="flex-1">
        <div className="text-sm text-slate-400 mb-1">Pessimistic</div>
        <div className="text-lg font-semibold text-red-300">{formatCurrency(pessimistic)}</div>
      </div>
      <div className="flex-1">
        <div className="text-sm text-slate-400 mb-1">Likely Projection</div>
        <div className="text-2xl font-bold text-white">{formatCurrency(likely)}</div>
      </div>
      <div className="flex-1">
        <div className="text-sm text-slate-400 mb-1">Optimistic</div>
        <div className="text-lg font-semibold text-green-300">{formatCurrency(optimistic)}</div>
      </div>
    </div>
  );
};

export default RangeSummary;
