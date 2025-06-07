import { quantileSorted } from 'simple-statistics';

function randomNormal(mu: number, sigma: number): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return mu + sigma * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

export interface MonteCarloParams {
  initialBalance: number;
  contributions: number[];
  expectedReturn: number; // percent
  volatility: number; // percent
}

export interface MonteCarloResult {
  labels: string[];
  p10: number[];
  p50: number[];
  p90: number[];
}

export function runMonteCarlo(
  params: MonteCarloParams,
  iterations = 500
): MonteCarloResult {
  const { initialBalance, contributions, expectedReturn, volatility } = params;
  const years = contributions.length;
  const mu = expectedReturn / 100;
  const sigma = volatility / 100;
  const trials: number[][] = [];
  for (let t = 0; t < iterations; t++) {
    let balance = initialBalance;
    const yearly: number[] = [];
    for (let y = 0; y < years; y++) {
      const r = randomNormal(mu, sigma);
      balance = (balance + contributions[y]) * (1 + r);
      yearly.push(balance);
    }
    trials.push(yearly);
  }
  const p10: number[] = [];
  const p50: number[] = [];
  const p90: number[] = [];
  for (let y = 0; y < years; y++) {
    const vals = trials.map(t => t[y]).sort((a, b) => a - b);
    p10.push(quantileSorted(vals, 0.1));
    p50.push(quantileSorted(vals, 0.5));
    p90.push(quantileSorted(vals, 0.9));
  }
  return {
    labels: Array.from({ length: years }, (_, i) => `Year ${i + 1}`),
    p10,
    p50,
    p90,
  };
}
