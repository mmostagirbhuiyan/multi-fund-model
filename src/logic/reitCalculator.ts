import { YearlyResult } from '../components/ResultsTable';

export interface REITCalculatorInputs {
  downPayment: number;
  mortgageRate: number;
  appreciationRate: number;
  initialCash: number;
  refiLTV: number;
  closingCosts: number;
  refiCosts: number;
  incomeTaxRate: number;
  yieldMode: 'itemized' | 'net';
  grossRentalYield: number;
  propertyTaxRate: number;
  maintenanceRate: number;
  insuranceRate: number;
  managementFeeRate: number;
  vacancyRate: number;
  netRentalYield: number;
  years: number;
}

export interface REITCalculatorSummary {
  propertyCount: number;
  portfolioValue: number;
  netEquity: number;
  totalDebt: number;
  roi: number;
  cashExtracted: number;
  annualizedReturn: number;
  equityMultiple: number;
  years: number;
}

function calculateMonthlyPayment(principal: number, rate: number, years: number): number {
  if (rate === 0) return principal / (years * 12);
  const monthlyRate = rate / 12;
  const numPayments = years * 12;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);
}

function calculateRemainingBalance(originalPrincipal: number, rate: number, years: number, paymentsMade: number): number {
  if (rate === 0) return originalPrincipal - (paymentsMade * originalPrincipal / (years * 12));
  const monthlyRate = rate / 12;
  const numPayments = years * 12;
  const monthlyPayment = calculateMonthlyPayment(originalPrincipal, rate, years);
  if (paymentsMade >= numPayments) return 0;
  return originalPrincipal * Math.pow(1 + monthlyRate, paymentsMade) -
    monthlyPayment * ((Math.pow(1 + monthlyRate, paymentsMade) - 1) / monthlyRate);
}

