export interface HSAInputs {
  initialBalance: number;
  annualContribution: number;
  annualMedicalExpenses: number;
  annualGrowthRate: number; // percent
  years: number;
}

import { YearlyResult } from '../components/ResultsTable';
import { REITCalculatorSummary } from './reitCalculator';

export function calculateHSA(inputs: HSAInputs): { results: YearlyResult[]; summary: REITCalculatorSummary } {
  const { initialBalance, annualContribution, annualMedicalExpenses, annualGrowthRate, years } = inputs;
  let balance = initialBalance;
  let totalContributions = initialBalance;
  let totalWithdrawals = 0;
  const results: YearlyResult[] = [];
  for (let year = 1; year <= years; year++) {
    balance = (balance + annualContribution - annualMedicalExpenses) * (1 + annualGrowthRate / 100);
    totalContributions += annualContribution;
    totalWithdrawals += annualMedicalExpenses;
    const roi = totalContributions > 0 ? ((balance + totalWithdrawals - totalContributions) / totalContributions) * 100 : 0;
    results.push({
      year,
      propertyCount: 0,
      action: '',
      totalValue: balance,
      totalDebt: 0,
      netEquity: balance,
      annualCashFlow: annualContribution - annualMedicalExpenses,
      cashBalance: totalContributions - totalWithdrawals,
      totalDebtService: 0,
      roi,
    });
  }
  const final = results[results.length - 1];
  const roiFinal = totalContributions > 0 ? ((final.netEquity + totalWithdrawals - totalContributions) / totalContributions) * 100 : 0;
  const annualizedReturn = initialBalance > 0 ? (Math.pow(final.netEquity / initialBalance, 1 / years) - 1) * 100 : 0;
  const summary: REITCalculatorSummary = {
    propertyCount: 0,
    portfolioValue: final.netEquity,
    netEquity: final.netEquity,
    totalDebt: 0,
    roi: roiFinal,
    cashExtracted: totalContributions,
    annualizedReturn,
    equityMultiple: totalContributions > 0 ? (final.netEquity + totalWithdrawals) / totalContributions : 0,
    years,
  };
  return { results, summary };
}


