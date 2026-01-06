
export type CategoryGroup = 'Ăn uống' | 'Mua sắm' | 'Sinh hoạt' | 'Giải trí' | 'Khác';

export interface ExpenseItem {
  id: string;
  title: string;
  amount: number;
  date: string;
}

export interface ShoppingCategory {
  id: string;
  name: string;
  color: string;
  group: CategoryGroup;
  totalSpent: number;
  items: ExpenseItem[];
  description?: string;
}

export interface Stats {
  total: number;
  byGroup: Record<CategoryGroup, number>;
}
