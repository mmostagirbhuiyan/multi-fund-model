import { YearlyResult } from '../components/ResultsTable';
import { REITCalculatorSummary } from './reitCalculator';

export interface BrokerageInputs {
  initialBalance: number;
  contributionAmount: number;
  contributionFrequency: 'annual' | 'monthly';
  annualReturnRate: number; // percent
  taxRate: number; // percent
  years: number;
}

export function calculateBrokerage(inputs: BrokerageInputs): { results: YearlyResult[]; summary: REITCalculatorSummary } {
  const { initialBalance, contributionAmount, contributionFrequency, annualReturnRate, taxRate, years } = inputs;
  let balance = initialBalance;
  let totalContributions = 0;
  const results: YearlyResult[] = [];

  if (contributionFrequency === 'monthly') {
    const monthlyReturn = Math.pow(1 + annualReturnRate / 100, 1 / 12) - 1;
    for (let month = 1; month <= years * 12; month++) {
      balance = (balance + contributionAmount) * (1 + monthlyReturn);
      totalContributions += contributionAmount;
      if (month % 12 === 0) {
        const year = month / 12;
        const invested = initialBalance + totalContributions;
        const roi = invested > 0 ? ((balance - invested) / invested) * 100 : 0;
        results.push({
          year,
          propertyCount: 0,
          action: '',
          totalValue: balance,
          totalDebt: 0,
          netEquity: balance,
          annualCashFlow: contributionAmount * 12,
          cashBalance: initialBalance + totalContributions,
          totalDebtService: 0,
          roi,
        });
      }
    }
  } else {
    for (let year = 1; year <= years; year++) {
      balance = (balance + contributionAmount) * (1 + annualReturnRate / 100);
      totalContributions += contributionAmount;
      const invested = initialBalance + totalContributions;
      const roi = invested > 0 ? ((balance - invested) / invested) * 100 : 0;
      results.push({
        year,
        propertyCount: 0,
        action: '',
        totalValue: balance,
        totalDebt: 0,
        netEquity: balance,
        annualCashFlow: contributionAmount,
        cashBalance: initialBalance + totalContributions,
        totalDebtService: 0,
        roi,
      });
    }
  }

  const final = results[results.length - 1];
  const afterTax = balance * (1 - taxRate / 100);
  const totalInvested = initialBalance + totalContributions;
  const roi = totalInvested > 0 ? ((afterTax - totalInvested) / totalInvested) * 100 : 0;
  const annualizedReturn = initialBalance > 0 ? (Math.pow(afterTax / initialBalance, 1 / years) - 1) * 100 : 0;
  const summary: REITCalculatorSummary = {
    propertyCount: 0,
    portfolioValue: afterTax,
    netEquity: afterTax,
    totalDebt: 0,
    roi,
    cashExtracted: totalContributions,
    annualizedReturn,
    equityMultiple: totalInvested > 0 ? afterTax / totalInvested : 0,
    years,
  };

  return { results, summary };
}
