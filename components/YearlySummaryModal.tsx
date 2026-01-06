
import React from 'react';
import { ShoppingCategory } from '../types';
import { formatVND } from '../utils/formatters';
import { X, TrendingUp, BarChart3 } from 'lucide-react';

interface YearlySummaryModalProps {
  year: number;
  categories: ShoppingCategory[];
  onClose: () => void;
}

const YearlySummaryModal: React.FC<YearlySummaryModalProps> = ({ year, categories, onClose }) => {
  const yearlyData = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const total = categories.reduce((sum, cat) => {
      return sum + cat.items
        .filter(item => {
          const d = new Date(item.date);
          return d.getMonth() + 1 === month && d.getFullYear() === year;
        })
        .reduce((s, it) => s + it.amount, 0);
    }, 0);
    return { month, total };
  });

  const totalYear = yearlyData.reduce((sum, m) => sum + m.total, 0);

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <BarChart3 size={20} />
            <h2 className="text-xl font-bold">Tổng kết năm {year}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="bg-blue-50 p-6 rounded-2xl mb-8 flex justify-between items-center">
            <div>
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Tổng chi tiêu cả năm</p>
              <p className="text-4xl font-black text-blue-900">{formatVND(totalYear)}</p>
            </div>
            <TrendingUp size={48} className="text-blue-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {yearlyData.map(({ month, total }) => (
              <div key={month} className="flex justify-between items-center p-4 bg-white border border-slate-100 rounded-xl">
                <span className="font-bold text-slate-500">Tháng {month}</span>
                <span className={`font-bold ${total > 0 ? 'text-slate-900' : 'text-slate-300'}`}>
                  {formatVND(total)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearlySummaryModal;
