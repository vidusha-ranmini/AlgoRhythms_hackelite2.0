"use client";

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface ActivityHistoryChartProps {
  data: {
    period: string;
    [key: string]: string | number;
  }[];
  title: string;
  colors: {
    [key: string]: string;
  };
}

export default function ActivityHistoryChart({
  data,
  title,
  colors
}: ActivityHistoryChartProps) {
  // Extract the activity types from the data
  const activityTypes = Object.keys(data[0]).filter(key => key !== 'period');

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 25
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis
              dataKey="period"
              tick={{ fill: '#6b7280' }}
              tickLine={{ stroke: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db' }}
            />
            <YAxis
              tick={{ fill: '#6b7280' }}
              tickLine={{ stroke: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db' }}
              label={{ value: 'Activities', angle: -90, position: 'insideLeft', offset: 0, fill: '#4b5563' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                padding: '10px'
              }}
              formatter={(value, name) => [`${value} activities`, name]}
            />
            <Legend verticalAlign="top" height={36} />
            {activityTypes.map((type) => (
              <Bar
                key={type}
                dataKey={type}
                name={type}
                fill={colors[type] || '#8884d8'}
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}