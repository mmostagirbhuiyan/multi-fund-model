export interface Plan {
  name: string;
  calculatorType: 'reit' | 'roth' | 'k401' | 'brokerage' | 'hsa';
  formData: any;
}

export interface PlanResult {
  plan: Plan;
  result: any;
}
