import { describe, it, expect } from 'vitest';
import { calculateRothIRA } from '../src/logic/rothCalculator';
import { calculate401k } from '../src/logic/k401Calculator';
import { calculateBrokerage } from '../src/logic/brokerageCalculator';
import { calculateHSA } from '../src/logic/hsaCalculator';

// Roth IRA calculator

describe('calculateRothIRA', () => {
  it('computes growth without contributions', () => {
    const { summary, results } = calculateRothIRA({
      initialBalance: 1000,
      annualContribution: 0,
      annualGrowthRate: 10,
      years: 2,
    });
    expect(results.length).toBe(2);
    expect(results[0].netEquity).toBeCloseTo(1100);
    expect(results[1].netEquity).toBeCloseTo(1210);
    expect(summary.netEquity).toBeCloseTo(1210);
    expect(summary.roi).toBeCloseTo(21);
    expect(summary.annualizedReturn).toBeCloseTo(10);
  });
});

describe('calculate401k', () => {
  it('handles basic employer match scenario', () => {
    const { summary, results } = calculate401k({
      initialBalance: 0,
      annualSalary: 100000,
      employeeContributionPct: 5,
      employerMatchPct: 100,
      annualSalaryGrowthRate: 0,
      annualReturnRate: 5,
      taxRate: 0,
      years: 2,
    });
    expect(results.length).toBe(2);
    expect(results[0].netEquity).toBeCloseTo(10500);
    expect(results[1].netEquity).toBeCloseTo(21525);
    expect(summary.netEquity).toBeCloseTo(21525);
    expect(summary.roi).toBeCloseTo(7.625);
  });
});

describe('calculateBrokerage', () => {
  it('calculates annual contributions correctly', () => {
    const { summary, results } = calculateBrokerage({
      initialBalance: 1000,
      contributionAmount: 100,
      contributionFrequency: 'annual',
      annualReturnRate: 5,
      taxRate: 0,
      years: 2,
    });
    expect(results.length).toBe(2);
    expect(results[0].netEquity).toBeCloseTo(1155);
    expect(results[1].netEquity).toBeCloseTo(1317.75);
    expect(summary.netEquity).toBeCloseTo(1317.75);
    expect(summary.roi).toBeCloseTo(9.8125);
  });
});

describe('calculateHSA', () => {
  it('tracks medical expenses and growth', () => {
    const { summary, results } = calculateHSA({
      initialBalance: 1000,
      annualContribution: 500,
      annualMedicalExpenses: 200,
      annualGrowthRate: 5,
      years: 2,
    });
    expect(results.length).toBe(2);
    expect(results[0].netEquity).toBeCloseTo(1365);
    expect(results[1].netEquity).toBeCloseTo(1748.25);
    expect(summary.netEquity).toBeCloseTo(1748.25);
    expect(summary.roi).toBeCloseTo(7.4125);
  });
});
