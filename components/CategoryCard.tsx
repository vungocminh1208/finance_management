
import React from 'react';
import { ShoppingCategory } from '../types';
import { formatVND } from '../utils/formatters';
import { Edit2, Trash2, Tag, ChevronRight, Plus } from 'lucide-react';

interface CategoryCardProps {
  category: ShoppingCategory;
  onEdit: (cat: ShoppingCategory) => void;
  onDelete: (id: string) => void;
  onViewExpenses: (cat: ShoppingCategory) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onEdit, onDelete, onViewExpenses }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
      style={{ borderLeft: `6px solid ${category.color}` }}
    >
      <div className="p-4 flex-1">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${category.color}20`, color: category.color }}
            >
              <Tag size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">{category.name}</h3>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                {category.group}
              </span>
            </div>
          </div>
          <div className="flex gap-1">
            <button 
              onClick={(e) => { e.stopPropagation(); onEdit(category); }}
              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              <Edit2 size={16} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete(category.id); }}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-50">
          <p className="text-sm text-slate-500 mb-1">Đã chi tiêu</p>
          <div className="flex items-baseline justify-between">
            <p className="text-xl font-bold text-slate-900">{formatVND(category.totalSpent)}</p>
            <span className="text-xs font-bold text-slate-400">{category.items.length} mục</span>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => onViewExpenses(category)}
        className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-600 text-sm font-semibold flex items-center justify-between border-t border-slate-100 transition-colors"
      >
        <span>Xem & Thêm Chi Tiêu</span>
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default CategoryCard;
