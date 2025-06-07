export type RiskLevel = 'low' | 'medium' | 'high';

export const riskVolatility: Record<RiskLevel, number> = {
  low: 6,
  medium: 12,
  high: 18,
};
