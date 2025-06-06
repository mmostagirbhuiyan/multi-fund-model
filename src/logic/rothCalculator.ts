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
  let totalContributions = initialBalance;
  const results: YearlyResult[] = [];
  for (let year = 1; year <= years; year++) {
    balance = (balance + annualContribution) * (1 + annualGrowthRate / 100);
    totalContributions += annualContribution;
    const roi = totalContributions > 0 ? ((balance - totalContributions) / totalContributions) * 100 : 0;
    results.push({
      year,
      propertyCount: 0,
      action: '',
      totalValue: balance,
      totalDebt: 0,
      netEquity: balance,
      annualCashFlow: annualContribution,
      cashBalance: totalContributions,
      totalDebtService: 0,
      roi,
    });
  }
  const final = results[results.length - 1];
  const annualizedReturn = initialBalance > 0 ? (Math.pow(final.totalValue / initialBalance, 1 / years) - 1) * 100 : 0;
  const summary: REITCalculatorSummary = {
    propertyCount: 0,
    portfolioValue: final.totalValue,
    netEquity: final.netEquity,
    totalDebt: 0,
    roi: final.roi,
    cashExtracted: totalContributions, // reuse field to show total contributions
    annualizedReturn,
    equityMultiple: totalContributions > 0 ? final.totalValue / totalContributions : 0,
    years,
  };
  return { results, summary };
}
