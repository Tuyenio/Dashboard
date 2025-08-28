import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Container,
  Avatar,
  InputAdornment,
  IconButton,
  Divider,
  Chip,
} from '@mui/material';
import {
  LockOutlined,
  Email,
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
  GitHub,
  LoginOutlined,
  PersonAdd,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

// Styled Components với hiệu ứng cao cấp
const LoginContainer = styled(Box)`
  min-height: 100vh;
  background: linear-gradient(135deg, 
    #667eea 0%, 
    #764ba2 25%, 
    #6B73FF 50%, 
    #9068BE 75%, 
    #667eea 100%
  );
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  position: relative;
  overflow: hidden;

  @keyframes gradientShift {
    0% { background-position: 0 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0 50%; }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a" cx="50%" cy="50%"><stop offset="0%" stop-color="%23ffffff" stop-opacity="0.1"/><stop offset="100%" stop-color="%23ffffff" stop-opacity="0"/></radialGradient></defs><circle cx="20%" cy="20%" r="200" fill="url(%23a)"/><circle cx="80%" cy="80%" r="300" fill="url(%23a)"/><circle cx="40%" cy="70%" r="150" fill="url(%23a)"/></svg>');
    animation: float 20s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
`;

const GlassCard = styled(Card)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 4px 16px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  overflow: hidden;
  position: relative;
  width: 100%;
  max-width: 480px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: left 0.6s ease;
  }

  &:hover::before {
    left: 100%;
  }
`;

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
    
    &.Mui-focused {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
    
    fieldset {
      border-color: rgba(255, 255, 255, 0.3);
      transition: all 0.3s ease;
    }
    
    &:hover fieldset {
      border-color: rgba(255, 255, 255, 0.5);
    }
    
    &.Mui-focused fieldset {
      border-color: rgba(255, 255, 255, 0.8);
      border-width: 2px;
    }
  }
  
  .MuiInputLabel-root {
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
    
    &.Mui-focused {
      color: rgba(255, 255, 255, 1);
    }
  }
  
  .MuiOutlinedInput-input {
    color: white;
    font-weight: 500;
  }
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 16px 32px;
  font-weight: 600;
  font-size: 16px;
  text-transform: none;
  color: white;
  border: none;
  box-shadow: 
    0 8px 25px rgba(102, 126, 234, 0.3),
    0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
    transform: translateY(-3px);
    box-shadow: 
      0 12px 35px rgba(102, 126, 234, 0.4),
      0 6px 16px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: rgba(255, 255, 255, 0.3);
    color: rgba(255, 255, 255, 0.6);
    transform: none;
    box-shadow: none;
  }
`;

const SocialButton = styled(IconButton)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 56px;
  height: 56px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    setIsLoading(true);

    // Giả lập thời gian xử lý
    setTimeout(() => {
      localStorage.setItem('authToken', 'demo-token');
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <LoginContainer>
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          py: 4,
          position: 'relative',
          zIndex: 1
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ width: '100%' }}
        >
          <GlassCard>
            <CardContent sx={{ p: 6 }}>
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Avatar
                      sx={{
                        m: 2,
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        width: 80,
                        height: 80,
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <LockOutlined sx={{ fontSize: 40, color: 'white' }} />
                    </Avatar>
                  </motion.div>

                  <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                      color: 'white',
                      fontWeight: 700,
                      textAlign: 'center',
                      background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 1
                    }}
                  >
                    {isLogin ? 'Chào mừng trở lại' : 'Tạo tài khoản'}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      textAlign: 'center',
                      fontWeight: 400
                    }}
                  >
                    {isLogin
                      ? 'Đăng nhập để truy cập Dashboard Analytics'
                      : 'Tham gia cùng chúng tôi và khám phá thế giới dữ liệu'
                    }
                  </Typography>
                </Box>
              </motion.div>

              {/* Social Login */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Box display="flex" justifyContent="center" gap={2} mb={4}>
                  <SocialButton>
                    <Google />
                  </SocialButton>
                  <SocialButton>
                    <Facebook />
                  </SocialButton>
                  <SocialButton>
                    <GitHub />
                  </SocialButton>
                </Box>

                <Box display="flex" alignItems="center" mb={4}>
                  <Divider sx={{ flex: 1, bgcolor: 'rgba(255, 255, 255, 0.3)' }} />
                  <Chip
                    label="HOẶC"
                    sx={{
                      mx: 2,
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      color: 'rgba(255, 255, 255, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  />
                  <Divider sx={{ flex: 1, bgcolor: 'rgba(255, 255, 255, 0.3)' }} />
                </Box>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Box component="form" onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait">
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Alert
                          severity="error"
                          sx={{
                            mb: 3,
                            bgcolor: 'rgba(255, 82, 82, 0.1)',
                            color: 'white',
                            '& .MuiAlert-icon': { color: '#ff5252' }
                          }}
                        >
                          {error}
                        </Alert>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <StyledTextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                      disabled={isLoading}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mb: 3 }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    <StyledTextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Mật khẩu"
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                      disabled={isLoading}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlined sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mb: 4 }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    <PrimaryButton
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={isLoading}
                      startIcon={
                        isLoading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <LoginOutlined />
                        )
                      }
                      sx={{ mb: 3 }}
                    >
                      {isLoading
                        ? 'Đang xử lý...'
                        : isLogin
                          ? 'Đăng nhập'
                          : 'Tạo tài khoản'
                      }
                    </PrimaryButton>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                  >
                    <Box display="flex" justifyContent="center" mt={2}>
                      <Button
                        onClick={() => setIsLogin(!isLogin)}
                        sx={{
                          color: 'rgba(255, 255, 255, 0.8)',
                          textTransform: 'none',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: 'white'
                          }
                        }}
                        startIcon={<PersonAdd />}
                      >
                        {isLogin
                          ? 'Chưa có tài khoản? Đăng ký ngay'
                          : 'Đã có tài khoản? Đăng nhập'
                        }
                      </Button>
                    </Box>
                  </motion.div>
                </Box>
              </motion.div>
            </CardContent>
          </GlassCard>
        </motion.div>
      </Container>
    </LoginContainer>
  );
};

export default Login;
