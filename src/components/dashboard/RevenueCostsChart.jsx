import React, { useState } from 'react';
import { MoreVertical, LineChart as LineChartIcon, BarChart2 } from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

export function RevenueCostsChart() {
  const [showRevenue, setShowRevenue] = useState(true);
  const [showCosts, setShowCosts] = useState(true);
  const [showNetProfit, setShowNetProfit] = useState(true);
  const [vsPrevious, setVsPrevious] = useState(false);
  const [chartType, setChartType] = useState('line');

  // Multi-day telemetry and financial telemetry
  const data = [
    { day: '20', revenue: 9.2, netProfit: 8.8, costs: 7.6 },
    { day: '22', revenue: 9.8, netProfit: 8.9, costs: 7.9 },
    { day: '24', revenue: 11.2, netProfit: 9.3, costs: 8.2 },
    { day: '26', revenue: 10.4, netProfit: 7.6, costs: 9.1 },
    { day: '28', revenue: 10.7, netProfit: 8.8, costs: 8.3 },
    { day: '30', revenue: 11.1, netProfit: 8.6, costs: 8.5 },
    { day: 'Aug', revenue: 11.4, netProfit: 9.0, costs: 8.9 },
    { day: '04', revenue: 10.9, netProfit: 8.8, costs: 9.4 },
    { day: '06', revenue: 11.3, netProfit: 8.5, costs: 8.6 },
    { day: '08', revenue: 11.0, netProfit: 8.4, costs: 8.9 },
    { day: '10', revenue: 11.6, netProfit: 9.9, costs: 8.2 },
    { day: '12', revenue: 11.1, netProfit: 8.7, costs: 9.8 },
    { day: '14', revenue: 11.2, netProfit: 8.9, costs: 9.1 },
    { day: '16', revenue: 11.6, netProfit: 9.6, costs: 9.3 },
    { day: '18', revenue: 11.8, netProfit: 9.8, costs: 8.9 },
    { day: '20', revenue: 11.5, netProfit: 9.4, costs: 9.5 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#e8ede9] p-5 shadow-[0_2px_12px_-4px_rgba(9,34,24,0.03)] card-3d">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-bold text-[#092218] font-sans">
          Revenue and costs
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#f4f7f5] rounded-lg p-0.5 border border-[#e2ede5]">
            <button
              onClick={() => setChartType('line')}
              title="Line Chart View"
              aria-label="Line Chart View"
              className={`p-1 rounded-md transition-all cursor-pointer ${
                chartType === 'line' ? 'bg-white shadow-xs text-[#092218]' : 'text-[#86a394]'
              }`}
            >
              <LineChartIcon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setChartType('bar')}
              title="Bar Chart View"
              aria-label="Bar Chart View"
              className={`p-1 rounded-md transition-all cursor-pointer ${
                chartType === 'bar' ? 'bg-white shadow-xs text-[#092218]' : 'text-[#86a394]'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <button 
            title="More options"
            aria-label="More options"
            className="text-[#86a394] hover:text-[#092218] cursor-pointer p-1 rounded-lg hover:bg-[#edf5ee]"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Subtitles (left & right units) */}
      <div className="flex items-center justify-between text-[11px] font-mono text-[#86a394] mb-3">
        <span>Revenue, net profit, $</span>
        <span>Costs, $</span>
      </div>

      {/* 3-Line Recharts Canvas */}
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="#f1f5f2" vertical={false} />
            <XAxis 
              dataKey="day" 
              stroke="#94a3b8" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
            />
            <YAxis 
              stroke="#94a3b8" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              domain={[6, 13]}
              tickFormatter={(v) => `${v}K`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#e2ede5',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(9, 34, 24, 0.08)',
                fontSize: '11px',
                fontFamily: 'Roboto Mono',
              }}
            />
            {showRevenue && (
              <Line 
                type="monotone" 
                dataKey="revenue" 
                name="Revenue"
                stroke="#10b981" 
                strokeWidth={2.5} 
                dot={false}
                activeDot={{ r: 5, fill: '#10b981', stroke: '#ffffff', strokeWidth: 2 }}
              />
            )}
            {showNetProfit && (
              <Line 
                type="monotone" 
                dataKey="netProfit" 
                name="Net profit"
                stroke="#1e293b" 
                strokeWidth={2} 
                dot={false}
                activeDot={{ r: 5, fill: '#1e293b', stroke: '#ffffff', strokeWidth: 2 }}
              />
            )}
            {showCosts && (
              <Line 
                type="monotone" 
                dataKey="costs" 
                name="Costs"
                stroke="#f43f5e" 
                strokeWidth={2} 
                dot={false}
                activeDot={{ r: 5, fill: '#f43f5e', stroke: '#ffffff', strokeWidth: 2 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Legend Row with Toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 mt-1 border-t border-[#edf3ee] gap-3 text-xs font-mono">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={showRevenue} 
              onChange={(e) => setShowRevenue(e.target.checked)}
              className="w-3.5 h-3.5 rounded text-[#10b981] accent-[#10b981]"
            />
            <span className="text-[#092218] font-medium">Revenue</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={showCosts} 
              onChange={(e) => setShowCosts(e.target.checked)}
              className="w-3.5 h-3.5 rounded text-[#f43f5e] accent-[#f43f5e]"
            />
            <span className="text-[#092218] font-medium">Costs</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={showNetProfit} 
              onChange={(e) => setShowNetProfit(e.target.checked)}
              className="w-3.5 h-3.5 rounded text-[#1e293b] accent-[#1e293b]"
            />
            <span className="text-[#092218] font-medium">Net profit</span>
          </label>
        </div>

        {/* Vs previous period toggle switch */}
        <label className="flex items-center gap-2 cursor-pointer select-none text-[11px] text-[#86a394]">
          <div
            onClick={() => setVsPrevious(!vsPrevious)}
            className={`w-7 h-4 rounded-full transition-colors relative cursor-pointer ${
              vsPrevious ? 'bg-[#10b981]' : 'bg-[#d8e6db]'
            }`}
          >
            <div 
              className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform ${
                vsPrevious ? 'left-3.5' : 'left-0.5'
              }`} 
            />
          </div>
          <span>Vs. previous period</span>
        </label>
      </div>
    </div>
  );
}
