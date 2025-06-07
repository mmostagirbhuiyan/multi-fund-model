import React from 'react';
import { Building2, DollarSign, TrendingUp, Wallet, Percent, Activity, ArrowUpRight } from 'lucide-react';
import RangeSummary from './RangeSummary';
import GoalProbabilityCard from './GoalProbabilityCard';
import MetricCard from './MetricCard';

export interface SummaryCardsProps {
  results: {
    propertyCount: number;
    portfolioValue: number;
    netEquity: number;
    roi: number;
    cashExtracted: number;
    annualizedReturn: number;
    equityMultiple: number;
    years: number;
    rangeLow?: number;
    rangeHigh?: number;
    goalProbability?: number;
  };
  calculatorType: 'reit' | 'roth' | 'k401' | 'brokerage' | 'hsa';
}

const formatCurrency = (val: number) => {
  if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(1)}M`;
  if (val >= 1_000) return `$${Math.round(val / 1000)}K`;
  return `$${Math.round(val)}`;
};

const SummaryCards: React.FC<SummaryCardsProps> = ({ results, calculatorType }) => {
  const isREIT = calculatorType === 'reit';
  const showMonteCarloRange = !isREIT && results.rangeLow !== undefined;

  const cardData = isREIT
    ? [
        {
          title: 'Total Properties',
          value: results.propertyCount,
          format: (val: number) => val.toString(),
          icon: Building2,
          gradient: 'from-blue-500 to-purple-600',
          subtitle: 'Active portfolio properties',
        },
        {
          title: 'Portfolio Value',
          value: results.portfolioValue,
          format: formatCurrency,
          icon: DollarSign,
          gradient: 'from-green-500 to-emerald-600',
          subtitle: 'Total property value',
        },
        {
          title: 'Net Equity',
          value: results.netEquity,
          format: formatCurrency,
          icon: TrendingUp,
          gradient: 'from-purple-500 to-pink-600',
          subtitle: 'Total equity position',
        },
        {
          title: 'Total ROI',
          value: results.roi,
          format: (val: number) => `${val.toFixed(0)}%`,
          icon: Percent,
          gradient: 'from-yellow-500 to-orange-600',
          subtitle: 'Return on investment',
        },
        {
          title: 'Cash Extracted',
          value: results.cashExtracted,
          format: formatCurrency,
          icon: Wallet,
          gradient: 'from-cyan-500 to-blue-600',
          subtitle: 'Total cash pulled out',
        },
        {
          title: 'Annualized Return',
          value: results.annualizedReturn,
          format: (val: number) => `${val.toFixed(1)}%`,
          icon: ArrowUpRight,
          gradient: 'from-indigo-500 to-violet-600',
          subtitle: 'Average yearly return rate',
        },
        {
          title: 'Equity Multiple',
          value: results.equityMultiple,
          format: (val: number) => (typeof val === 'number' && !isNaN(val) ? `${val.toFixed(2)}x` : 'N/A'),
          icon: Activity,
          gradient: 'from-rose-500 to-pink-600',
          subtitle: 'Equity growth multiple',
        },
      ]
    : [
        {
          title: 'Account Balance',
          value: results.portfolioValue,
          format: formatCurrency,
          icon: DollarSign,
          gradient: 'from-green-500 to-emerald-600',
          subtitle: 'Likely portfolio value',
        },
        {
          title: 'Total Contributions',
          value: results.cashExtracted,
          format: formatCurrency,
          icon: Wallet,
          gradient: 'from-cyan-500 to-blue-600',
          subtitle: 'Total capital invested',
        },
        {
          title: 'Total ROI',
          value: results.roi,
          format: (val: number) => `${val.toFixed(0)}%`,
          icon: Percent,
          gradient: 'from-yellow-500 to-orange-600',
          subtitle: 'Return on investment',
        },
        {
          title: 'Annualized Return',
          value: results.annualizedReturn,
          format: (val: number) => `${val.toFixed(1)}%`,
          icon: ArrowUpRight,
          gradient: 'from-indigo-500 to-violet-600',
          subtitle: 'Average yearly return rate',
        },
        {
          title: 'Equity Multiple',
          value: results.equityMultiple,
          format: (val: number) => (typeof val === 'number' && !isNaN(val) ? `${val.toFixed(2)}x` : 'N/A'),
          icon: Activity,
          gradient: 'from-rose-500 to-pink-600',
          subtitle: 'Initial investment growth',
        },
      ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {showMonteCarloRange && (
        <RangeSummary pessimistic={results.rangeLow!} likely={results.portfolioValue} optimistic={results.rangeHigh!} />
      )}
      {cardData
        .filter((_, idx) => !(showMonteCarloRange && idx === 0))
        .map((card, index) => (
          <MetricCard
            key={index}
            icon={card.icon}
            title={card.title}
            value={card.format(card.value)}
            subtitle={card.subtitle}
            gradient={card.gradient}
          />
        ))}
      {showMonteCarloRange && results.goalProbability !== undefined && (
        <GoalProbabilityCard probability={results.goalProbability} />
      )}
    </div>
  );
};

export default SummaryCards;
