import React from 'react';
import { 
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider,
  Alert
} from '@mui/material';
// import './CalculatorForm.css'; // Removed: styles are in index.css
// import clsx from 'clsx'; // Not used

export interface CalculatorFormProps {
  values: {
    downPayment: number;
    mortgageRate: number;
    appreciationRate: number;
    initialCash: number;
    refiLTV: number;
    closingCosts: number;
    refiCosts: number;
    incomeTaxRate: number;
    yieldMode: 'itemized' | 'net';
    grossRentalYield: number;
    propertyTaxRate: number;
    maintenanceRate: number;
    insuranceRate: number;
    managementFeeRate: number;
    vacancyRate: number;
    netRentalYield: number;
    calculatedNetYield: number;
  };
  onChange: (field: string, value: number | string) => void;
  onYieldModeChange: (mode: 'itemized' | 'net') => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ values, onChange, onYieldModeChange }) => {
  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        REIT Calculator
      </Typography>

      <Box component="form" sx={{ display: 'grid', gap: 3 }}>
        <TextField
          fullWidth
          label="Down Payment (%)"
          variant="outlined"
          type="number"
          value={values.downPayment === 0 ? '' : values.downPayment}
          onChange={(e) => {
            const value = e.target.value;
            onChange('downPayment', value === '' ? '' : Number(value));
          }}
          InputProps={{ inputProps: { step: 1 } }}
        />
        
        <TextField
          fullWidth
          label="Mortgage Rate (%)"
          variant="outlined"
          type="number"
          value={values.mortgageRate === 0 ? '' : values.mortgageRate}
          onChange={(e) => {
            const value = e.target.value;
            onChange('mortgageRate', value === '' ? '' : Number(value));
          }}
          InputProps={{ inputProps: { step: 0.1 } }}
        />
        
        <TextField
          fullWidth
          label="Annual Appreciation (%)"
          variant="outlined"
          type="number"
          value={values.appreciationRate === 0 ? '' : values.appreciationRate}
          onChange={(e) => {
            const value = e.target.value;
            onChange('appreciationRate', value === '' ? '' : Number(value));
          }}
          InputProps={{ inputProps: { step: 0.1 } }}
        />
        
        <TextField
          fullWidth
          label="Initial Cash ($)"
          variant="outlined"
          type="number"
          value={values.initialCash === 0 ? '' : values.initialCash}
          onChange={(e) => {
            const value = e.target.value;
            onChange('initialCash', value === '' ? '' : Number(value));
          }}
          InputProps={{ inputProps: { step: 1000 } }}
        />
        
        <TextField
          fullWidth
          label="Max Refi LTV (%)"
          variant="outlined"
          type="number"
          value={values.refiLTV === 0 ? '' : values.refiLTV}
          onChange={(e) => {
            const value = e.target.value;
            onChange('refiLTV', value === '' ? '' : Number(value));
          }}
          InputProps={{ inputProps: { step: 1 } }}
        />
        
        <TextField
          fullWidth
          label="Purchase Closing Costs (%)"
          variant="outlined"
          type="number"
          value={values.closingCosts === 0 ? '' : values.closingCosts}
          onChange={(e) => {
            const value = e.target.value;
            onChange('closingCosts', value === '' ? '' : Number(value));
          }}
          InputProps={{ inputProps: { step: 0.1 } }}
        />
        
        <TextField
          fullWidth
          label="Refinancing Costs (%)"
          variant="outlined"
          type="number"
          value={values.refiCosts === 0 ? '' : values.refiCosts}
          onChange={(e) => {
            const value = e.target.value;
            onChange('refiCosts', value === '' ? '' : Number(value));
          }}
          InputProps={{ inputProps: { step: 0.1 } }}
        />
        
        <TextField
          fullWidth
          label="Income Tax Rate (%)"
          variant="outlined"
          type="number"
          value={values.incomeTaxRate === 0 ? '' : values.incomeTaxRate}
          onChange={(e) => {
            const value = e.target.value;
            onChange('incomeTaxRate', value === '' ? '' : Number(value));
          }}
          InputProps={{ inputProps: { step: 0.1 } }}
        />
        
        <Alert severity="info" sx={{ mt: 1 }}>
          <strong>Note:</strong> The initial property value is assumed to be 5X your initial cash investment. Closing costs (4%) are financed through the initial mortgage, preserving initial cash for future acquisitions.
        </Alert>
        
        <Paper variant="outlined" sx={{ p: 3, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Rental Yield Calculator
          </Typography>
          
          <FormControl component="fieldset" sx={{ mb: 2 }}>
            <FormLabel component="legend">Yield Input Mode</FormLabel>
            <RadioGroup
              value={values.yieldMode}
              onChange={(e) => onYieldModeChange(e.target.value as 'itemized' | 'net')}
            >
              <FormControlLabel value="itemized" control={<Radio />} label="Itemized Yield Inputs" />
              <FormControlLabel value="net" control={<Radio />} label="Net Yield Input" />
            </RadioGroup>
          </FormControl>
          
          <Divider sx={{ mb: 2 }} />
          
          <Box sx={{ display: 'grid', gap: 2 }}>
            {/* Itemized Inputs */}
            {values.yieldMode === 'itemized' && (
              <>
                <TextField
                  fullWidth
                  label="Gross Rental Yield (%)"
                  variant="outlined"
                  type="number"
                  value={values.grossRentalYield === 0 ? '' : values.grossRentalYield}
                  onChange={(e) => {
                    const value = e.target.value;
                    onChange('grossRentalYield', value === '' ? '' : Number(value));
                  }}
                  InputProps={{ inputProps: { step: 0.1 } }}
                />
                
                <TextField
                  fullWidth
                  label="Property Tax Rate (%)"
                  variant="outlined"
                  type="number"
                  value={values.propertyTaxRate === 0 ? '' : values.propertyTaxRate}
                  onChange={(e) => {
                    const value = e.target.value;
                    onChange('propertyTaxRate', value === '' ? '' : Number(value));
                  }}
                  InputProps={{ inputProps: { step: 0.1 } }}
                />
                
                <TextField
                  fullWidth
                  label="Maintenance Rate (%)"
                  variant="outlined"
                  type="number"
                  value={values.maintenanceRate === 0 ? '' : values.maintenanceRate}
                  onChange={(e) => {
                    const value = e.target.value;
                    onChange('maintenanceRate', value === '' ? '' : Number(value));
                  }}
                  InputProps={{ inputProps: { step: 0.1 } }}
                />
                
                <TextField
                  fullWidth
                  label="Insurance Rate (%)"
                  variant="outlined"
                  type="number"
                  value={values.insuranceRate === 0 ? '' : values.insuranceRate}
                  onChange={(e) => {
                    const value = e.target.value;
                    onChange('insuranceRate', value === '' ? '' : Number(value));
                  }}
                  InputProps={{ inputProps: { step: 0.1 } }}
                />
                
                <TextField
                  fullWidth
                  label="Management Fee Rate (%)"
                  variant="outlined"
                  type="number"
                  value={values.managementFeeRate === 0 ? '' : values.managementFeeRate}
                  onChange={(e) => {
                    const value = e.target.value;
                    onChange('managementFeeRate', value === '' ? '' : Number(value));
                  }}
                  InputProps={{ inputProps: { step: 0.1 } }}
                />
                
                <TextField
                  fullWidth
                  label="Vacancy Rate (%)"
                  variant="outlined"
                  type="number"
                  value={values.vacancyRate === 0 ? '' : values.vacancyRate}
                  onChange={(e) => {
                    const value = e.target.value;
                    onChange('vacancyRate', value === '' ? '' : Number(value));
                  }}
                  InputProps={{ inputProps: { step: 0.1 } }}
                />
              </>
            )}
            
            {/* Net Yield Input */}
            {values.yieldMode === 'net' && (
              <TextField
                fullWidth
                label="Net Rental Yield (%)"
                variant="outlined"
                type="number"
                value={values.netRentalYield === 0 ? '' : values.netRentalYield}
                onChange={(e) => {
                  const value = e.target.value;
                  onChange('netRentalYield', value === '' ? '' : Number(value));
                }}
                InputProps={{ inputProps: { step: 0.1 } }}
              />
            )}
            
            {/* Calculated Net Yield (readonly) */}
            <TextField
              fullWidth
              label="Calculated Net Yield (%)"
              variant="outlined"
              type="number"
              value={values.calculatedNetYield === 0 ? '' : values.calculatedNetYield}
              InputProps={{ readOnly: true }}
            />
          </Box>
        </Paper>

        <Button
          variant="contained"
          size="large"
          onClick={() => {}} // This needs to call the actual calculate function from App.tsx
          sx={{
            mt: 2,
            py: 2,
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)'
            }
          }}
        >
          Calculate Portfolio
        </Button>
      </Box>
    </Paper>
  );
};

export default CalculatorForm; 