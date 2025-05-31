import React, { useState, useMemo } from 'react';
import CalculatorForm from './components/CalculatorForm';
import SummaryCards from './components/SummaryCards';
import ResultsTable from './components/ResultsTable';
import PortfolioChart from './components/PortfolioChart';
import { calculateREIT } from './logic/reitCalculator';
import { Box, Typography, Divider } from '@mui/material';

const defaultValues = {
  downPayment: 20,
  mortgageRate: 5,
  appreciationRate: 4,
  initialCash: 100000,
  refiLTV: 80,
  closingCosts: 2.5,
  refiCosts: 2,
  incomeTaxRate: 0,
  yieldMode: 'itemized' as 'itemized' | 'net',
  grossRentalYield: 8,
  propertyTaxRate: 1.5,
  maintenanceRate: 1,
  insuranceRate: 0.5,
  managementFeeRate: 10,
  vacancyRate: 7,
  netRentalYield: 6,
  calculatedNetYield: 0,
};

function calculateNetYield(values: typeof defaultValues): number {
  if (values.yieldMode === 'itemized') {
    const grossRentalYield = values.grossRentalYield / 100;
    const propertyTaxRate = values.propertyTaxRate / 100;
    const maintenanceRate = values.maintenanceRate / 100;
    const insuranceRate = values.insuranceRate / 100;
    const managementFeeRate = values.managementFeeRate / 100;
    const vacancyRate = values.vacancyRate / 100;
    const grossRent = grossRentalYield;
    const managementFees = grossRent * managementFeeRate;
    const vacancyAdjustedRent = grossRent * (1 - vacancyRate);
    const totalExpenses = propertyTaxRate + maintenanceRate + insuranceRate + managementFees;
    return (vacancyAdjustedRent - totalExpenses) * 100;
  } else {
    return values.netRentalYield;
  }
}

const App: React.FC = () => {
  const [values, setValues] = useState(defaultValues);

  // Update calculatedNetYield whenever relevant fields change
  const calculatedNetYield = useMemo(() => calculateNetYield(values), [values]);

  // Calculate results and summary
  const { results, summary } = useMemo(() =>
    calculateREIT({ ...values }),
    [values, calculatedNetYield]
  );

  console.log('Summary object:', summary);

  // Prepare data for Portfolio Composition Pie Chart
  const portfolioCompositionData = useMemo(() => ({
    labels: ['Total Debt', 'Net Equity'],
    values: [summary.totalDebt, summary.netEquity],
  }), [summary]);

  // Prepare data for Annual Cash Flow Bar Chart
  const annualCashFlowData = useMemo(() => ({
    labels: results.map(r => `Year ${r.year}`),
    values: results.map(r => r.annualCashFlow / 1000),
  }), [results]);
  
  const handleChange = (field: string, value: number | string) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const handleYieldModeChange = (mode: 'itemized' | 'net') => {
    setValues(prev => ({ ...prev, yieldMode: mode }));
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Professional 30-Year REIT Analysis</h1>
        <p>Complete Cash-Out Refinancing Model with 1031 Exchange and Detailed Yield Options</p>
      </div>
      <CalculatorForm
        values={{ ...values, calculatedNetYield }}
        onChange={handleChange}
        onYieldModeChange={handleYieldModeChange}
      />
      <SummaryCards {...summary} />
      
      {/* Consolidate charts into PortfolioChart */}
      <PortfolioChart 
        results={results} 
        portfolioCompositionData={portfolioCompositionData} 
        annualCashFlowData={annualCashFlowData} 
      />

      <ResultsTable results={results} />
      <div className="debug-info">
        <strong>Model Notes:</strong> This analysis includes proper cash-out refinancing mechanics, seasoning periods, closing costs, and accurate mortgage amortization schedules with monthly granularity, 1-month gap for new property income, monthly acquisition timing, and annualized return on initial investment. Initial property value is 5X initial cash. Expenses include property taxes, maintenance, insurance, management fees, vacancy rate, and 25% income tax on net rental income.
      </div>
    </div>
  );
};

export default App; 