export function calculateREIT(inputs: REITCalculatorInputs): {
  results: YearlyResult[];
  summary: REITCalculatorSummary;
} {
  const downPaymentPct = inputs.downPayment / 100;
  const mortgageRate = inputs.mortgageRate / 100;
  const appreciationRate = inputs.appreciationRate / 100;
  const initialCash = inputs.initialCash;
  const refiLTV = inputs.refiLTV / 100;
  const closingCostsPct = inputs.closingCosts / 100;
  const refiCostsPct = inputs.refiCosts / 100;
  const incomeTaxRate = inputs.incomeTaxRate / 100;
  const yieldMode = inputs.yieldMode;
  const years = inputs.years;

  let netRentalYield: number;
  let grossRentalYield = 0, propertyTaxRate = 0, maintenanceRate = 0, insuranceRate = 0, managementFeeRate = 0, vacancyRate = 0;

  if (yieldMode === 'itemized') {
    grossRentalYield = inputs.grossRentalYield / 100;
    propertyTaxRate = inputs.propertyTaxRate / 100;
    maintenanceRate = inputs.maintenanceRate / 100;
    insuranceRate = inputs.insuranceRate / 100;
    managementFeeRate = inputs.managementFeeRate / 100;
    vacancyRate = inputs.vacancyRate / 100;
    const grossRent = grossRentalYield;
    const managementFees = grossRent * managementFeeRate;
    const vacancyAdjustedRent = grossRent * (1 - vacancyRate);
    const totalExpenses = propertyTaxRate + maintenanceRate + insuranceRate + managementFees;
    netRentalYield = vacancyAdjustedRent - totalExpenses;
  } else {
    netRentalYield = inputs.netRentalYield / 100;
  }

  const initialPropertyValue = initialCash * 5;
  const monthlyAppreciation = Math.pow(1 + appreciationRate, 1 / 12) - 1;
  const results: YearlyResult[] = [];
  let currentCash = initialCash;
  let properties: any[] = [];
  let totalInvestment = initialCash;
  let totalRefiCashOut = 0;
  let monthlyResults = {
    totalValue: 0,
    totalDebt: 0,
    netEquity: 0,
    annualCashFlow: 0,
    cashBalance: 0,
    totalDebtService: 0,
    roi: 0,
    propertyCount: 0,
    action: ''
  };

  // Initial property acquisition (month 0)
  const initialDownPayment = initialPropertyValue * downPaymentPct;
  const closingCosts = initialPropertyValue * closingCostsPct;
  const initialMortgage = initialPropertyValue + closingCosts;
  const initialInvestment = initialCash;

  properties.push({
    id: 1,
    purchaseValue: initialPropertyValue,
    currentValue: initialPropertyValue,
    originalLoan: initialMortgage,
    currentLoan: initialMortgage,
    purchaseMonth: 0,
    lastRefiMonth: -1,
    loanStartMonth: 0,
    monthlyPayment: calculateMonthlyPayment(initialMortgage, mortgageRate, 30),
    basis: initialPropertyValue
  });

  // Simulate the specified number of months
  for (let month = 1; month <= years * 12; month++) {
    const year = Math.floor((month - 1) / 12) + 1;
    properties.forEach(property => {
      property.currentValue *= (1 + monthlyAppreciation);
    });
    let totalRentalIncome = 0;
    let totalDebtService = 0;
    properties.forEach(property => {
      const monthsSincePurchase = month - property.purchaseMonth;
      const monthsSinceRefi = month - property.lastRefiMonth;
      const monthsIntoLoan = month - property.loanStartMonth;
      const paymentsMade = monthsIntoLoan;
      let netMonthlyRent;
      if (yieldMode === 'itemized') {
        const grossMonthlyRent = (property.currentValue * grossRentalYield) / 12;
        const managementFees = grossMonthlyRent * managementFeeRate;
        const vacancyAdjustedRent = grossMonthlyRent * (1 - vacancyRate);
        const monthlyExpenses = (property.currentValue * (propertyTaxRate + maintenanceRate + insuranceRate)) / 12 + managementFees;
        netMonthlyRent = vacancyAdjustedRent - monthlyExpenses;
      } else {
        netMonthlyRent = (property.currentValue * netRentalYield) / 12;
      }
      let effectiveRentalIncome = netMonthlyRent;
      if (monthsSincePurchase === 1) {
        effectiveRentalIncome = 0;
      }
      const taxableIncome = Math.max(0, effectiveRentalIncome);
      const afterTaxIncome = taxableIncome * (1 - incomeTaxRate);
      totalRentalIncome += afterTaxIncome;
      if (paymentsMade < 360) {
        property.currentLoan = calculateRemainingBalance(
          property.originalLoan, mortgageRate, 30, paymentsMade
        );
        let monthlyPayment = property.monthlyPayment;
        if (monthsSinceRefi === 1 || monthsSincePurchase === 1) {
          monthlyPayment = 0;
        }
        totalDebtService += monthlyPayment;
      } else {
        property.currentLoan = 0;
      }
    });
    const netCashFlow = totalRentalIncome - totalDebtService;
    currentCash += netCashFlow;
    let refiCashOut = 0;
    properties.forEach(property => {
      const monthsSinceLastRefi = month - property.lastRefiMonth;
      if (monthsSinceLastRefi >= 12) {
        const maxLoan = property.currentValue * refiLTV;
        const potentialCashOut = maxLoan - property.currentLoan;
        const refiCosts = property.currentValue * refiCostsPct;
        if (potentialCashOut > refiCosts + 25000) {
          refiCashOut += (potentialCashOut - refiCosts);
          property.originalLoan = maxLoan;
          property.currentLoan = maxLoan;
          property.lastRefiMonth = month;
          property.loanStartMonth = month;
          property.monthlyPayment = calculateMonthlyPayment(maxLoan, mortgageRate, 30);
          monthlyResults.action = monthlyResults.action ? `${monthlyResults.action} + Refi` : 'Refi';
        }
      }
    });
    currentCash += refiCashOut;
    totalRefiCashOut += refiCashOut;
    const currentPropertyValue = initialPropertyValue * Math.pow(1 + appreciationRate, (month - 1) / 12);
    const requiredDownPayment = currentPropertyValue * downPaymentPct;
    const acquisitionClosingCosts = currentPropertyValue * closingCostsPct;
    const totalAcquisitionCost = requiredDownPayment + acquisitionClosingCosts;
    if (currentCash >= totalAcquisitionCost && properties.length < 25) {
      let newMortgage = currentPropertyValue - requiredDownPayment;
      currentCash -= totalAcquisitionCost;
      totalInvestment += totalAcquisitionCost;
      properties.push({
        id: properties.length + 1,
        purchaseValue: currentPropertyValue,
        currentValue: currentPropertyValue,
        originalLoan: newMortgage,
        currentLoan: newMortgage,
        purchaseMonth: month,
        lastRefiMonth: month,
        loanStartMonth: month,
        monthlyPayment: calculateMonthlyPayment(newMortgage, mortgageRate, 30)
      });
      monthlyResults.action = monthlyResults.action ? `${monthlyResults.action} + New Property` : 'New Property';
      monthlyResults.propertyCount = properties.length;
    }
    monthlyResults.totalValue = properties.reduce((sum, prop) => sum + prop.currentValue, 0);
    monthlyResults.totalDebt = properties.reduce((sum, prop) => sum + prop.currentLoan, 0);
    monthlyResults.netEquity = monthlyResults.totalValue - monthlyResults.totalDebt;
    monthlyResults.cashBalance = currentCash;
    monthlyResults.totalDebtService += totalDebtService;
    monthlyResults.annualCashFlow += netCashFlow;
    if (month % 12 === 0) {
      const yearlyResult: YearlyResult = {
        year: year,
        propertyCount: monthlyResults.propertyCount,
        action: monthlyResults.action,
        totalValue: monthlyResults.totalValue,
        totalDebt: monthlyResults.totalDebt,
        netEquity: monthlyResults.netEquity,
        annualCashFlow: monthlyResults.annualCashFlow,
        cashBalance: monthlyResults.cashBalance,
        totalDebtService: monthlyResults.totalDebtService,
        roi: totalInvestment > 0 ? ((monthlyResults.netEquity + monthlyResults.cashBalance - totalInvestment) / totalInvestment) * 100 : 0
      };
      results.push(yearlyResult);
      monthlyResults = {
        totalValue: 0,
        totalDebt: 0,
        netEquity: 0,
        annualCashFlow: 0,
        cashBalance: 0,
        totalDebtService: 0,
        roi: 0,
        propertyCount: properties.length,
        action: ''
      };
    }
  }
  const finalResult = results[results.length - 1];
  const totalReturns = finalResult.netEquity + finalResult.cashBalance - totalInvestment;
  const finalValue = finalResult.netEquity + finalResult.cashBalance;
  const annualizedReturn = initialInvestment > 0 ?
    (Math.pow(finalValue / initialInvestment, 1 / years) - 1) * 100 : 0;
  const summary: REITCalculatorSummary = {
    propertyCount: finalResult.propertyCount,
    portfolioValue: finalResult.totalValue,
    netEquity: finalResult.netEquity,
    totalDebt: finalResult.totalDebt,
    roi: totalInvestment > 0 ? ((finalResult.netEquity + finalResult.cashBalance - totalInvestment) / totalInvestment) * 100 : 0,
    cashExtracted: totalRefiCashOut,
    annualizedReturn: annualizedReturn,
    equityMultiple: initialCash > 0 ? (finalResult.netEquity + finalResult.cashBalance) / initialCash : 0,
    years
  };
  return { results, summary };
} 