
import React, { useState, useMemo } from 'react';
import { ShoppingCategory, CategoryGroup, ExpenseItem } from './types';
import { INITIAL_CATEGORIES, CATEGORY_GROUPS } from './constants';
import CategoryCard from './components/CategoryCard';
import CategoryForm from './components/CategoryForm';
import DashboardStats from './components/DashboardStats';
import ExpenseListModal from './components/ExpenseListModal';
import YearlySummaryModal from './components/YearlySummaryModal';
import { Plus, LayoutGrid, List, Search, Filter, CalendarDays, BarChart } from 'lucide-react';

const App: React.FC = () => {
  const [categories, setCategories] = useState<ShoppingCategory[]>(INITIAL_CATEGORIES);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ShoppingCategory | null>(null);
  const [viewingCategory, setViewingCategory] = useState<ShoppingCategory | null>(null);
  const [isYearlySummaryOpen, setIsYearlySummaryOpen] = useState(false);
  
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGroup, setFilterGroup] = useState<CategoryGroup | 'Tất cả'>('Tất cả');

  // Derive categories with filtered spending for the UI
  const processedCategories = useMemo(() => {
    return categories.map(cat => {
      const filteredItems = cat.items.filter(item => {
        const d = new Date(item.date);
        return d.getMonth() + 1 === selectedMonth && d.getFullYear() === selectedYear;
      });
      const periodTotal = filteredItems.reduce((sum, item) => sum + item.amount, 0);
      return {
        ...cat,
        currentPeriodItems: filteredItems,
        totalSpent: periodTotal // This is the total for the selected month
      };
    });
  }, [categories, selectedMonth, selectedYear]);

  const filteredCategories = useMemo(() => {
    return processedCategories.filter(cat => {
      const matchesSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterGroup === 'Tất cả' || cat.group === filterGroup;
      return matchesSearch && matchesFilter;
    });
  }, [processedCategories, searchQuery, filterGroup]);

  const handleAddCategory = (data: Omit<ShoppingCategory, 'id' | 'items'>) => {
    const newCategory: ShoppingCategory = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      items: [],
      totalSpent: 0
    };
    setCategories([...categories, newCategory]);
    setIsFormOpen(false);
  };

  const handleEditCategory = (data: Omit<ShoppingCategory, 'id' | 'items'>) => {
    if (!editingCategory) return;
    setCategories(categories.map(cat => 
      cat.id === editingCategory.id ? { ...cat, ...data } : cat
    ));
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const handleAddExpenseItem = (categoryId: string, itemData: Omit<ExpenseItem, 'id'>) => {
    const newItem: ExpenseItem = {
      ...itemData,
      id: `item-${Math.random().toString(36).substr(2, 9)}`
    };

    setCategories(prev => {
      return prev.map(cat => {
        if (cat.id === categoryId) {
          return { ...cat, items: [...cat.items, newItem] };
        }
        return cat;
      });
    });
  };

  const handleRemoveExpenseItem = (categoryId: string, itemId: string) => {
    setCategories(prev => {
      return prev.map(cat => {
        if (cat.id === categoryId) {
          return { ...cat, items: cat.items.filter(i => i.id !== itemId) };
        }
        return cat;
      });
    });
  };

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = [2024, 2025, 2026, 2027];

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">
              C
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 leading-none">Chi Tiêu App</h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Tháng {selectedMonth}, {selectedYear}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
             <button 
              onClick={() => setIsYearlySummaryOpen(true)}
              className="hidden sm:flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl font-semibold transition-all"
            >
              <BarChart size={18} />
              Tổng kết năm
            </button>
            <button 
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold transition-all shadow-md shadow-blue-100 hover:-translate-y-0.5"
            >
              <Plus size={20} />
              <span className="hidden md:inline">Thêm danh mục</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Time Selector */}
        <div className="bg-slate-900 text-white p-6 rounded-3xl mb-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-2xl">
              <CalendarDays size={24} className="text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Chọn thời gian quản lý</h2>
              <p className="text-slate-400 text-sm">Dữ liệu sẽ được lọc theo tháng/năm</p>
            </div>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="flex-1 md:w-40 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 font-bold appearance-auto"
            >
              {months.map(m => (
                <option key={m} value={m} className="text-slate-900">Tháng {m}</option>
              ))}
            </select>
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="flex-1 md:w-44 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 font-bold appearance-auto"
            >
              {years.map(y => (
                <option key={y} value={y} className="text-slate-900">Năm {y}</option>
              ))}
            </select>
            <button 
              onClick={() => setIsYearlySummaryOpen(true)}
              className="sm:hidden p-2.5 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20"
            >
              <BarChart size={20} />
            </button>
          </div>
        </div>

        {/* Statistics (Automatic filtered via processedCategories) */}
        <DashboardStats categories={processedCategories} />

        {/* Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Tìm kiếm danh mục..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="flex items-center gap-2 flex-1 md:flex-none">
              <Filter size={18} className="text-slate-400" />
              <select 
                value={filterGroup}
                onChange={(e) => setFilterGroup(e.target.value as any)}
                className="flex-1 md:w-40 px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-all text-sm font-medium"
              >
                <option value="Tất cả">Tất cả nhóm</option>
                {CATEGORY_GROUPS.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            
            <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>

            <div className="flex p-1 bg-slate-100 rounded-lg">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
              >
                <LayoutGrid size={20} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Categories Display */}
        {filteredCategories.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'flex flex-col gap-3'}>
            {filteredCategories.map(cat => (
              <CategoryCard 
                key={cat.id} 
                category={cat} 
                onEdit={setEditingCategory}
                onDelete={handleDeleteCategory}
                onViewExpenses={(cat) => setViewingCategory(categories.find(c => c.id === cat.id) || null)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center">
            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Không tìm thấy danh mục</h3>
            <p className="text-slate-500">Hãy thử đổi từ khóa tìm kiếm hoặc lọc theo nhóm khác.</p>
          </div>
        )}
      </main>

      {/* Forms & Modals */}
      {(isFormOpen || editingCategory) && (
        <CategoryForm 
          initialData={editingCategory}
          onSubmit={editingCategory ? handleEditCategory : handleAddCategory}
          onClose={() => {
            setIsFormOpen(false);
            setEditingCategory(null);
          }}
        />
      )}

      {viewingCategory && (
        <ExpenseListModal 
          // We need to pass the category with filtered items for correct display in the modal
          category={{
            ...viewingCategory,
            items: viewingCategory.items.filter(item => {
              const d = new Date(item.date);
              return d.getMonth() + 1 === selectedMonth && d.getFullYear() === selectedYear;
            }),
            totalSpent: viewingCategory.items
              .filter(item => {
                const d = new Date(item.date);
                return d.getMonth() + 1 === selectedMonth && d.getFullYear() === selectedYear;
              })
              .reduce((sum, i) => sum + i.amount, 0)
          }}
          onClose={() => setViewingCategory(null)}
          onAddItem={handleAddExpenseItem}
          onRemoveItem={handleRemoveExpenseItem}
        />
      )}

      {isYearlySummaryOpen && (
        <YearlySummaryModal 
          year={selectedYear}
          categories={categories}
          onClose={() => setIsYearlySummaryOpen(false)}
        />
      )}

      {/* Footer / Credits */}
      <footer className="max-w-7xl mx-auto px-4 py-8 border-t border-slate-200 mt-12 text-center text-slate-400 text-sm">
        <p>© 2024 Hệ thống Quản lý Chi tiêu Shopping - {selectedMonth}/{selectedYear}</p>
      </footer>
    </div>
  );
};

export default App;
