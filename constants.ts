
import { CategoryGroup, ShoppingCategory } from './types';

export const CATEGORY_GROUPS: CategoryGroup[] = [
  'Ăn uống',
  'Mua sắm',
  'Sinh hoạt',
  'Giải trí',
  'Khác'
];

export const PRESET_COLORS = [
  { name: 'Red', hex: '#ef4444' },
  { name: 'Orange', hex: '#f97316' },
  { name: 'Amber', hex: '#f59e0b' },
  { name: 'Yellow', hex: '#eab308' },
  { name: 'Lime', hex: '#84cc16' },
  { name: 'Green', hex: '#22c55e' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Teal', hex: '#14b8a6' },
  { name: 'Cyan', hex: '#06b6d4' },
  { name: 'Sky', hex: '#0ea5e9' },
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Indigo', hex: '#6366f1' },
  { name: 'Violet', hex: '#8b5cf6' },
  { name: 'Purple', hex: '#a855f7' },
  { name: 'Fuchsia', hex: '#d946ef' },
  { name: 'Pink', hex: '#ec4899' },
  { name: 'Rose', hex: '#f43f5e' },
];

export const INITIAL_CATEGORIES: ShoppingCategory[] = [
  { id: '1', name: 'Ăn sáng', color: '#22c55e', group: 'Ăn uống', totalSpent: 0, items: [] },
  { id: '2', name: 'Ăn trưa', color: '#f97316', group: 'Ăn uống', totalSpent: 0, items: [] },
  { id: '3', name: 'Quần áo', color: '#ec4899', group: 'Mua sắm', totalSpent: 0, items: [] },
  { id: '4', name: 'Điện nước', color: '#3b82f6', group: 'Sinh hoạt', totalSpent: 0, items: [] },
  { id: '5', name: 'Xem phim', color: '#a855f7', group: 'Giải trí', totalSpent: 0, items: [] },
];
