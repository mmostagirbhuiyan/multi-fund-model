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
  let totalContributions = initialBalance;
  const results: YearlyResult[] = [];

  if (contributionFrequency === 'monthly') {
    const monthlyReturn = Math.pow(1 + annualReturnRate / 100, 1 / 12) - 1;
    for (let month = 1; month <= years * 12; month++) {
      balance = (balance + contributionAmount) * (1 + monthlyReturn);
      totalContributions += contributionAmount;
      if (month % 12 === 0) {
        const year = month / 12;
        const roi = totalContributions > 0 ? ((balance - totalContributions) / totalContributions) * 100 : 0;
        results.push({
          year,
          propertyCount: 0,
          action: '',
          totalValue: balance,
          totalDebt: 0,
          netEquity: balance,
          annualCashFlow: contributionAmount * 12,
          cashBalance: totalContributions,
          totalDebtService: 0,
          roi,
        });
      }
    }
  } else {
    for (let year = 1; year <= years; year++) {
      balance = (balance + contributionAmount) * (1 + annualReturnRate / 100);
      totalContributions += contributionAmount;
      const roi = totalContributions > 0 ? ((balance - totalContributions) / totalContributions) * 100 : 0;
      results.push({
        year,
        propertyCount: 0,
        action: '',
        totalValue: balance,
        totalDebt: 0,
        netEquity: balance,
        annualCashFlow: contributionAmount,
        cashBalance: totalContributions,
        totalDebtService: 0,
        roi,
      });
    }
  }

  const final = results[results.length - 1];
  const afterTax = balance * (1 - taxRate / 100);
  const roi = totalContributions > 0 ? ((afterTax - totalContributions) / totalContributions) * 100 : 0;
  const annualizedReturn = initialBalance > 0 ? (Math.pow(afterTax / initialBalance, 1 / years) - 1) * 100 : 0;
  const summary: REITCalculatorSummary = {
    propertyCount: 0,
    portfolioValue: afterTax,
    netEquity: afterTax,
    totalDebt: 0,
    roi,
    cashExtracted: totalContributions,
    annualizedReturn,
    equityMultiple: totalContributions > 0 ? afterTax / totalContributions : 0,
    years,
  };

  return { results, summary };
}
