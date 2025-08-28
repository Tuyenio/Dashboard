import apiClient from './api';
import type { ApiResponse, DashboardData, ChartData, PaginationParams } from '../types';

// Service cho Dashboard Analytics
export const dashboardService = {
  // Lấy dữ liệu tổng quan dashboard
  getDashboardSummary: async (): Promise<ApiResponse<DashboardData[]>> => {
    const response = await apiClient.get('/dashboard/summary');
    return response.data;
  },

  // Lấy dữ liệu biểu đồ
  getChartData: async (type: string, period: string): Promise<ApiResponse<ChartData[]>> => {
    const response = await apiClient.get(`/dashboard/charts/${type}`, {
      params: { period }
    });
    return response.data;
  },

  // Export dữ liệu
  exportData: async (format: 'excel' | 'pdf', filters: any): Promise<Blob> => {
    const response = await apiClient.post(`/dashboard/export/${format}`, filters, {
      responseType: 'blob'
    });
    return response.data;
  }
};

// Service cho quản lý người dùng
export const userService = {
  // Lấy danh sách người dùng
  getUsers: async (params: PaginationParams): Promise<ApiResponse<any[]>> => {
    const response = await apiClient.get('/users', { params });
    return response.data;
  },

  // Lấy thông tin người dùng hiện tại
  getCurrentUser: async (): Promise<ApiResponse<any>> => {
    const response = await apiClient.get('/users/me');
    return response.data;
  },

  // Cập nhật thông tin người dùng
  updateUser: async (id: string, userData: any): Promise<ApiResponse<any>> => {
    const response = await apiClient.put(`/users/${id}`, userData);
    return response.data;
  }
};

// Service cho xác thực
export const authService = {
  // Đăng nhập
  login: async (credentials: { email: string; password: string }): Promise<ApiResponse<any>> => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  // Đăng xuất
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
    localStorage.removeItem('authToken');
  }
};
