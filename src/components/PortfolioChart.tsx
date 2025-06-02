import React from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { TrendingUp, PieChart, BarChart2 } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  BarElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  BarElement
);

export interface PortfolioChartProps {
  data: {
    portfolioComposition: { labels: string[]; values: number[] };
    annualCashFlow: { labels: string[]; values: number[] };
    equityGrowth: { labels: string[]; values: number[] };
  };
}

const PortfolioChart: React.FC<PortfolioChartProps> = ({ data }) => {
  // Common chart options
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#94a3b8',
          font: {
            family: "'Inter', sans-serif",
            size: 12
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#fff',
        bodyColor: '#e2e8f0',
        borderColor: 'rgba(148, 163, 184, 0.2)',
        borderWidth: 1,
        padding: 12,
        usePointStyle: true,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(context.parsed.y * 1000);
            }
            return label;
          }
        }
      }
    }
  };

  // Portfolio Composition Chart
  const pieChartData = {
    labels: data.portfolioComposition.labels,
    datasets: [{
      data: data.portfolioComposition.values,
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)',  // Indigo
        'rgba(236, 72, 153, 0.8)',  // Pink
      ],
      borderColor: [
        'rgba(99, 102, 241, 1)',
        'rgba(236, 72, 153, 1)',
      ],
      borderWidth: 2,
      hoverOffset: 4
    }]
  };

  const pieChartOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Portfolio Composition',
        color: '#e2e8f0',
        font: {
          family: "'Inter', sans-serif",
          size: 16,
          weight: 'bold' as const
        }
      }
    }
  };

  // Annual Cash Flow Chart
  const barChartData = {
    labels: data.annualCashFlow.labels,
    datasets: [{
      label: 'Annual Cash Flow',
      data: data.annualCashFlow.values,
      backgroundColor: 'rgba(99, 102, 241, 0.6)',
      borderColor: 'rgba(99, 102, 241, 1)',
      borderWidth: 2,
      borderRadius: 4,
      barThickness: 12,
      maxBarThickness: 20
    }]
  };

  const barChartOptions = {
    ...commonOptions,
    scales: {
      x: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)'
        },
        ticks: {
          color: '#94a3b8'
        }
      },
      y: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)'
        },
        ticks: {
          color: '#94a3b8',
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          }
        }
      }
    },
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Annual Cash Flow',
        color: '#e2e8f0',
        font: {
          family: "'Inter', sans-serif",
          size: 16,
          weight: 'bold' as const
        }
      }
    }
  };

  // Equity Growth Chart
  const lineChartData = {
    labels: data.equityGrowth.labels,
    datasets: [{
      label: 'Equity Growth',
      data: data.equityGrowth.values,
      borderColor: 'rgba(236, 72, 153, 1)',
      backgroundColor: 'rgba(236, 72, 153, 0.1)',
      fill: true,
      tension: 0.4,
      borderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: 'rgba(236, 72, 153, 1)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2
    }]
  };

  const lineChartOptions = {
    ...commonOptions,
    scales: {
      x: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)'
        },
        ticks: {
          color: '#94a3b8'
        }
      },
      y: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)'
        },
        ticks: {
          color: '#94a3b8',
          callback: function(value: any) {
            return '$' + (value / 1000000).toFixed(1) + 'M';
          }
        }
      }
    },
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Equity Growth Over Time',
        color: '#e2e8f0',
        font: {
          family: "'Inter', sans-serif",
          size: 16,
          weight: 'bold' as const
        }
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Portfolio Composition */}
      <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <PieChart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Portfolio Composition</h3>
            <p className="text-sm text-slate-400">Final year asset allocation</p>
          </div>
        </div>
        <div className="h-[300px]">
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      </div>

      {/* Annual Cash Flow */}
      <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
            <BarChart2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Annual Cash Flow</h3>
            <p className="text-sm text-slate-400">Yearly income distribution</p>
          </div>
        </div>
        <div className="h-[300px]">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>

      {/* Equity Growth */}
      <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Equity Growth</h3>
            <p className="text-sm text-slate-400">Portfolio value over time</p>
          </div>
        </div>
        <div className="h-[300px]">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default PortfolioChart; 