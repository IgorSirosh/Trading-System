
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ReferenceLine } from 'recharts';
import { ChartDataPoint } from '../types';

interface ChartPanelProps {
  data: ChartDataPoint[];
}

const ChartPanel: React.FC<ChartPanelProps> = ({ data }) => {
  const lastDataPoint = data[data.length - 1];

  return (
    <div className="bg-gray-800 rounded-lg h-full flex flex-col p-4">
        <div className="flex items-baseline space-x-4 mb-2">
            <h2 className="text-2xl font-bold text-white">BTC/USDT</h2>
            <span className={`text-xl font-semibold ${lastDataPoint && data[data.length-2] && lastDataPoint.price > data[data.length-2].price ? 'text-accent-green' : 'text-accent-red'}`}>
                {lastDataPoint?.price.toLocaleString()}
            </span>
             <span className="text-sm text-gray-400">RSI: {lastDataPoint?.rsi.toFixed(2)}</span>
             <span className="text-sm text-gray-400">VWAP: {lastDataPoint?.vwap?.toFixed(2)}</span>
        </div>
      <div className="flex-grow w-full h-3/5">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2F3D" />
            <XAxis dataKey="time" stroke="#9DA3B7" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#9DA3B7" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 100', 'dataMax + 100']} orientation="right" />
            <Tooltip
                contentStyle={{ backgroundColor: '#1A1E29', border: '1px solid #2A2F3D' }}
                labelStyle={{ color: '#E0E6F1' }}
            />
            <Line type="monotone" dataKey="price" stroke="#3B82F6" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="vwap" stroke="#FBBF24" strokeWidth={1} dot={false} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-grow w-full h-2/5 mt-2">
        <ResponsiveContainer>
           <AreaChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
             <CartesianGrid strokeDasharray="3 3" stroke="#2A2F3D" />
             <XAxis dataKey="time" stroke="#9DA3B7" fontSize={12} tickLine={false} axisLine={false} />
             <YAxis stroke="#9DA3B7" fontSize={12} domain={[0, 100]} tickLine={false} axisLine={false} orientation="right" />
             <Tooltip
                contentStyle={{ backgroundColor: '#1A1E29', border: '1px solid #2A2F3D' }}
                labelStyle={{ color: '#E0E6F1' }}
             />
             <ReferenceLine y={70} label={{ value: "Overbought", position: 'insideTopRight', fill: '#9DA3B7', fontSize: 10 }} stroke="#EF4444" strokeDasharray="3 3" />
             <ReferenceLine y={30} label={{ value: "Oversold", position: 'insideBottomRight', fill: '#9DA3B7', fontSize: 10 }} stroke="#10B981" strokeDasharray="3 3" />
             <Area type="monotone" dataKey="rsi" stroke="#C084FC" fill="#C084FC" fillOpacity={0.2} />
           </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartPanel;
