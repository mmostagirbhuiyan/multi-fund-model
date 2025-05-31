import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box,
  useTheme
} from '@mui/material';

export interface SummaryCardsProps {
  propertyCount: number;
  portfolioValue: number;
  netEquity: number;
  roi: number;
  cashExtracted: number;
  annualizedReturn: number;
  equityMultiple: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ 
  propertyCount, 
  portfolioValue, 
  netEquity, 
  roi, 
  cashExtracted, 
  annualizedReturn, 
  equityMultiple 
}) => {
  const theme = useTheme();
  
  // Define gradient backgrounds for cards
  const cardStyles = [
    { 
      background: 'linear-gradient(135deg, #f093fb, #f5576c 80%)',
      color: 'white'
    },
    { 
      background: 'linear-gradient(135deg, #4facfe, #00f2fe 80%)',
      color: 'white'
    },
    { 
      background: 'linear-gradient(135deg, #43e97b, #38f9d7 80%)',
      color: 'white'
    },
    { 
      background: 'linear-gradient(135deg, #fa709a, #fee140 80%)',
      color: 'white'
    },
    { 
      background: 'linear-gradient(135deg, #a8edea, #fed6e3 80%)',
      color: '#333'
    },
    { 
      background: 'linear-gradient(135deg, #ff9a8b, #ff6a88 80%)',
      color: 'white'
    },
    { 
      background: 'linear-gradient(135deg, #c471f5 10%, #ffb3d9 100%)',
      color: 'white'
    }
  ];

  // Card data array
  const cardData = [
    { title: 'Total Properties', value: propertyCount, format: (val: number) => val.toString() },
    { title: 'Portfolio Value', value: portfolioValue, format: (val: number) => `$${(val / 1000000).toFixed(1)}M` },
    { title: 'Net Equity', value: netEquity, format: (val: number) => `$${(val / 1000000).toFixed(1)}M` },
    { title: 'Total ROI', value: roi, format: (val: number) => `${val.toFixed(0)}%` },
    { title: 'Cash Extracted', value: cashExtracted, format: (val: number) => `$${(val / 1000000).toFixed(1)}M` },
    { title: 'Annualized Return', value: annualizedReturn, format: (val: number) => `${val.toFixed(1)}%` },
    { title: 'Equity Multiple', value: equityMultiple, format: (val: number) => {
        // Ensure val is a valid number before formatting
        if (typeof val === 'number' && !isNaN(val)) {
          return `${val.toFixed(2)}x`;
        } else {
          return 'N/A'; // Display N/A or another indicator if value is invalid
        }
      }
    }
  ];

  return (
    <Box 
      sx={{ 
        display: 'grid', 
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)'
        },
        gap: 4,
        p: 2,
        mb: 6
      }}
    >
      {cardData.map((card, index) => (
        <Card 
          key={index}
          elevation={4}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            position: 'relative',
            background: cardStyles[index % cardStyles.length].background,
            color: cardStyles[index % cardStyles.length].color,
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'scale(1.03) rotate(1deg)',
              boxShadow: '0 0 24px 6px #764ba2, 0 16px 40px rgba(102,126,234,0.18)',
              zIndex: 2
            },
            animation: 'fade-in 1.2s cubic-bezier(.4,2,.6,1)',
            height: '100%',
            m: 1
          }}
        >
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Typography 
              variant="h6" 
              component="h3" 
              sx={{ 
                mb: 2,
                opacity: 0.93,
                fontWeight: 600,
                letterSpacing: '0.2px' 
              }}
            >
              {card.title}
            </Typography>
            <Typography 
              variant="h3" 
              component="div" 
              sx={{ 
                fontWeight: 700,
                mb: 1,
                letterSpacing: '1px',
                textShadow: '0 2px 8px rgba(67,233,123,0.08)'
              }}
            >
              {card.format(card.value)}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default SummaryCards; 