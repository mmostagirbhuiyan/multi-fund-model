import React from 'react';
import { Percent } from 'lucide-react';

interface Props {
  probability: number;
}

const GoalProbabilityCard: React.FC<Props> = ({ probability }) => {
  const pct = Math.max(0, Math.min(100, probability));
  return (
    <div className="group relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/60 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
          <Percent className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-slate-400">Probability of Reaching Target</h3>
          <p className="text-xs text-slate-500">Chance of hitting goal</p>
        </div>
      </div>
      <div className="text-3xl font-bold text-white mb-2">{pct.toFixed(0)}%</div>
      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-1">
        <div className="h-full bg-gradient-to-r from-green-400 to-blue-500" style={{ width: `${pct}%` }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
    </div>
  );
};

export default GoalProbabilityCard;
