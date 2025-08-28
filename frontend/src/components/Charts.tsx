import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Paper,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useDashboard } from '../hooks';
import { formatCurrency, formatNumber, formatPercentage } from '../utils';

// Component hiển thị thẻ thống kê
interface StatCardProps {
  title: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ReactNode;
  format?: 'currency' | 'number' | 'percentage';
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon,
  format = 'number'
}) => {
  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return formatCurrency(val);
      case 'percentage':
        return formatPercentage(val);
      default:
        return formatNumber(val);
    }
  };

  const getChangeColor = () => {
    switch (changeType) {
      case 'increase':
        return 'success.main';
      case 'decrease':
        return 'error.main';
      default:
        return 'text.secondary';
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {formatValue(value)}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: getChangeColor() }}
            >
              {change > 0 ? '+' : ''}{formatPercentage(change, 1)} so với tháng trước
            </Typography>
          </Box>
          <Box sx={{ color: 'primary.main' }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// Component biểu đồ đường
interface LineChartCardProps {
  title: string;
  data: any[];
  dataKey: string;
  xAxisKey: string;
}

const LineChartCard: React.FC<LineChartCardProps> = ({ title, data, dataKey, xAxisKey }) => {
  return (
    <Paper sx={{ p: 2, height: 400 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#1976d2"
            strokeWidth={2}
            dot={{ fill: '#1976d2' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

// Component biểu đồ cột
interface BarChartCardProps {
  title: string;
  data: any[];
  dataKey: string;
  xAxisKey: string;
}

const BarChartCard: React.FC<BarChartCardProps> = ({ title, data, dataKey, xAxisKey }) => {
  return (
    <Paper sx={{ p: 2, height: 400 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={dataKey} fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export { StatCard, LineChartCard, BarChartCard };
