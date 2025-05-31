import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TableSortLabel,
  Box
} from '@mui/material';

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
}

type Order = 'asc' | 'desc';
type OrderBy = keyof YearlyResult;

const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
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

  const headers: { id: OrderBy; label: string }[] = [
    { id: 'year', label: 'Year' },
    { id: 'propertyCount', label: 'Properties' },
    { id: 'action', label: 'Action' },
    { id: 'totalValue', label: 'Total Value' },
    { id: 'totalDebt', label: 'Total Debt' },
    { id: 'netEquity', label: 'Net Equity' },
    { id: 'annualCashFlow', label: 'Annual Cash Flow' },
    { id: 'cashBalance', label: 'Cash Balance' },
    { id: 'totalDebtService', label: 'Debt Service' },
    { id: 'roi', label: 'Total ROI %' }
  ];

  return (
    <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden', mb: 4 }}>
      <Box sx={{ 
        py: 2.5, 
        px: 3,
        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
          Detailed Year-by-Year Portfolio Analysis
        </Typography>
      </Box>
      
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="portfolio results table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell 
                  key={header.id}
                  sortDirection={orderBy === header.id ? order : false}
                  align={typeof results[0]?.[header.id] === 'number' ? 'right' : 'left'}
                  sx={{
                    fontWeight: 700,
                    color: '#667eea',
                    letterSpacing: 0.2,
                    backgroundColor: '#f8f9fa'
                  }}
                >
                  <TableSortLabel
                    active={orderBy === header.id}
                    direction={orderBy === header.id ? order : 'asc'}
                    onClick={() => handleRequestSort(header.id)}
                  >
                    {header.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedResults.map((result, idx) => {
              const isAcquisition = result.action?.includes('New Property');
              const isRefi = result.action?.includes('Refi');
              
              return (
                <TableRow 
                  key={idx} 
                  sx={{
                    backgroundColor: isAcquisition 
                      ? 'rgba(67, 233, 123, 0.13)'
                      : isRefi 
                        ? 'rgba(255, 193, 7, 0.13)'
                        : 'inherit',
                    '&:nth-of-type(even)': {
                      backgroundColor: isAcquisition || isRefi 
                        ? 'inherit'
                        : 'rgba(102,126,234,0.04)'
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(102,126,234,0.08) !important',
                      boxShadow: '0 4px 24px 0 rgba(102,126,234,0.13)',
                      transform: 'scale(1.01)',
                      zIndex: 1,
                      transition: 'box-shadow 0.2s, transform 0.2s, background 0.2s'
                    }
                  }}
                >
                  <TableCell>{result.year}</TableCell>
                  <TableCell>{result.propertyCount}</TableCell>
                  <TableCell>{result.action}</TableCell>
                  <TableCell align="right" sx={{ color: '#2d7d32', fontWeight: 700 }}>
                    ${(result.totalValue / 1000).toFixed(0)}K
                  </TableCell>
                  <TableCell align="right" sx={{ color: '#2d7d32', fontWeight: 700 }}>
                    ${(result.totalDebt / 1000).toFixed(0)}K
                  </TableCell>
                  <TableCell align="right" sx={{ color: '#2d7d32', fontWeight: 700 }}>
                    ${(result.netEquity / 1000).toFixed(0)}K
                  </TableCell>
                  <TableCell align="right" sx={{ color: '#2d7d32', fontWeight: 700 }}>
                    ${(result.annualCashFlow / 1000).toFixed(0)}K
                  </TableCell>
                  <TableCell align="right" sx={{ color: '#2d7d32', fontWeight: 700 }}>
                    ${(result.cashBalance / 1000).toFixed(0)}K
                  </TableCell>
                  <TableCell align="right" sx={{ color: '#2d7d32', fontWeight: 700 }}>
                    ${(result.totalDebtService / 1000).toFixed(0)}K
                  </TableCell>
                  <TableCell align="right">{result.roi.toFixed(1)}%</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ResultsTable; 