import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { CheckInLog } from '../types';

interface Props {
  logs: CheckInLog[];
}

const StatsChart: React.FC<Props> = ({ logs }) => {
  // Generate last 7 days data
  const data = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const log = logs.find(l => l.date === dateStr);
    
    return {
      name: d.toLocaleDateString('zh-CN', { weekday: 'short' }),
      date: dateStr,
      value: log ? 1 : 0,
    };
  });

  return (
    <div className="w-full h-48 mt-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-4 px-2">近7日记录</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#9ca3af' }} 
          />
          <Tooltip 
            cursor={{ fill: '#fff1f2' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            labelStyle={{ color: '#374151', fontWeight: 'bold' }}
            formatter={(value: number) => [value ? '已打卡' : '未打卡', '状态']}
          />
          <Bar dataKey="value" radius={[4, 4, 4, 4]}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.value ? '#fb7185' : '#f3f4f6'} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsChart;