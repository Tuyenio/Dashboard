import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardService, userService, authService } from '../services';
import { useAuthStore, useDashboardStore } from '../store';
import { PaginationParams } from '../types';

// Hook cho xác thực
export const useAuth = () => {
  const { setUser, setToken, logout, setLoading } = useAuthStore();
  const queryClient = useQueryClient();

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

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      logout();
      queryClient.clear();
    },
  });

  return {
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoading: loginMutation.isPending || logoutMutation.isPending,
  };
};

// Hook cho dashboard data
export const useDashboard = () => {
  const { setSummaryData, setChartData, setLoading, setError } = useDashboardStore();

  const summaryQuery = useQuery({
    queryKey: ['dashboard', 'summary'],
    queryFn: dashboardService.getDashboardSummary,
    onSuccess: (data) => {
      setSummaryData(data.data);
    },
    onError: (error: any) => {
      setError(error.message);
    },
  });

  const chartDataQuery = useQuery({
    queryKey: ['dashboard', 'charts'],
    queryFn: () => dashboardService.getChartData('revenue', '30d'),
    onSuccess: (data) => {
      setChartData(data.data);
    },
    onError: (error: any) => {
      setError(error.message);
    },
  });

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
    summaryData: summaryQuery.data?.data || [],
    chartData: chartDataQuery.data?.data || [],
    isLoading: summaryQuery.isLoading || chartDataQuery.isLoading,
    error: summaryQuery.error || chartDataQuery.error,
    exportData: exportMutation.mutate,
    isExporting: exportMutation.isPending,
    refetch: () => {
      summaryQuery.refetch();
      chartDataQuery.refetch();
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
