'use client';

import React from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { month: 'Jan', carbon: 400, offset: 240 },
  { month: 'Feb', carbon: 300, offset: 139 },
  { month: 'Mar', carbon: 200, offset: 980 },
  { month: 'Apr', carbon: 278, offset: 390 },
  { month: 'May', carbon: 189, offset: 480 },
  { month: 'Jun', carbon: 239, offset: 380 },
  { month: 'Jul', carbon: 349, offset: 430 },
];

export function ChartAreaInteractive() {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Carbon Footprint vs Offset
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
            <XAxis dataKey="month" stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
            <YAxis stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                border: 'none',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Area type="monotone" dataKey="carbon" stackId="1" stroke="#EF4444" fill="#FEE2E2" />
            <Area type="monotone" dataKey="offset" stackId="1" stroke="#10B981" fill="#D1FAE5" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
