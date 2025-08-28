import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Chip,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import {
  TrendingUp,
  People,
  AttachMoney,
  ShoppingCart,
  GetApp,
} from '@mui/icons-material';
import { StatCard, LineChartCard, BarChartCard } from '../components/Charts';
import { useDashboard } from '../hooks';
import { useDashboardStore } from '../store';

const Dashboard: React.FC = () => {
  const { exportData, isExporting } = useDashboard();
  const { selectedPeriod, setSelectedPeriod } = useDashboardStore();

  // Sample data cho demo (sử dụng data này thay vì từ API để demo)
  const sampleSummaryData = [
    {
      id: '1',
      title: 'Tổng doanh thu',
      value: 2450000000,
      change: 12.5,
      changeType: 'increase' as const,
      icon: <AttachMoney sx={{ fontSize: 40 }} />,
    },
    {
      id: '2',
      title: 'Người dùng mới',
      value: 1234,
      change: 8.2,
      changeType: 'increase' as const,
      icon: <People sx={{ fontSize: 40 }} />,
    },
    {
      id: '3',
      title: 'Đơn hàng',
      value: 856,
      change: -2.1,
      changeType: 'decrease' as const,
      icon: <ShoppingCart sx={{ fontSize: 40 }} />,
    },
    {
      id: '4',
      title: 'Tỷ lệ chuyển đổi',
      value: 3.24,
      change: 0.8,
      changeType: 'increase' as const,
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
    },
  ];

  // Sample chart data
  const sampleChartData = [
    { date: '01/01', doanhthu: 2400000, donhang: 45 },
    { date: '02/01', doanhthu: 1398000, donhang: 32 },
    { date: '03/01', doanhthu: 9800000, donhang: 78 },
    { date: '04/01', doanhthu: 3908000, donhang: 56 },
    { date: '05/01', doanhthu: 4800000, donhang: 67 },
    { date: '06/01', doanhthu: 3800000, donhang: 43 },
    { date: '07/01', doanhthu: 4300000, donhang: 58 },
  ];

  const handlePeriodChange = (event: SelectChangeEvent) => {
    setSelectedPeriod(event.target.value);
  };

  const handleExport = (format: 'excel' | 'pdf') => {
    exportData({ format, filters: { period: selectedPeriod } });
  };

  const isLoading = false; // Demo mode

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard Analytics
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Tổng quan về hiệu suất kinh doanh của bạn
          </Typography>
        </Box>
        <Box display="flex" gap={2} alignItems="center">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={selectedPeriod}
              onChange={handlePeriodChange}
              displayEmpty
            >
              <MenuItem value="7d">7 ngày</MenuItem>
              <MenuItem value="30d">30 ngày</MenuItem>
              <MenuItem value="90d">90 ngày</MenuItem>
              <MenuItem value="1y">1 năm</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<GetApp />}
            onClick={() => handleExport('excel')}
            disabled={isExporting}
          >
            Xuất Excel
          </Button>
          <Button
            variant="outlined"
            startIcon={<GetApp />}
            onClick={() => handleExport('pdf')}
            disabled={isExporting}
          >
            Xuất PDF
          </Button>
        </Box>
      </Box>

      {/* Status Indicator */}
      <Box mb={3}>
        <Chip
          label={isLoading ? 'Đang tải dữ liệu...' : 'Dữ liệu cập nhật'}
          color={isLoading ? 'warning' : 'success'}
          variant="outlined"
        />
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {sampleSummaryData.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <StatCard
              title={item.title}
              value={item.value}
              change={item.change}
              changeType={item.changeType}
              icon={item.icon}
              format={item.title.includes('doanh thu') ? 'currency' :
                     item.title.includes('Tỷ lệ') ? 'percentage' : 'number'}
            />
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <LineChartCard
            title="Doanh thu theo thời gian"
            data={sampleChartData}
            dataKey="doanhthu"
            xAxisKey="date"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <BarChartCard
            title="Đơn hàng theo ngày"
            data={sampleChartData}
            dataKey="donhang"
            xAxisKey="date"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
