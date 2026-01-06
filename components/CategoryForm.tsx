
import React, { useState, useEffect } from 'react';
import { ShoppingCategory, CategoryGroup } from '../types';
import { CATEGORY_GROUPS, PRESET_COLORS } from '../constants';
import { X, Check } from 'lucide-react';

interface CategoryFormProps {
  initialData?: ShoppingCategory | null;
  // Fix: The form does not manage 'items', so we omit it from the submission type
  onSubmit: (data: Omit<ShoppingCategory, 'id' | 'items'>) => void;
  onClose: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ initialData, onSubmit, onClose }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [group, setGroup] = useState<CategoryGroup>(initialData?.group || 'Ăn uống');
  const [color, setColor] = useState(initialData?.color || PRESET_COLORS[0].hex);
  const [totalSpent, setTotalSpent] = useState(initialData?.totalSpent?.toString() || '0');
  const [description, setDescription] = useState(initialData?.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    onSubmit({
      name,
      group,
      color,
      totalSpent: parseInt(totalSpent) || 0,
      description
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">
            {initialData ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tên danh mục</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="VD: Ăn sáng, Mua sắm quần áo..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nhóm</label>
              <select 
                value={group}
                onChange={(e) => setGroup(e.target.value as CategoryGroup)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white transition-all"
              >
                {CATEGORY_GROUPS.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Số tiền (VND)</label>
              <input 
                type="number" 
                value={totalSpent}
                onChange={(e) => setTotalSpent(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Màu sắc đại diện</label>
            <div className="flex flex-wrap gap-2 pt-1">
              {PRESET_COLORS.map(c => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => setColor(c.hex)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${color === c.hex ? 'ring-2 ring-slate-800 ring-offset-2' : ''}`}
                  style={{ backgroundColor: c.hex }}
                >
                  {color === c.hex && <Check size={14} className="text-white" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Ghi chú (tùy chọn)</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              rows={2}
              placeholder="Thêm thông tin mô tả..."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Hủy
            </button>
            <button 
              type="submit"
              className="flex-1 py-3 px-4 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5"
            >
              {initialData ? 'Cập nhật' : 'Tạo mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
