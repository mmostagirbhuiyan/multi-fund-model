import React, { useState } from 'react';
import { Building2, Calculator, ChartBar, TrendingUp, ChevronDown, ChevronUp, Info, Zap, Activity } from 'lucide-react';
import CalculatorForm from './components/CalculatorForm';
import PortfolioChart from './components/PortfolioChart';
import SummaryCards from './components/SummaryCards';
import ResultsTable from './components/ResultsTable';
import { calculateREIT } from './logic/reitCalculator';

function App() {
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({
    downPayment: 20,
    mortgageRate: 5.5,
    appreciationRate: 4,
    initialCash: 100000,
    refiLTV: 80,
    closingCosts: 4,
    refiCosts: 2,
    incomeTaxRate: 22,
    yieldMode: 'itemized',
    grossRentalYield: 8,
    propertyTaxRate: 1.2,
    maintenanceRate: 1,
    insuranceRate: 0.5,
    managementFeeRate: 8,
    vacancyRate: 5,
    netRentalYield: 5.5,
  });

  const handleCalculate = async (newFormData: any) => {
    setFormData(newFormData); // Update form data when calculating
    setIsLoading(true);
    try {
      const calculatedResults = await calculateREIT(newFormData);
      setResults({
        ...calculatedResults.summary,
        portfolioMetrics: {
          portfolioComposition: {
            labels: ['Equity', 'Debt'],
            values: [calculatedResults.summary.netEquity, calculatedResults.summary.totalDebt],
          },
          annualCashFlow: {
            labels: calculatedResults.results.map(r => `Year ${r.year}`),
            values: calculatedResults.results.map(r => r.annualCashFlow),
          },
          equityGrowth: {
            labels: calculatedResults.results.map(r => `Year ${r.year}`),
            values: calculatedResults.results.map(r => r.netEquity),
          },
        },
        detailedAnalysis: calculatedResults.results,
      });
    } catch (error) {
      console.error('Error calculating REIT metrics:', error);
      // TODO: Add proper error handling
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="relative">
          {/* Animated background elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <div className="relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-12 text-center shadow-2xl">
            {/* Loading spinner */}
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-slate-600 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-2 border-transparent border-b-cyan-400 rounded-full animate-spin animate-reverse"></div>
            </div>
            
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Calculating REIT Metrics
            </h2>
            <p className="text-slate-300 text-lg mb-4">Analyzing 30-year portfolio performance...</p>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-slate-400">
              <Activity className="w-4 h-4 animate-pulse" />
              <span>Processing complex financial models</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-ping delay-2000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative container mx-auto px-6 py-16">
          <div className="text-center mb-16">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-full px-6 py-3 mb-8 shadow-lg">
              <Building2 className="w-5 h-5 text-blue-400" />
              <span className="text-white font-medium">Advanced REIT Fund Modeling</span>
              <div className="flex items-center ml-2">
                <Zap className="w-4 h-4 text-yellow-400 animate-pulse mr-1" />
                <span className="text-xs text-slate-300">30-Year Analysis</span>
              </div>
            </div>
            
            {/* Main Title */}
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center transform rotate-12 shadow-2xl">
                  <Calculator className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <div className="text-left">
                <h1 className="text-7xl md:text-8xl font-black leading-none">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    REIT
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    Analyzer
                  </span>
                </h1>
              </div>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-2xl text-slate-300 leading-relaxed">
                Professional-grade modeling for Real Estate Investment Trust portfolios
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-slate-800/30 rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-slate-300">Cash-out Refinancing</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/30 rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-slate-300">1031 Exchanges</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/30 rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-slate-300">Rental Yield Analysis</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Calculator Section */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Investment Calculator</h2>
                  <p className="text-slate-400">Configure your REIT portfolio parameters</p>
                </div>
              </div>
              <CalculatorForm onSubmit={handleCalculate} initialData={formData} />
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {results && (
        <div className="relative container mx-auto px-6 pb-20">
          {/* Summary Cards */}
          <div className="mb-12">
            <SummaryCards results={results} />
          </div>

          {/* Expandable Sections */}
          <div className="space-y-6">
            {/* Portfolio Performance */}
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300">
              <button
                onClick={() => setExpandedSection(expandedSection === 'portfolio' ? null : 'portfolio')}
                className="w-full flex items-center justify-between p-8 text-left hover:bg-slate-700/20 transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center">
                    <ChartBar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-white">Portfolio Performance</h2>
                    <p className="text-slate-400">Interactive visualizations and trend analysis</p>
                  </div>
                </div>
                <div className={`transition-transform duration-300 ${expandedSection === 'portfolio' ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-6 h-6 text-slate-400" />
                </div>
              </button>
              
              {expandedSection === 'portfolio' && (
                <div className="border-t border-slate-700/50 bg-slate-900/20">
                  <div className="p-8 animate-in slide-in-from-top duration-500">
                    <PortfolioChart data={results.portfolioMetrics} />
                  </div>
                </div>
              )}
            </div>

            {/* Detailed Analysis */}
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden hover:border-green-500/30 transition-all duration-300">
              <button
                onClick={() => setExpandedSection(expandedSection === 'analysis' ? null : 'analysis')}
                className="w-full flex items-center justify-between p-8 text-left hover:bg-slate-700/20 transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-white">Detailed Analysis</h2>
                    <p className="text-slate-400">Year-by-year breakdown and financial metrics</p>
                  </div>
                </div>
                <div className={`transition-transform duration-300 ${expandedSection === 'analysis' ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-6 h-6 text-slate-400" />
                </div>
              </button>
              
              {expandedSection === 'analysis' && (
                <div className="border-t border-slate-700/50 bg-slate-900/20">
                  <div className="p-8 animate-in slide-in-from-top duration-500">
                    <ResultsTable results={results.detailedAnalysis} />
                  </div>
                </div>
              )}
            </div>

            {/* Methodology */}
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300">
              <button
                onClick={() => setExpandedSection(expandedSection === 'methodology' ? null : 'methodology')}
                className="w-full flex items-center justify-between p-8 text-left hover:bg-slate-700/20 transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                    <Info className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-white">Methodology</h2>
                    <p className="text-slate-400">Understanding our advanced calculation approach</p>
                  </div>
                </div>
                <div className={`transition-transform duration-300 ${expandedSection === 'methodology' ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-6 h-6 text-slate-400" />
                </div>
              </button>
              
              {expandedSection === 'methodology' && (
                <div className="border-t border-slate-700/50 bg-slate-900/20">
                  <div className="p-8 animate-in slide-in-from-top duration-500">
                    <div className="prose prose-invert max-w-none">
                      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                          <Activity className="w-4 h-4 text-white" />
                        </div>
                        Advanced Analysis Methodology
                      </h3>
                      
                      <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                        Our comprehensive REIT analysis model incorporates sophisticated financial modeling techniques 
                        to evaluate portfolio performance across multiple dimensions and risk factors.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/30">
                          <h4 className="text-lg font-semibold text-blue-400 mb-4">Core Analysis Components</h4>
                          <ul className="space-y-3 text-slate-300">
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>30-year comprehensive financial projections</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>Monthly granularity cash flow analysis</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>Risk-adjusted performance metrics</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>Portfolio diversification assessment</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/30">
                          <h4 className="text-lg font-semibold text-green-400 mb-4">Advanced Features</h4>
                          <ul className="space-y-3 text-slate-300">
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>Cash-out refinancing with closing costs</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>1031 tax-deferred exchanges</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>Detailed rental yield calculations</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>Market correlation studies</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Footer */}
      <footer className="relative border-t border-slate-700/50 bg-slate-900/40 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center transform rotate-12 shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <span className="text-white font-bold text-2xl">REIT Analyzer</span>
                <div className="text-slate-400 text-sm">Professional Edition</div>
              </div>
            </div>
            
            <p className="text-slate-300 text-lg mb-4">
              Advanced REIT portfolio modeling and analysis platform
            </p>
            
            <div className="flex justify-center space-x-6 text-sm text-slate-400">
              <span>© 2024 REIT Analyzer</span>
              <span>•</span>
              <span>Professional Financial Modeling</span>
              <span>•</span>
              <span>Enterprise Grade Analytics</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
