
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ShoppingCategory } from '../types';
import { formatVND } from '../utils/formatters';
import { Wallet, TrendingUp, ShoppingBag } from 'lucide-react';

interface DashboardStatsProps {
  categories: ShoppingCategory[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ categories }) => {
  const totalSpent = categories.reduce((sum, cat) => sum + cat.totalSpent, 0);
  
  const chartData = categories.map(cat => ({
    name: cat.name,
    value: cat.totalSpent,
    color: cat.color
  })).filter(item => item.value > 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Summary Cards */}
      <div className="lg:col-span-1 flex flex-col gap-4">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl shadow-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <Wallet size={24} />
            </div>
            <span className="font-medium text-blue-100">Tổng chi tiêu</span>
          </div>
          <h2 className="text-3xl font-bold">{formatVND(totalSpent)}</h2>
          <p className="text-sm text-blue-100 mt-2">Dựa trên {categories.length} danh mục</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Danh mục nhiều nhất</p>
            <p className="font-bold text-slate-800">
              {categories.length > 0 ? categories.sort((a, b) => b.totalSpent - a.totalSpent)[0].name : 'N/A'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <ShoppingBag size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Số lượng danh mục</p>
            <p className="font-bold text-slate-800">{categories.length} mục</p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm min-h-[300px]">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Phân bổ chi tiêu</h3>
        <div className="h-[250px] w-full">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => formatVND(value)}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 italic">
              Chưa có dữ liệu để hiển thị biểu đồ
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
