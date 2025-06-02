import React from 'react';
import { Building2, Calculator, TrendingUp, DollarSign, Percent, Home, Shield, Briefcase, AlertCircle } from 'lucide-react';

export interface CalculatorFormProps {
  onSubmit: (formData: any) => void;
  initialData?: any;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = React.useState({
    downPayment: initialData?.downPayment ?? 20,
    mortgageRate: initialData?.mortgageRate ?? 5.5,
    appreciationRate: initialData?.appreciationRate ?? 3,
    initialCash: initialData?.initialCash ?? 100000,
    refiLTV: initialData?.refiLTV ?? 75,
    closingCosts: initialData?.closingCosts ?? 4,
    refiCosts: initialData?.refiCosts ?? 2,
    incomeTaxRate: initialData?.incomeTaxRate ?? 24,
    yieldMode: initialData?.yieldMode ?? 'itemized' as 'itemized' | 'net',
    grossRentalYield: initialData?.grossRentalYield ?? 6,
    propertyTaxRate: initialData?.propertyTaxRate ?? 1.2,
    maintenanceRate: initialData?.maintenanceRate ?? 1,
    insuranceRate: initialData?.insuranceRate ?? 0.5,
    managementFeeRate: initialData?.managementFeeRate ?? 8,
    vacancyRate: initialData?.vacancyRate ?? 5,
    netRentalYield: initialData?.netRentalYield ?? 4,
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'yieldMode' ? value : (value === '' ? '' : Number(value))
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClasses = "w-full bg-slate-800/40 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all";
  const labelClasses = "block text-sm font-medium text-slate-300 mb-2";
  const sectionClasses = "bg-slate-800/20 rounded-2xl p-6 border border-slate-700/30";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Investment Parameters Section */}
      <div className={sectionClasses}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Investment Parameters</h3>
            <p className="text-sm text-slate-400">Core investment assumptions</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-blue-400" />
                Down Payment
              </div>
            </label>
            <input
              type="number"
              value={formData.downPayment}
              onChange={(e) => handleChange('downPayment', e.target.value)}
              className={inputClasses}
              step="1"
              min="0"
              max="100"
            />
          </div>

          <div>
            <label className={labelClasses}>
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-purple-400" />
                Mortgage Rate
              </div>
            </label>
            <input
              type="number"
              value={formData.mortgageRate}
              onChange={(e) => handleChange('mortgageRate', e.target.value)}
              className={inputClasses}
              step="0.1"
              min="0"
            />
          </div>

          <div>
            <label className={labelClasses}>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                Annual Appreciation
              </div>
            </label>
            <input
              type="number"
              value={formData.appreciationRate}
              onChange={(e) => handleChange('appreciationRate', e.target.value)}
              className={inputClasses}
              step="0.1"
              min="0"
            />
          </div>

          <div>
            <label className={labelClasses}>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-yellow-400" />
                Initial Cash
              </div>
            </label>
            <input
              type="number"
              value={formData.initialCash}
              onChange={(e) => handleChange('initialCash', e.target.value)}
              className={inputClasses}
              step="1000"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Refinancing Parameters Section */}
      <div className={sectionClasses}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Refinancing Parameters</h3>
            <p className="text-sm text-slate-400">Cash-out refinancing settings</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-green-400" />
                Max Refi LTV
              </div>
            </label>
            <input
              type="number"
              value={formData.refiLTV}
              onChange={(e) => handleChange('refiLTV', e.target.value)}
              className={inputClasses}
              step="1"
              min="0"
              max="100"
            />
          </div>

          <div>
            <label className={labelClasses}>
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-blue-400" />
                Refinancing Costs
              </div>
            </label>
            <input
              type="number"
              value={formData.refiCosts}
              onChange={(e) => handleChange('refiCosts', e.target.value)}
              className={inputClasses}
              step="0.1"
              min="0"
            />
          </div>

          <div>
            <label className={labelClasses}>
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-purple-400" />
                Closing Costs
              </div>
            </label>
            <input
              type="number"
              value={formData.closingCosts}
              onChange={(e) => handleChange('closingCosts', e.target.value)}
              className={inputClasses}
              step="0.1"
              min="0"
            />
          </div>

          <div>
            <label className={labelClasses}>
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-red-400" />
                Income Tax Rate
              </div>
            </label>
            <input
              type="number"
              value={formData.incomeTaxRate}
              onChange={(e) => handleChange('incomeTaxRate', e.target.value)}
              className={inputClasses}
              step="0.1"
              min="0"
              max="100"
            />
          </div>
        </div>
      </div>

