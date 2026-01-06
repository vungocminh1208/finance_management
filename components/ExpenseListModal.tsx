
import React, { useState, useEffect } from 'react';
import { ShoppingCategory, ExpenseItem } from '../types';
import { formatVND } from '../utils/formatters';
import { X, Plus, Calendar, CreditCard, Trash2 } from 'lucide-react';

interface ExpenseListModalProps {
  category: ShoppingCategory;
  onClose: () => void;
  onAddItem: (categoryId: string, item: Omit<ExpenseItem, 'id'>) => void;
  onRemoveItem: (categoryId: string, itemId: string) => void;
}

const ExpenseListModal: React.FC<ExpenseListModalProps> = ({ 
  category, 
  onClose, 
  onAddItem, 
  onRemoveItem 
}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  // Logic to determine a default date based on the category's current viewing month/year
  // We use the first day of the current selected month if possible
  const [date, setDate] = useState(() => {
    const now = new Date();
    // In App.tsx, we pass filtered items, but we don't pass the raw selectedMonth. 
    // Let's just use current date but allow easy modification.
    return now.toISOString().split('T')[0];
  });
  
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;
    onAddItem(category.id, {
      title,
      amount: parseInt(amount),
      date
    });
    setTitle('');
    setAmount('');
    setShowForm(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center" style={{ borderTop: `6px solid ${category.color}` }}>
          <div>
            <h2 className="text-xl font-bold text-slate-800">{category.name}</h2>
            <p className="text-sm text-slate-500">Chi tiết chi tiêu tháng đang chọn</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-slate-500">Tổng tháng này</p>
              <p className="text-2xl font-bold text-slate-900">{formatVND(category.totalSpent)}</p>
            </div>
            {!showForm && (
              <button 
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl font-semibold hover:bg-slate-800 transition-all text-sm"
              >
                <Plus size={18} />
                Thêm chi tiêu
              </button>
            )}
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="bg-slate-50 p-4 rounded-xl mb-6 space-y-4 animate-in fade-in slide-in-from-top-2">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tên mục chi tiêu</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="VD: Ăn bánh bao..."
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Số tiền (VND)</label>
                    <input 
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="0"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Ngày</label>
                    <input 
                      type="date" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                >
                  Lưu lại
                </button>
                <button 
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-slate-600 font-semibold hover:bg-slate-200 rounded-lg transition-colors text-sm"
                >
                  Hủy
                </button>
              </div>
            </form>
          )}

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Lịch sử chi tiêu</h3>
            {category.items.length > 0 ? (
              category.items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl hover:border-slate-200 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                      <CreditCard size={18} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 leading-tight">{item.title}</h4>
                      <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                        <Calendar size={12} />
                        {new Date(item.date).toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900">{formatVND(item.amount)}</span>
                    <button 
                      onClick={() => onRemoveItem(category.id, item.id)}
                      className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-400 italic bg-slate-50 rounded-2xl">
                Chưa có chi tiêu nào trong tháng/năm này.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseListModal;
