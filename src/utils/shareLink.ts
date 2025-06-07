export function buildShareLink(calculatorType: string, formData: Record<string, any>): string {
  const params = new URLSearchParams();
  params.set('calc', calculatorType);
  Object.entries(formData).forEach(([key, value]) => {
    params.set(key, String(value));
  });
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

export function parseQuery(): { calculatorType: string | null; formData: Record<string, any> } {
  const params = new URLSearchParams(window.location.search);
  const calc = params.get('calc');
  const data: Record<string, any> = {};
  params.forEach((value, key) => {
    if (key === 'calc') return;
    const num = Number(value);
    data[key] = isNaN(num) ? value : num;
  });
  return { calculatorType: calc, formData: data };
}
