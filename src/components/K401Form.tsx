import React from 'react';
import { DollarSign, Percent } from 'lucide-react';

export interface K401FormProps {
  onSubmit: (formData: any) => void;
  initialData?: any;
}

const K401Form: React.FC<K401FormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = React.useState({
    initialBalance: initialData?.initialBalance ?? 1000,
    annualSalary: initialData?.annualSalary ?? 60000,
    employeeContributionPct: initialData?.employeeContributionPct ?? 6,
    employerMatchPct: initialData?.employerMatchPct ?? 50,
    annualSalaryGrowthRate: initialData?.annualSalaryGrowthRate ?? 3,
    annualReturnRate: initialData?.annualReturnRate ?? 7,
    taxRate: initialData?.taxRate ?? 20,
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
              Annual Salary
            </div>
          </label>
          <input
            type="number"
            value={formData.annualSalary}
            onChange={e => handleChange('annualSalary', e.target.value)}
            className={inputClasses}
            step="1000"
            min="0"
          />
        </div>
        <div>
          <label className={labelClasses}>
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-blue-400" />
              Employee Contribution %
            </div>
          </label>
          <input
            type="number"
            value={formData.employeeContributionPct}
            onChange={e => handleChange('employeeContributionPct', e.target.value)}
            className={inputClasses}
            step="0.1"
            min="0"
            max="100"
          />
        </div>
        <div>
          <label className={labelClasses}>
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-purple-400" />
              Employer Match %
            </div>
          </label>
          <input
            type="number"
            value={formData.employerMatchPct}
            onChange={e => handleChange('employerMatchPct', e.target.value)}
            className={inputClasses}
            step="1"
            min="0"
            max="100"
          />
        </div>
        <div>
          <label className={labelClasses}>
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-cyan-400" />
              Annual Salary Growth %
            </div>
          </label>
          <input
            type="number"
            value={formData.annualSalaryGrowthRate}
            onChange={e => handleChange('annualSalaryGrowthRate', e.target.value)}
            className={inputClasses}
            step="0.1"
            min="0"
          />
        </div>
        <div>
          <label className={labelClasses}>
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-teal-400" />
              Annual Return Rate
            </div>
          </label>
          <input
            type="number"
            value={formData.annualReturnRate}
            onChange={e => handleChange('annualReturnRate', e.target.value)}
            className={inputClasses}
            step="0.1"
            min="0"
          />
        </div>
        <div>
          <label className={labelClasses}>
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-purple-400" />
              Tax Rate %
            </div>
          </label>
          <input
            type="number"
            value={formData.taxRate}
            onChange={e => handleChange('taxRate', e.target.value)}
            className={inputClasses}
            step="0.1"
            min="0"
            max="100"
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

export default K401Form;
