export interface RothIRAInputs {
  initialBalance: number;
  annualContribution: number;
  annualGrowthRate: number; // percent
  years: number;
}

import { YearlyResult } from '../components/ResultsTable';
import { REITCalculatorSummary } from './reitCalculator';

export function calculateRothIRA(inputs: RothIRAInputs): { results: YearlyResult[]; summary: REITCalculatorSummary } {
  const { initialBalance, annualContribution, annualGrowthRate, years } = inputs;
  let balance = initialBalance;
  let totalContributions = 0;
  const results: YearlyResult[] = [];
  for (let year = 1; year <= years; year++) {
    balance = (balance + annualContribution) * (1 + annualGrowthRate / 100);
    totalContributions += annualContribution;
    const invested = initialBalance + totalContributions;
    const roi = invested > 0 ? ((balance - invested) / invested) * 100 : 0;
    results.push({
      year,
      propertyCount: 0,
      action: '',
      totalValue: balance,
      totalDebt: 0,
      netEquity: balance,
      annualCashFlow: annualContribution,
      cashBalance: initialBalance + totalContributions,
      totalDebtService: 0,
      roi,
    });
  }
  const final = results[results.length - 1];
  const afterTax = final.totalValue;
  const totalInvested = initialBalance + totalContributions;
  const roiAfterTax = totalInvested > 0 ? ((afterTax - totalInvested) / totalInvested) * 100 : 0;
  const annualizedReturn = initialBalance > 0 ? (Math.pow(afterTax / initialBalance, 1 / years) - 1) * 100 : 0;
  const summary: REITCalculatorSummary = {
    propertyCount: 0,
    portfolioValue: afterTax,
    netEquity: afterTax,
    totalDebt: 0,
    roi: roiAfterTax,
    cashExtracted: totalContributions, // reuse field to show total contributions
    annualizedReturn,
    equityMultiple: totalInvested > 0 ? afterTax / totalInvested : 0,
    years,
  };
  return { results, summary };
}
