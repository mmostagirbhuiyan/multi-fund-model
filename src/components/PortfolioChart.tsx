import React from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { YearlyResult } from './ResultsTable';
import { Paper, Typography, Box } from '@mui/material';
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
  results: YearlyResult[];
  portfolioCompositionData: { labels: string[]; values: number[] };
  annualCashFlowData: { labels: string[]; values: number[] };
}

const PortfolioChart: React.FC<PortfolioChartProps> = ({ results, portfolioCompositionData, annualCashFlowData }) => {
  const lineChartData = {
    labels: results.map(r => `Year ${r.year}`),
    datasets: [
      {
        label: 'Portfolio Value',
        data: results.map(r => r.totalValue / 1000000),
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        yAxisID: 'y',
      },
      {
        label: 'Net Equity',
        data: results.map(r => r.netEquity / 1000000),
        borderColor: '#43e97b',
        backgroundColor: 'rgba(67, 233, 123, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        yAxisID: 'y',
      },
      {
        label: 'Total Debt',
        data: results.map(r => r.totalDebt / 1000000),
        borderColor: '#f093fb',
        backgroundColor: 'rgba(240, 147, 251, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        yAxisID: 'y',
      },
      {
        label: 'Annual Cash Flow',
        data: results.map(r => r.annualCashFlow / 1000),
        borderColor: '#fa709a',
        backgroundColor: 'rgba(250, 112, 154, 0.1)',
        yAxisID: 'y1',
        tension: 0.4,
        borderWidth: 3,
        borderDash: [5, 5],
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    plugins: {
      title: {
        display: false,
      },
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        usePointStyle: true,
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Value (Millions $)',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Cash Flow (Thousands $)',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const pieChartData = {
    labels: portfolioCompositionData.labels,
    datasets: [
      {
        data: portfolioCompositionData.values,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
        ],
        hoverBackgroundColor: [
          '#FF6384', 
          '#36A2EB',
        ],
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Portfolio Composition (Final Year)',
        font: {
          size: 16,
        },
      },
    },
    maintainAspectRatio: false,
  };

  const barChartData = {
    labels: annualCashFlowData.labels,
    datasets: [
      {
        label: 'Annual Cash Flow (Thousands $)',
        data: annualCashFlowData.values,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Annual Cash Flow Over Time',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cash Flow (Thousands $)',
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #f8fafc 60%, #e3e9f7 100%)',
        p: { xs: 2, md: 3.5 },
        mb: 4,
        boxShadow: '0 8px 32px rgba(102,126,234,0.10)',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 12px 40px rgba(102,126,234,0.15)',
        }
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 700,
          color: '#333',
          mb: 3,
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Professional 30-Year REIT Analysis with Continuous Cash-Out Refinancing
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          mb: 4,
        }}
      >
        <Box sx={{ width: { xs: '100%', md: '40%' }, height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {portfolioCompositionData && portfolioCompositionData.values.length > 0 ? (
            <Pie data={pieChartData} options={pieChartOptions} />
          ) : (
            <Typography variant="body2" color="text.secondary" align="center">No data available for Portfolio Composition chart.</Typography>
          )}
        </Box>

        <Box sx={{ width: { xs: '100%', md: '60%' }, height: 300 }}>
          {annualCashFlowData && annualCashFlowData.values.length > 0 ? (
            <Bar data={barChartData} options={barChartOptions} />
          ) : (
            <Typography variant="body2" color="text.secondary" align="center">No data available for Annual Cash Flow chart.</Typography>
          )}
        </Box>
      </Box>

      <Box sx={{
        height: { xs: 300, sm: 400, md: 500 },
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto'
      }}>
        {results && results.length > 0 ? (
          <Line data={lineChartData} options={lineChartOptions} />
        ) : (
          <Typography variant="body2" color="text.secondary" align="center">No data available for Portfolio Analysis chart.</Typography>
        )}
      </Box>
    </Paper>
  );
};

export default PortfolioChart; 