      {/* Rental Yield Section */}
      <div className={sectionClasses}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Rental Yield Calculator</h3>
            <p className="text-sm text-slate-400">Property income and expense parameters</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="itemized"
                name="yieldMode"
                value="itemized"
                checked={formData.yieldMode === 'itemized'}
                onChange={(e) => handleChange('yieldMode', e.target.value)}
                className="w-4 h-4 text-blue-500 border-slate-600 focus:ring-blue-500 bg-slate-800 checked:bg-blue-500 checked:border-blue-500"
              />
              <label htmlFor="itemized" className="text-white">Itemized Yield Inputs</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="net"
                name="yieldMode"
                value="net"
                checked={formData.yieldMode === 'net'}
                onChange={(e) => handleChange('yieldMode', e.target.value)}
                className="w-4 h-4 text-blue-500 border-slate-600 focus:ring-blue-500 bg-slate-800 checked:bg-blue-500 checked:border-blue-500"
              />
              <label htmlFor="net" className="text-white">Net Yield Input</label>
            </div>
          </div>
        </div>

        {formData.yieldMode === 'itemized' ? (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>
                <div className="flex items-center gap-2">
                  <Percent className="w-4 h-4 text-green-400" />
                  Gross Rental Yield
                </div>
              </label>
              <input
                type="number"
                value={formData.grossRentalYield}
                onChange={(e) => handleChange('grossRentalYield', e.target.value)}
                className={inputClasses}
                step="0.1"
                min="0"
              />
            </div>

            <div>
              <label className={labelClasses}>
                <div className="flex items-center gap-2">
                  <Percent className="w-4 h-4 text-blue-400" />
                  Property Tax Rate
                </div>
              </label>
              <input
                type="number"
                value={formData.propertyTaxRate}
                onChange={(e) => handleChange('propertyTaxRate', e.target.value)}
                className={inputClasses}
                step="0.1"
                min="0"
              />
            </div>

            <div>
              <label className={labelClasses}>
                <div className="flex items-center gap-2">
                  <Percent className="w-4 h-4 text-purple-400" />
                  Maintenance Rate
                </div>
              </label>
              <input
                type="number"
                value={formData.maintenanceRate}
                onChange={(e) => handleChange('maintenanceRate', e.target.value)}
                className={inputClasses}
                step="0.1"
                min="0"
              />
            </div>

            <div>
              <label className={labelClasses}>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-yellow-400" />
                  Insurance Rate
                </div>
              </label>
              <input
                type="number"
                value={formData.insuranceRate}
                onChange={(e) => handleChange('insuranceRate', e.target.value)}
                className={inputClasses}
                step="0.1"
                min="0"
              />
            </div>

            <div>
              <label className={labelClasses}>
                <div className="flex items-center gap-2">
                  <Percent className="w-4 h-4 text-red-400" />
                  Management Fee Rate
                </div>
              </label>
              <input
                type="number"
                value={formData.managementFeeRate}
                onChange={(e) => handleChange('managementFeeRate', e.target.value)}
                className={inputClasses}
                step="0.1"
                min="0"
              />
            </div>

            <div>
              <label className={labelClasses}>
                <div className="flex items-center gap-2">
                  <Percent className="w-4 h-4 text-orange-400" />
                  Vacancy Rate
                </div>
              </label>
              <input
                type="number"
                value={formData.vacancyRate}
                onChange={(e) => handleChange('vacancyRate', e.target.value)}
                className={inputClasses}
                step="0.1"
                min="0"
                max="100"
              />
            </div>
          </div>
        ) : (
          <div>
            <label className={labelClasses}>
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-green-400" />
                Net Rental Yield
              </div>
            </label>
            <input
              type="number"
              value={formData.netRentalYield}
              onChange={(e) => handleChange('netRentalYield', e.target.value)}
              className={inputClasses}
              step="0.1"
              min="0"
            />
          </div>
        )}
      </div>

      {/* Info Alert */}
      <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
        <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
        <div className="text-sm text-slate-300">
          <p className="font-medium text-white mb-1">Note about initial investment</p>
          <p>The initial property value is assumed to be 5X your initial cash investment. Closing costs (4%) are financed through the initial mortgage, preserving initial cash for future acquisitions.</p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      >
        Calculate Portfolio Performance
      </button>
    </form>
  );
};

export default CalculatorForm; 