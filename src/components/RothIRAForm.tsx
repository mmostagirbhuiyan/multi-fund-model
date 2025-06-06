import React from 'react';
import { DollarSign, Percent } from 'lucide-react';

export interface RothIRAFormProps {
  onSubmit: (formData: any) => void;
  initialData?: any;
}

const RothIRAForm: React.FC<RothIRAFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = React.useState({
    initialBalance: initialData?.initialBalance ?? 0,
    annualContribution: initialData?.annualContribution ?? 6500,
    annualGrowthRate: initialData?.annualGrowthRate ?? 7,
    years: initialData?.years ?? 30,
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value === '' ? '' : Number(value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClasses = "w-full bg-slate-800/40 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all";
  const labelClasses = "block text-sm font-medium text-slate-300 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-yellow-400" />
              Initial Balance
            </div>
          </label>
          <input
            type="number"
            value={formData.initialBalance}
            onChange={e => handleChange('initialBalance', e.target.value)}
            className={inputClasses}
            step="100"
            min="0"
          />
        </div>
        <div>
          <label className={labelClasses}>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-400" />
              Annual Contribution
            </div>
          </label>
          <input
            type="number"
            value={formData.annualContribution}
            onChange={e => handleChange('annualContribution', e.target.value)}
            className={inputClasses}
            step="100"
            min="0"
          />
        </div>
        <div>
          <label className={labelClasses}>
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-blue-400" />
              Annual Growth Rate
            </div>
          </label>
          <input
            type="number"
            value={formData.annualGrowthRate}
            onChange={e => handleChange('annualGrowthRate', e.target.value)}
            className={inputClasses}
            step="0.1"
            min="0"
          />
        </div>
        <div>
          <label className={labelClasses}>
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-cyan-400" />
              Projection Years
            </div>
          </label>
          <input
            type="number"
            value={formData.years}
            onChange={e => handleChange('years', e.target.value)}
            className={inputClasses}
            step="1"
            min="1"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      >
        Calculate Growth
      </button>
    </form>
  );
};

export default RothIRAForm;
