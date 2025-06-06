export interface K401Inputs {
  initialBalance: number;
  annualSalary: number;
  employeeContributionPct: number; // percent of salary
  employerMatchPct: number; // percent of employee contribution
  annualSalaryGrowthRate: number; // percent
  annualReturnRate: number; // percent
}

import { YearlyResult } from '../components/ResultsTable';
import { REITCalculatorSummary } from './reitCalculator';

export function calculate401k(inputs: K401Inputs): { results: YearlyResult[]; summary: REITCalculatorSummary } {
  const { initialBalance, annualSalary, employeeContributionPct, employerMatchPct, annualSalaryGrowthRate, annualReturnRate } = inputs;
  let balance = initialBalance;
  let salary = annualSalary;
  let totalContributions = initialBalance;
  const results: YearlyResult[] = [];
  for (let year = 1; year <= 30; year++) {
    const employeeContribution = salary * (employeeContributionPct / 100);
    const employerContribution = employeeContribution * (employerMatchPct / 100);
    const totalContribution = employeeContribution + employerContribution;
    balance = (balance + totalContribution) * (1 + annualReturnRate / 100);
    totalContributions += totalContribution;
    const roi = totalContributions > 0 ? ((balance - totalContributions) / totalContributions) * 100 : 0;
    results.push({
      year,
      propertyCount: 0,
      action: '',
      totalValue: balance,
      totalDebt: 0,
      netEquity: balance,
      annualCashFlow: totalContribution,
      cashBalance: totalContributions,
      totalDebtService: 0,
      roi,
    });
    salary *= 1 + annualSalaryGrowthRate / 100;
  }
  const final = results[results.length - 1];
  const annualizedReturn = initialBalance > 0 ? (Math.pow(final.totalValue / initialBalance, 1 / 30) - 1) * 100 : 0;
  const summary: REITCalculatorSummary = {
    propertyCount: 0,
    portfolioValue: final.totalValue,
    netEquity: final.netEquity,
    totalDebt: 0,
    roi: final.roi,
    cashExtracted: totalContributions,
    annualizedReturn,
    equityMultiple: totalContributions > 0 ? final.totalValue / totalContributions : 0,
  };
  return { results, summary };
}
