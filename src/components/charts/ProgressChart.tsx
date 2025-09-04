"use client";

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface ProgressChartProps {
  data: {
    date: string;
    value: number;
    [key: string]: string | number;
  }[];
  dataKeys: string[];
  colors: string[];
  title: string;
  yAxisLabel?: string;
  xAxisLabel?: string;
}

export default function ProgressChart({
  data,
  dataKeys,
  colors,
  title,
  yAxisLabel = "Progress (%)",
  xAxisLabel = "Date"
}: ProgressChartProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
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
              dataKey="date"
              tick={{ fill: '#6b7280' }}
              tickLine={{ stroke: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db' }}
              label={{ value: xAxisLabel, position: 'insideBottom', offset: -20, fill: '#4b5563' }}
            />
            <YAxis
              tick={{ fill: '#6b7280' }}
              tickLine={{ stroke: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db' }}
              label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', offset: 0, fill: '#4b5563' }}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                padding: '10px'
              }}
            />
            <Legend verticalAlign="top" height={36} />
            {dataKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                strokeWidth={3}
                dot={{ r: 6 }}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}