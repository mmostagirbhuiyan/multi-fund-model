import React from 'react';
import { PlanResult } from '../types';
import { YearlyResult } from './ResultsTable';

interface Props {
  plans: PlanResult[];
}

const formatDollar = (v: number) => `$${Math.round(v).toLocaleString()}`;

const firstYearToValue = (results: YearlyResult[], target: number) => {
  const idx = results.findIndex(r => r.netEquity >= target);
  return idx >= 0 ? idx + 1 : null;
};

const KeyInsights: React.FC<Props> = ({ plans }) => {
  if (plans.length < 2) return null;
  const [a, b] = plans;
  const delta = a.result.summary.netEquity - b.result.summary.netEquity;
  const contribDelta = a.result.summary.cashExtracted - b.result.summary.cashExtracted;
  const milestone = 250000;
  const aYear = firstYearToValue(a.result.results, milestone);
  const bYear = firstYearToValue(b.result.results, milestone);
  return (
    <div className="my-6 bg-slate-800/40 p-6 rounded-xl">
      <h4 className="text-lg font-semibold text-white mb-3">Key Insights</h4>
      <ul className="list-disc pl-6 space-y-2 text-slate-300 text-sm">
        <li>
          <span className="font-semibold text-indigo-400">{a.plan.name}</span> is projected to finish with
          <span className="font-bold text-indigo-400"> {formatDollar(Math.abs(delta))}</span>
          {delta >= 0 ? ' more' : ' less'} than
          <span className="font-semibold text-pink-400"> {b.plan.name}</span>.
        </li>
        {contribDelta !== 0 && (
          <li>
            This is primarily driven by
            <span className="font-semibold text-indigo-400"> {delta >= 0 ? a.plan.name : b.plan.name}</span>
            having
            <span className="font-bold text-indigo-400"> {formatDollar(Math.abs(contribDelta))}</span>
            {contribDelta >= 0 ? ' more' : ' less'} in total contributions.
          </li>
        )}
        {aYear && bYear && aYear !== bYear && (
          <li>
            <span className="font-semibold text-indigo-400">{aYear < bYear ? a.plan.name : b.plan.name}</span> reaches the
            <span className="font-bold text-indigo-400"> {formatDollar(milestone)}</span> mark approximately
            <span className="font-bold text-indigo-400"> {Math.abs(aYear - bYear)}</span> years earlier than
            <span className="font-semibold text-pink-400"> {aYear < bYear ? b.plan.name : a.plan.name}</span>.
          </li>
        )}
      </ul>
    </div>
  );
};

export default KeyInsights;
