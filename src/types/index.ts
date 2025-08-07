export interface User {
  id: string;
  email: string;
  name: string;
  currency: string;
  profile_picture?: string;
  created_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: string;
  description?: string;
  account: string;
  is_recurring: boolean;
  receipt_image?: string;
  created_at: string;
}

export interface Budget {
  id: string;
  user_id: string;
  category: string;
  amount: number;
  period: 'weekly' | 'monthly' | 'yearly';
  start_date: string;
  end_date: string;
  spent: number;
  created_at: string;
}

export interface Goal {
  id: string;
  user_id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  deadline: string;
  linked_account?: string;
  is_completed: boolean;
  is_archived: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  user_id: string;
  name: string;
  type: 'income' | 'expense';
  is_custom: boolean;
  created_at: string;
}