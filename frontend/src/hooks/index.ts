import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { dashboardService, userService, authService } from '../services';
import { useAuthStore, useDashboardStore } from '../store';
import type { PaginationParams } from '../types';

// Hook cho xác thực
export const useAuth = () => {
  const { setUser, setToken, logout: storeLogout } = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      const { data } = response;
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('authToken', data.token);
    },
    onError: (error) => {
      console.error('Lỗi đăng nhập:', error);
    },
  });

  // Hàm đăng xuất đơn giản và hiệu quả
  const logout = () => {
    try {
      // Xóa dữ liệu từ store
      storeLogout();

      // Xóa token từ localStorage
      localStorage.removeItem('authToken');

      // Xóa tất cả cache
      queryClient.clear();

      // Điều hướng về trang login
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
      // Vẫn thực hiện đăng xuất ngay cả khi có lỗi
      localStorage.removeItem('authToken');
      navigate('/login', { replace: true });
    }
  };

  return {
    login: loginMutation.mutate,
    logout,
    isLoading: loginMutation.isPending,
  };
};

// Hook cho dashboard data (đơn giản hóa để tránh lỗi)
export const useDashboard = () => {
  const exportMutation = useMutation({
    mutationFn: ({ format, filters }: { format: 'excel' | 'pdf'; filters: any }) =>
      dashboardService.exportData(format, filters),
    onSuccess: (blob, variables) => {
      // Tạo download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `dashboard-export.${variables.format}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
  });

  return {
    summaryData: [],
    chartData: [],
    isLoading: false,
    error: null,
    exportData: exportMutation.mutate,
    isExporting: exportMutation.isPending,
    refetch: () => {
      // Placeholder for refetch
    },
  };
};

// Hook cho quản lý người dùng
export const useUsers = (params: PaginationParams) => {
  const usersQuery = useQuery({
    queryKey: ['users', params],
    queryFn: () => userService.getUsers(params),
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ id, userData }: { id: string; userData: any }) =>
      userService.updateUser(id, userData),
    onSuccess: () => {
      usersQuery.refetch();
    },
  });

  return {
    users: usersQuery.data?.data || [],
    total: usersQuery.data?.total || 0,
    isLoading: usersQuery.isLoading,
    error: usersQuery.error,
    updateUser: updateUserMutation.mutate,
    isUpdating: updateUserMutation.isPending,
  };
};

// Hook cho người dùng hiện tại
export const useCurrentUser = () => {
  const { user } = useAuthStore();

  const currentUserQuery = useQuery({
    queryKey: ['user', 'current'],
    queryFn: userService.getCurrentUser,
    enabled: !!user,
  });

  return {
    user: currentUserQuery.data?.data || user,
    isLoading: currentUserQuery.isLoading,
    error: currentUserQuery.error,
  };
};
