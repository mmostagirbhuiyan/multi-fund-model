import React from 'react';
import { Building2, DollarSign, TrendingUp, Wallet, ArrowUpRight, Percent, Activity } from 'lucide-react';

export interface SummaryCardsProps {
  results: {
    propertyCount: number;
    portfolioValue: number;
    netEquity: number;
    roi: number;
    cashExtracted: number;
    annualizedReturn: number;
    equityMultiple: number;
  };
  calculatorType: 'reit' | 'roth';
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ results, calculatorType }) => {
  const isREIT = calculatorType === 'reit';
  const cardData = isREIT ? [
    {
      title: 'Total Properties',
      value: results.propertyCount,
      format: (val: number) => val.toString(),
      icon: Building2,
      gradient: 'from-blue-500 to-purple-600',
      description: 'Active portfolio properties'
    },
    {
      title: 'Portfolio Value',
      value: results.portfolioValue,
      format: (val: number) => `$${(val / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      gradient: 'from-green-500 to-emerald-600',
      description: 'Total property value'
    },
    {
      title: 'Net Equity',
      value: results.netEquity,
      format: (val: number) => `$${(val / 1000000).toFixed(1)}M`,
      icon: TrendingUp,
      gradient: 'from-purple-500 to-pink-600',
      description: 'Total equity position'
    },
    {
      title: 'Total ROI',
      value: results.roi,
      format: (val: number) => `${val.toFixed(0)}%`,
      icon: Percent,
      gradient: 'from-yellow-500 to-orange-600',
      description: 'Return on investment'
    },
    {
      title: 'Cash Extracted',
      value: results.cashExtracted,
      format: (val: number) => `$${(val / 1000000).toFixed(1)}M`,
      icon: Wallet,
      gradient: 'from-cyan-500 to-blue-600',
      description: 'Total cash pulled out'
    },
    {
      title: 'Annualized Return',
      value: results.annualizedReturn,
      format: (val: number) => `${val.toFixed(1)}%`,
      icon: ArrowUpRight,
      gradient: 'from-indigo-500 to-violet-600',
      description: 'Yearly return rate'
    },
    {
      title: 'Equity Multiple',
      value: results.equityMultiple,
      format: (val: number) => typeof val === 'number' && !isNaN(val) ? `${val.toFixed(2)}x` : 'N/A',
      icon: Activity,
      gradient: 'from-rose-500 to-pink-600',
      description: 'Equity growth multiple'
    }
  ] : [
    {
      title: 'Account Balance',
      value: results.portfolioValue,
      format: (val: number) => `$${(val / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      gradient: 'from-green-500 to-emerald-600',
      description: 'Projected value'
    },
    {
      title: 'Total Contributions',
      value: results.cashExtracted,
      format: (val: number) => `$${(val / 1000000).toFixed(1)}M`,
      icon: Wallet,
      gradient: 'from-cyan-500 to-blue-600',
      description: 'Invested capital'
    },
    {
      title: 'Total ROI',
      value: results.roi,
      format: (val: number) => `${val.toFixed(0)}%`,
      icon: Percent,
      gradient: 'from-yellow-500 to-orange-600',
      description: 'Return on investment'
    },
    {
      title: 'Annualized Return',
      value: results.annualizedReturn,
      format: (val: number) => `${val.toFixed(1)}%`,
      icon: ArrowUpRight,
      gradient: 'from-indigo-500 to-violet-600',
      description: 'Yearly return rate'
    },
    {
      title: 'Equity Multiple',
      value: results.equityMultiple,
      format: (val: number) => typeof val === 'number' && !isNaN(val) ? `${val.toFixed(2)}x` : 'N/A',
      icon: Activity,
      gradient: 'from-rose-500 to-pink-600',
      description: 'Growth multiple'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="group relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/60 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10"
          style={{
            animationDelay: `${index * 100}ms`
          }}
        >
          {/* Card Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-400">{card.title}</h3>
                <p className="text-xs text-slate-500">{card.description}</p>
              </div>
            </div>
            <div className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center group-hover:bg-slate-700/70 transition-colors">
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
            </div>
          </div>

          {/* Card Value */}
          <div className="relative">
            <div className="text-3xl font-bold text-white mb-1">
              {card.format(card.value)}
            </div>
            
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          </div>

          {/* Card Footer */}
          <div className="mt-4 pt-4 border-t border-slate-700/30">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">30-Year Projection</span>
              <span className="text-slate-300 font-medium">Compound Growth</span>
            </div>
          </div>

          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ))}
    </div>
  );
};

export default SummaryCards; 