import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { User, DashboardData, ChartData } from '../types';

// Store cho quản lý authentication
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        setUser: (user) => set({ user, isAuthenticated: true }),
        setToken: (token) => set({ token }),
        logout: () => {
          // Xóa hoàn toàn tất cả dữ liệu auth
          set({ user: null, token: null, isAuthenticated: false });
          // Xóa persist storage
          localStorage.removeItem('auth-storage');
        },
        setLoading: (isLoading) => set({ isLoading }),
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({ token: state.token, user: state.user }),
      }
    ),
    { name: 'auth-store' }
  )
);

// Store cho quản lý dashboard data
interface DashboardState {
  summaryData: DashboardData[];
  chartData: ChartData[];
  isLoading: boolean;
  error: string | null;
  selectedPeriod: string;
  setSummaryData: (data: DashboardData[]) => void;
  setChartData: (data: ChartData[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedPeriod: (period: string) => void;
  clearData: () => void;
}

export const useDashboardStore = create<DashboardState>()(
  devtools(
    (set) => ({
      summaryData: [],
      chartData: [],
      isLoading: false,
      error: null,
      selectedPeriod: '30d',
      setSummaryData: (summaryData) => set({ summaryData }),
      setChartData: (chartData) => set({ chartData }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setSelectedPeriod: (selectedPeriod) => set({ selectedPeriod }),
      clearData: () => set({ summaryData: [], chartData: [], error: null }),
    }),
    { name: 'dashboard-store' }
  )
);

// Store cho UI state
interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  notifications: any[];
  toggleTheme: () => void;
  toggleSidebar: () => void;
  addNotification: (notification: any) => void;
  removeNotification: (id: string) => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set, get) => ({
        theme: 'light',
        sidebarOpen: true,
        notifications: [],
        toggleTheme: () => set({ theme: get().theme === 'light' ? 'dark' : 'light' }),
        toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }),
        addNotification: (notification) =>
          set({ notifications: [...get().notifications, notification] }),
        removeNotification: (id) =>
          set({ notifications: get().notifications.filter(n => n.id !== id) }),
      }),
      {
        name: 'ui-storage',
        partialize: (state) => ({ theme: state.theme, sidebarOpen: state.sidebarOpen }),
      }
    ),
    { name: 'ui-store' }
  )
);
