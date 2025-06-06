export interface K401Inputs {
  initialBalance: number;
  annualSalary: number;
  employeeContributionPct: number; // percent of salary
  employerMatchPct: number; // percent of employee contribution
  annualSalaryGrowthRate: number; // percent
  annualReturnRate: number; // percent
  taxRate: number; // percent
  years: number;
}

import { YearlyResult } from '../components/ResultsTable';
import { REITCalculatorSummary } from './reitCalculator';

export function calculate401k(inputs: K401Inputs): { results: YearlyResult[]; summary: REITCalculatorSummary } {
  const { initialBalance, annualSalary, employeeContributionPct, employerMatchPct, annualSalaryGrowthRate, annualReturnRate, taxRate, years } = inputs;
  let balance = initialBalance;
  let salary = annualSalary;
  let totalContributions = 0;
  const results: YearlyResult[] = [];
  for (let year = 1; year <= years; year++) {
    const employeeContribution = salary * (employeeContributionPct / 100);
    const employerContribution = employeeContribution * (employerMatchPct / 100);
    const totalContribution = employeeContribution + employerContribution;
    balance = (balance + totalContribution) * (1 + annualReturnRate / 100);
    totalContributions += totalContribution;
    const invested = initialBalance + totalContributions;
    const roi = invested > 0 ? ((balance - invested) / invested) * 100 : 0;
    results.push({
      year,
      propertyCount: 0,
      action: '',
      totalValue: balance,
      totalDebt: 0,
      netEquity: balance,
      annualCashFlow: totalContribution,
      cashBalance: initialBalance + totalContributions,
      totalDebtService: 0,
      roi,
    });
    salary *= 1 + annualSalaryGrowthRate / 100;
  }
  const final = results[results.length - 1];
  const afterTax = final.totalValue * (1 - taxRate / 100);
  const totalInvested = initialBalance + totalContributions;
  const roiAfterTax = totalInvested > 0 ? ((afterTax - totalInvested) / totalInvested) * 100 : 0;
  const annualizedReturn = initialBalance > 0 ? (Math.pow(afterTax / initialBalance, 1 / years) - 1) * 100 : 0;
  const summary: REITCalculatorSummary = {
    propertyCount: 0,
    portfolioValue: afterTax,
    netEquity: afterTax,
    totalDebt: 0,
    roi: roiAfterTax,
    cashExtracted: totalContributions,
    annualizedReturn,
    equityMultiple: totalInvested > 0 ? afterTax / totalInvested : 0,
    years,
  };
  return { results, summary };
}
