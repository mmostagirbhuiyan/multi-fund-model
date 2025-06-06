import React, { useState } from 'react';
import { ArrowUpDown, TrendingUp, DollarSign, Percent } from 'lucide-react';

export interface YearlyResult {
  year: number;
  propertyCount: number;
  action: string;
  totalValue: number;
  totalDebt: number;
  netEquity: number;
  annualCashFlow: number;
  cashBalance: number;
  totalDebtService: number;
  roi: number;
}

export interface ResultsTableProps {
  results: YearlyResult[];
  calculatorType: 'reit' | 'roth' | 'k401' | 'brokerage';
}

type Order = 'asc' | 'desc';
type OrderBy = keyof YearlyResult;

const ResultsTable: React.FC<ResultsTableProps> = ({ results, calculatorType }) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<OrderBy>('year');

  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedResults = React.useMemo(() => {
    const comparator = (a: YearlyResult, b: YearlyResult) => {
      if (order === 'desc') {
        return a[orderBy] < b[orderBy] ? -1 : a[orderBy] > b[orderBy] ? 1 : 0;
      } else {
        return a[orderBy] > b[orderBy] ? -1 : a[orderBy] < b[orderBy] ? 1 : 0;
      }
    };
    return [...results].sort(comparator);
  }, [results, order, orderBy]);

  const isREIT = calculatorType === 'reit';
  const headers: { id: OrderBy; label: string; icon?: React.ReactNode }[] = isREIT ? [
    { id: 'year', label: 'Year' },
    { id: 'propertyCount', label: 'Properties' },
    { id: 'action', label: 'Action' },
    { id: 'totalValue', label: 'Total Value', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'totalDebt', label: 'Total Debt', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'netEquity', label: 'Net Equity', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'annualCashFlow', label: 'Annual Cash Flow', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'cashBalance', label: 'Cash Balance', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'totalDebtService', label: 'Debt Service', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'roi', label: 'Total ROI', icon: <Percent className="w-4 h-4" /> }
  ] : [
    { id: 'year', label: 'Year' },
    { id: 'netEquity', label: 'Balance', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'annualCashFlow', label: 'Contribution', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'roi', label: 'Total ROI', icon: <Percent className="w-4 h-4" /> }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Detailed Year-by-Year Portfolio Analysis</h3>
            <p className="text-sm text-slate-400">Track your portfolio's growth and performance over time</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50">
              {headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-4 text-left text-sm font-medium text-slate-400 whitespace-nowrap cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleRequestSort(header.id)}
                >
                  <div className="flex items-center gap-2">
                    {header.icon}
                    <span>{header.label}</span>
                    {orderBy === header.id && (
                      <ArrowUpDown className={`w-4 h-4 transition-transform ${order === 'desc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {sortedResults.map((result, idx) => {
              const isAcquisition = result.action?.includes('New Property');
              const isRefi = result.action?.includes('Refi');
              
              return (
                <tr
                  key={idx}
                  className={`
                    transition-colors duration-200
                    ${isAcquisition ? 'bg-emerald-500/10' : isRefi ? 'bg-amber-500/10' : ''}
                    hover:bg-slate-700/30
                  `}
                >
                  <td className="px-6 py-4 text-sm text-slate-300">{result.year}</td>
                  {isREIT && (
                    <>
                      <td className="px-6 py-4 text-sm text-slate-300">{result.propertyCount}</td>
                      <td className="px-6 py-4 text-sm text-slate-300">{result.action}</td>
                      <td className="px-6 py-4 text-sm text-emerald-400 font-medium">{formatCurrency(result.totalValue)}</td>
                      <td className="px-6 py-4 text-sm text-emerald-400 font-medium">{formatCurrency(result.totalDebt)}</td>
                      <td className="px-6 py-4 text-sm text-emerald-400 font-medium">{formatCurrency(result.netEquity)}</td>
                      <td className="px-6 py-4 text-sm text-emerald-400 font-medium">{formatCurrency(result.annualCashFlow)}</td>
                      <td className="px-6 py-4 text-sm text-emerald-400 font-medium">{formatCurrency(result.cashBalance)}</td>
                      <td className="px-6 py-4 text-sm text-emerald-400 font-medium">{formatCurrency(result.totalDebtService)}</td>
                    </>
                  )}
                  {!isREIT && (
                    <>
                      <td className="px-6 py-4 text-sm text-emerald-400 font-medium">{formatCurrency(result.netEquity)}</td>
                      <td className="px-6 py-4 text-sm text-emerald-400 font-medium">{formatCurrency(result.annualCashFlow)}</td>
                    </>
                  )}
                  <td className="px-6 py-4 text-sm text-emerald-400 font-medium">{result.roi.toFixed(1)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable; 