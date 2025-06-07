import React from 'react';

interface MetricCardProps {
  icon: React.ElementType;
  title: string;
  value: React.ReactNode;
  subtitle: string;
  gradient: string;
  children?: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, title, value, subtitle, gradient, children }) => {
  return (
    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-sm font-medium text-slate-400">{title}</h3>
      </div>
      <div className="text-3xl font-bold text-white">{value}</div>
      {children}
      <div className="text-xs text-slate-500 mt-1">{subtitle}</div>
    </div>
  );
};

export default MetricCard;
