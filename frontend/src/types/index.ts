// Types cơ bản cho Dashboard Analytics
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface DashboardData {
  id: string;
  title: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon?: string;
}

export interface ChartData {
  label: string;
  value: number;
  date?: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  total?: number;
}

export interface PaginationParams {
  page: number;
  size: number;
  sort?: string;
  direction?: 'asc' | 'desc';
}

// API Error types
export interface ApiError {
  message: string;
  status: number;
  timestamp: string;
}
