import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Dataset {
  label: string;
  data: number[];
  borderColor: string;
}

interface Props {
  labels: string[];
  datasets: Dataset[];
}

const ComparisonChart: React.FC<Props> = ({ labels, datasets }) => {
  return (
    <div className="h-[300px]">
      <Line
        data={{ labels, datasets }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              labels: { color: '#94a3b8', font: { family: "'Inter', sans-serif", size: 12 } }
            }
          },
          scales: {
            x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(148,163,184,0.1)' } },
            y: {
              ticks: { color: '#94a3b8', callback: (v: any) => '$' + (v/1000000).toFixed(1) + 'M' },
              grid: { color: 'rgba(148,163,184,0.1)' }
            }
          }
        }}
      />
    </div>
  );
};

export default ComparisonChart;
