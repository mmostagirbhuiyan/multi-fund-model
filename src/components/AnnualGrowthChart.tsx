import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string;
}

interface Props {
  labels: string[];
  datasets: Dataset[];
}

const AnnualGrowthChart: React.FC<Props> = ({ labels, datasets }) => {
  return (
    <div className="h-[300px]">
      <Bar
        data={{ labels, datasets }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: '#94a3b8',
                font: { family: "'Inter', sans-serif", size: 12 }
              }
            },
            tooltip: {
              callbacks: {
                label: (ctx) => {
                  const val = ctx.parsed.y;
                  return `${ctx.dataset.label}: $${val.toLocaleString()}`;
                }
              }
            }
          },
          scales: {
            x: {
              stacked: false,
              ticks: { color: '#94a3b8' },
              grid: { color: 'rgba(148,163,184,0.1)' }
            },
            y: {
              ticks: {
                color: '#94a3b8',
                callback: (v: any) => '$' + v.toLocaleString()
              },
              grid: { color: 'rgba(148,163,184,0.1)' }
            }
          }
        }}
      />
    </div>
  );
};

export default AnnualGrowthChart;
