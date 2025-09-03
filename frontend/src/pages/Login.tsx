import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Avatar,
  InputAdornment,
  IconButton,
  Divider,
  Chip,
  useMediaQuery,
  useTheme,
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
  School,
  Psychology,
  AutoStories,
  EmojiObjects,
  Analytics,
  Biotech,
  AccountBalance,
  Science,
  MenuBook,
  Calculate,
  Code,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

// Container chính với hiệu ứng cao cấp
const LoginContainer = styled(Box)`
  min-height: 100vh;
  max-height: 100vh;
  width: 100vw;
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
  background: linear-gradient(135deg, 
    #0f172a 0%, 
    #1e293b 15%, 
    #334155 30%, 
    #475569 45%, 
    #64748b 60%,
    #334155 75%,
    #1e293b 90%,
    #0f172a 100%
  );
  background-size: 400% 400%;
  animation: gradientFlow 20s ease infinite;

  @keyframes gradientFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 90% 10%, rgba(139, 92, 246, 0.25) 0%, transparent 50%),
      radial-gradient(circle at 90% 90%, rgba(168, 85, 247, 0.2) 0%, transparent 50%),
      radial-gradient(circle at 10% 90%, rgba(34, 197, 94, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 60%);
    animation: auraFloat 25s ease-in-out infinite;
  }

  @keyframes auraFloat {
    0%, 100% { 
      transform: scale(1) rotate(0deg);
      opacity: 0.7;
    }
    25% { 
      transform: scale(1.05) rotate(90deg);
      opacity: 0.5;
    }
    50% { 
      transform: scale(0.95) rotate(180deg);
      opacity: 0.9;
    }
    75% { 
      transform: scale(1.02) rotate(270deg);
      opacity: 0.6;
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.4;
  }

  @media (max-width: 1024px) {
    overflow-y: auto;
    max-height: none;
  }
`;

// Hiệu ứng góc với các biểu tượng giáo dục nghệ thuật
const CornerDecor = styled(Box)<{ position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }>`
  position: absolute;
  z-index: 2;
  ${props => {
    switch (props.position) {
      case 'top-left':
        return 'top: 50px; left: 50px;';
      case 'top-right':
        return 'top: 50px; right: 50px;';
      case 'bottom-left':
        return 'bottom: 50px; left: 50px;';
      case 'bottom-right':
        return 'bottom: 50px; right: 50px;';
    }
  }}
  
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  
  @media (max-width: 768px) {
    ${props => {
      switch (props.position) {
        case 'top-left':
          return 'top: 25px; left: 25px;';
        case 'top-right':
          return 'top: 25px; right: 25px;';
        case 'bottom-left':
          return 'bottom: 25px; left: 25px;';
        case 'bottom-right':
          return 'bottom: 25px; right: 25px;';
      }
    }}
    gap: 20px;
  }
`;

const FloatingEducationIcon = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border: 3px solid rgba(255, 255, 255, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.9);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 10px 20px rgba(0, 0, 0, 0.1),
    inset 0 2px 0 rgba(255, 255, 255, 0.3),
    inset 0 -2px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg,
      transparent,
      rgba(59, 130, 246, 0.15),
      transparent,
      rgba(139, 92, 246, 0.15),
      transparent,
      rgba(34, 197, 94, 0.1),
      transparent
    );
    animation: educationIconRotate 12s linear infinite;
  }

  @keyframes educationIconRotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60%;
    height: 60%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 70%
    );
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: pulse 3s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
  }

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
  }
`;

const MainContent = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  padding: 0 1.5rem;
  position: relative;
  z-index: 10;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    height: auto;
    min-height: 100vh;
    overflow-y: auto;
    padding: 1rem;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const ContentWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  height: 100%;
  gap: 2.5rem;
  
  @media (max-width: 1200px) {
    gap: 2rem;
    max-width: 1000px;
  }
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    height: auto;
    padding: 1.5rem 0;
  }

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 1rem 0;
  }
`;

const LeftPanel = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 1rem;
  color: white;
  max-width: 480px;
  height: 100%;

  @media (max-width: 1024px) {
    max-width: 100%;
    padding: 0.5rem;
    text-align: center;
    align-items: center;
    order: 2;
    height: auto;
  }
`;

const RightPanel = styled(Box)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  max-width: 400px;
  height: 100%;

  @media (max-width: 1024px) {
    max-width: 100%;
    width: 100%;
    order: 1;
    height: auto;
    padding: 0.5rem;
  }
`;

const GlassCard = styled(Card)`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.15);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.2),
    0 10px 25px rgba(0, 0, 0, 0.15),
    inset 0 2px 0 rgba(255, 255, 255, 0.2),
    inset 0 -2px 0 rgba(0, 0, 0, 0.1);
  overflow: visible;
  position: relative;
  width: 100%;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Tối ưu chiều cao cho laptop - đăng ký */
  @media (min-width: 1025px) {
    max-height: 90vh;
    overflow-y: auto;
    
    /* Custom scrollbar cho laptop */
    &::-webkit-scrollbar {
      width: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 3px;
      
      &:hover {
        background: rgba(255, 255, 255, 0.5);
      }
    }
  }
  
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
      rgba(255, 255, 255, 0.15),
      transparent
    );
    transition: left 1.2s ease;
    z-index: 1;
  }

  &:hover::before {
    left: 100%;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg,
      transparent,
      rgba(59, 130, 246, 0.03),
      transparent,
      rgba(139, 92, 246, 0.03),
      transparent,
      rgba(34, 197, 94, 0.02),
      transparent
    );
    animation: cardRotate 30s linear infinite;
    z-index: 0;
  }

  @keyframes cardRotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Hover effect mượt mà */
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.25),
      0 15px 30px rgba(0, 0, 0, 0.2),
      inset 0 2px 0 rgba(255, 255, 255, 0.25);
  }
`;

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    margin: 6px 0;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      opacity: 0;
      transition: opacity 0.4s ease;
      z-index: 1;
    }
    
    &:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-3px);
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.2);
      
      &::before {
        opacity: 1;
      }
    }
    
    &.Mui-focused {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-3px);
      box-shadow: 0 25px 55px rgba(0, 0, 0, 0.25);
    }
    
    fieldset {
      border-color: rgba(255, 255, 255, 0.3);
      transition: all 0.4s ease;
      border-width: 2px;
    }
    
    &:hover fieldset {
      border-color: rgba(255, 255, 255, 0.6);
      border-width: 3px;
    }
    
    &.Mui-focused fieldset {
      border-color: rgba(59, 130, 246, 0.8);
      border-width: 3px;
    }
  }
  
  .MuiInputLabel-root {
    color: rgba(255, 255, 255, 0.8);
    font-weight: 600;
    z-index: 2;
    position: relative;
    
    &.Mui-focused {
      color: rgba(59, 130, 246, 1);
    }
  }
  
  .MuiOutlinedInput-input {
    color: white;
    font-weight: 500;
    z-index: 2;
    position: relative;
  }
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 35%, #8b5cf6 70%, #a855f7 100%);
  border-radius: 16px;
  padding: 14px 32px;
  font-weight: 700;
  font-size: 15px;
  text-transform: none;
  color: white;
  border: none;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 15px 35px rgba(59, 130, 246, 0.4),
    0 8px 20px rgba(0, 0, 0, 0.2),
    inset 0 2px 0 rgba(255, 255, 255, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.8s ease;
  }
  
  &:hover {
    background: linear-gradient(135deg, #2563eb 0%, #4f46e5 35%, #7c3aed 70%, #9333ea 100%);
    transform: translateY(-4px) scale(1.02);
    box-shadow: 
      0 30px 70px rgba(59, 130, 246, 0.5),
      0 15px 35px rgba(0, 0, 0, 0.25);
      
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-2px) scale(1.01);
  }
  
  &:disabled {
    background: rgba(255, 255, 255, 0.3);
    color: rgba(255, 255, 255, 0.6);
    transform: none;
    box-shadow: none;
  }
`;

// Thu nhỏ Social Button để tạo thêm không gian
const SocialButton = styled(IconButton)`
  background: rgba(255, 255, 255, 0.12);
  border: 2px solid rgba(255, 255, 255, 0.25);
  color: white;
  width: 45px;
  height: 45px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  margin: 0 3px;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    transition: all 0.5s ease;
    transform: translate(-50%, -50%);
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px) scale(1.08);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.25);
    border-color: rgba(255, 255, 255, 0.4);
    
    &::before {
      width: 150%;
      height: 150%;
    }
  }

  @media (max-width: 768px) {
    width: 42px;
    height: 42px;
    margin: 0 2px;
  }
`;

const EducationFeature = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.15);
  margin: 0.3rem 0;
  transition: all 0.4s ease;
  
  &:hover {
    transform: translateY(-2px) translateX(2px);
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    border-color: rgba(59, 130, 246, 0.3);
  }

  @media (max-width: 768px) {
    padding: 0.6rem;
    gap: 0.6rem;
    margin: 0.2rem 0;
  }
`;

const FeatureIcon = styled(Box)`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(59, 130, 246, 0.3);
  flex-shrink: 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg,
      transparent,
      rgba(59, 130, 246, 0.2),
      transparent
    );
    animation: featureIconRotate 8s linear infinite;
  }

  @keyframes featureIconRotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  React.useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Handle forgot password
    if (isForgotPassword) {
      if (!forgotPasswordEmail) {
        setError('Vui lòng nhập địa chỉ email để khôi phục tài khoản');
        return;
      }
      setIsLoading(true);
      // Simulate sending email
      setTimeout(() => {
        setForgotPasswordSent(true);
        setIsLoading(false);
        // Here you would normally send the actual email
        console.log(`Reset password email sent to: ${forgotPasswordEmail}`);
      }, 2000);
      return;
    }

    // Regular login/register validation
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ thông tin để tiếp tục');
      return;
    }

    // Registration specific validation
    if (!isLogin) {
      if (!fullName.trim()) {
        setError('Vui lòng nhập họ và tên');
        return;
      }
      if (!confirmPassword) {
        setError('Vui lòng xác nhận mật khẩu');
        return;
      }
      if (password !== confirmPassword) {
        setError('Mật khẩu xác nhận không khớp');
        return;
      }
      if (password.length < 6) {
        setError('Mật khẩu phải có ít nhất 6 ký tự');
        return;
      }
    }

    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('authToken', 'demo-token');
      setIsLoading(false);
      navigate('/');
    }, 2000);
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setIsForgotPassword(false);
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
    setForgotPasswordEmail('');
    setForgotPasswordSent(false);
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
    setIsLogin(true);
    setError('');
    setForgotPasswordEmail('');
    setForgotPasswordSent(false);
  };

  const handleBackToLogin = () => {
    setIsForgotPassword(false);
    setIsLogin(true);
    setError('');
    setForgotPasswordEmail('');
    setForgotPasswordSent(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cornerIcons = [
    { icon: School, position: 'top-left' as const, delay: 0 },
    { icon: Science, position: 'top-right' as const, delay: 0.3 },
    { icon: MenuBook, position: 'bottom-left' as const, delay: 0.6 },
    { icon: Calculate, position: 'bottom-right' as const, delay: 0.9 },
  ];

  // Component PasswordInput tối ưu để tránh lỗi icon trùng
  const PasswordField = styled(StyledTextField)`
    .MuiOutlinedInput-adornedEnd {
      padding-right: 14px;
    }
    
    .MuiInputAdornment-positionEnd {
      margin-left: 8px;
    }
    
    /* Đảm bảo icon mắt không bị trùng lặp */
    .MuiInputAdornment-root:last-of-type {
      position: relative;
      z-index: 10;
    }
    
    /* Tối ưu cho layout đăng ký */
    .MuiOutlinedInput-root {
      margin: 4px 0;
      
      @media (min-width: 1025px) {
        margin: 6px 0;
      }
    }
  `;

  // Component PasswordInput để tránh trùng lặp code và icon
  const PasswordInput = React.memo(({
    label,
    value,
    onChange,
    showPassword,
    onToggleShow,
    ...props
  }: {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showPassword: boolean;
    onToggleShow: () => void;
    [key: string]: any;
  }) => (
    <PasswordField
      margin="normal"
      required
      fullWidth
      label={label}
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      disabled={isLoading}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LockOutlined sx={{ color: 'rgba(255, 255, 255, 0.7)', zIndex: 2, fontSize: 20 }} />
          </InputAdornment>
        ),
        endAdornment: value && (
          <InputAdornment position="end">
            <IconButton
              onClick={onToggleShow}
              edge="end"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                zIndex: 10,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              {showPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  ));

  return (
    <LoginContainer>
      {/* Hiệu ứng góc với biểu tượng giáo dục nghệ thuật */}
      {cornerIcons.map(({ icon: Icon, position, delay }, index) => (
        <CornerDecor key={index} position={position}>
          <motion.div
            initial={{ scale: 0, rotate: -270, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{
              delay: delay,
              duration: 1.5,
              type: "spring",
              stiffness: 120,
              damping: 15
            }}
          >
            <FloatingEducationIcon
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 5 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Icon sx={{ fontSize: 45, zIndex: 3, position: 'relative' }} />
            </FloatingEducationIcon>
          </motion.div>
        </CornerDecor>
      ))}

      <MainContent>
        <ContentWrapper
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {!isMobile && (
            <LeftPanel>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 900,
                    background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 2.5,
                    fontSize: { xs: '2.5rem', md: '3.2rem', lg: '3.8rem' },
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                    textAlign: 'left'
                  }}
                >
                  Education
                  <br />
                  Analytics
                  <br />
                  <span style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Platform
                  </span>
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.85)',
                    mb: 3,
                    fontWeight: 400,
                    lineHeight: 1.5,
                    fontSize: '1.3rem',
                    textAlign: 'left'
                  }}
                >
                  Nền tảng phân tích thông minh cho giáo dục hiện đại
                </Typography>
              </motion.div>

              <Box sx={{ width: '100%', maxWidth: 500 }}>
                <motion.div variants={itemVariants}>
                  <EducationFeature sx={{ padding: '1.2rem', gap: '1rem', margin: '0.6rem 0' }}>
                    <FeatureIcon sx={{ width: '55px', height: '55px' }}>
                      <Analytics sx={{ fontSize: 32, color: '#3b82f6', zIndex: 3, position: 'relative' }} />
                    </FeatureIcon>
                    <Box>
                      <Typography variant="h6" sx={{ color: 'white', mb: 0.5, fontWeight: 700, fontSize: '1.2rem' }}>
                        Phân tích học tập AI
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.5, fontSize: '1rem' }}>
                        Theo dõi và phân tích tiến độ học tập với AI tiên tiến
                      </Typography>
                    </Box>
                  </EducationFeature>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <EducationFeature sx={{ padding: '1.2rem', gap: '1rem', margin: '0.6rem 0' }}>
                    <FeatureIcon sx={{ width: '55px', height: '55px' }}>
                      <Biotech sx={{ fontSize: 32, color: '#8b5cf6', zIndex: 3, position: 'relative' }} />
                    </FeatureIcon>
                    <Box>
                      <Typography variant="h6" sx={{ color: 'white', mb: 0.5, fontWeight: 700, fontSize: '1.2rem' }}>
                        Nghiên cứu khoa học
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.5, fontSize: '1rem' }}>
                        Công cụ hỗ trợ nghiên cứu và phát triển kiến thức
                      </Typography>
                    </Box>
                  </EducationFeature>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <EducationFeature sx={{ padding: '1.2rem', gap: '1rem', margin: '0.6rem 0' }}>
                    <FeatureIcon sx={{ width: '55px', height: '55px' }}>
                      <AccountBalance sx={{ fontSize: 32, color: '#22c55e', zIndex: 3, position: 'relative' }} />
                    </FeatureIcon>
                    <Box>
                      <Typography variant="h6" sx={{ color: 'white', mb: 0.5, fontWeight: 700, fontSize: '1.2rem' }}>
                        Quản lý thể chế
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.5, fontSize: '1rem' }}>
                        Hệ thống quản lý toàn diện cho cơ sở giáo dục
                      </Typography>
                    </Box>
                  </EducationFeature>
                </motion.div>
              </Box>
            </LeftPanel>
          )}

          <RightPanel>
            <motion.div variants={itemVariants} style={{ width: '100%' }}>
              <GlassCard>
                <CardContent sx={{
                  p: { xs: 2.5, md: 3 },
                  position: 'relative',
                  zIndex: 2,
                  minHeight: {
                    xs: 'auto',
                    md: isForgotPassword ? '420px' : (!isLogin ? '520px' : '480px')
                  },
                  maxHeight: { xs: 'none', md: '90vh' },
                  overflowY: { xs: 'visible', md: 'auto' },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: !isLogin && !isMobile ? 'flex-start' : 'center',
                  paddingTop: !isLogin && !isMobile ? 1.5 : 3
                }}>
                  {/* Header - Thu nhỏ cho đăng ký */}
                  <motion.div variants={itemVariants}>
                    <Box display="flex" flexDirection="column" alignItems="center" mb={!isLogin ? 1.2 : 2.5}>
                      <motion.div
                        whileHover={{ scale: 1.08, rotate: 12 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Avatar
                          sx={{
                            m: 0.3,
                            bgcolor: isForgotPassword ? 'rgba(168, 85, 247, 0.2)' :
                                     isLogin ? 'rgba(59, 130, 246, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                            width: { xs: 70, md: !isLogin ? 60 : 80 },
                            height: { xs: 70, md: !isLogin ? 60 : 80 },
                            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.25)',
                            border: '3px solid rgba(255, 255, 255, 0.3)'
                          }}
                        >
                          {isForgotPassword ? (
                            <LockOutlined sx={{ fontSize: { xs: 32, md: !isLogin ? 28 : 40 }, color: 'white' }} />
                          ) : isLogin ? (
                            <LockOutlined sx={{ fontSize: { xs: 32, md: !isLogin ? 28 : 40 }, color: 'white' }} />
                          ) : (
                            <PersonAdd sx={{ fontSize: { xs: 32, md: !isLogin ? 28 : 40 }, color: 'white' }} />
                          )}
                        </Avatar>
                      </motion.div>

                      <Typography
                        variant="h4"
                        sx={{
                          color: 'white',
                          fontWeight: 800,
                          textAlign: 'center',
                          background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          mb: !isLogin ? 0.3 : 1,
                          fontSize: { xs: '1.4rem', md: !isLogin ? '1.5rem' : '1.8rem' },
                          letterSpacing: '-0.02em'
                        }}
                      >
                        {isForgotPassword ? 'Khôi phục tài khoản' :
                         isLogin ? 'Chào mừng trở lại' : 'Tạo tài khoản mới'}
                      </Typography>

                      {isForgotPassword && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            textAlign: 'center',
                            fontSize: '0.9rem',
                            lineHeight: 1.5,
                            mb: 1,
                            maxWidth: '300px'
                          }}
                        >
                          Không thể truy cập tài khoản của bạn?
                          <br />
                          Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn một liên kết để khôi phục tài khoản của bạn.
                        </Typography>
                      )}
                    </Box>
                  </motion.div>

                  {/* Social Login - Thu nhỏ cho đăng ký */}
                  {!isForgotPassword && (
                    <motion.div variants={itemVariants}>
                      <Box display="flex" justifyContent="center" gap={0.5} mb={!isLogin ? 1.2 : 2}>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <SocialButton sx={{ width: !isLogin ? 35 : 45, height: !isLogin ? 35 : 45 }}>
                            <Google sx={{ fontSize: !isLogin ? 16 : 20 }} />
                          </SocialButton>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <SocialButton sx={{ width: !isLogin ? 35 : 45, height: !isLogin ? 35 : 45 }}>
                            <Facebook sx={{ fontSize: !isLogin ? 16 : 20 }} />
                          </SocialButton>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <SocialButton sx={{ width: !isLogin ? 35 : 45, height: !isLogin ? 35 : 45 }}>
                            <GitHub sx={{ fontSize: !isLogin ? 16 : 20 }} />
                          </SocialButton>
                        </motion.div>
                      </Box>

                      <Box display="flex" alignItems="center" mb={!isLogin ? 1.5 : 2.5}>
                        <Divider sx={{ flex: 1, bgcolor: 'rgba(255, 255, 255, 0.3)', height: '1px' }} />
                        <Chip
                          label={isLogin ? "HOẶC ĐĂNG NHẬP BẰNG EMAIL" : "HOẶC ĐĂNG KÝ BẰNG EMAIL"}
                          sx={{
                            mx: 1.2,
                            bgcolor: 'rgba(255, 255, 255, 0.12)',
                            color: 'rgba(255, 255, 255, 0.9)',
                            border: '1px solid rgba(255, 255, 255, 0.25)',
                            fontWeight: 600,
                            backdropFilter: 'blur(15px)',
                            fontSize: !isLogin ? '0.6rem' : '0.7rem',
                            height: !isLogin ? '22px' : '28px',
                            '& .MuiChip-label': {
                              padding: !isLogin ? '0 6px' : '0 10px'
                            }
                          }}
                        />
                        <Divider sx={{ flex: 1, bgcolor: 'rgba(255, 255, 255, 0.3)', height: '1px' }} />
                      </Box>
                    </motion.div>
                  )}

                  {/* Form */}
                  <motion.div variants={itemVariants}>
                    <Box component="form" onSubmit={handleSubmit}>
                      <AnimatePresence mode="wait">
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.25 }}
                          >
                            <Alert
                              severity="error"
                              sx={{
                                mb: 1.2,
                                bgcolor: 'rgba(239, 68, 68, 0.12)',
                                color: 'white',
                                border: '2px solid rgba(239, 68, 68, 0.3)',
                                borderRadius: 3,
                                backdropFilter: 'blur(15px)',
                                fontWeight: 600,
                                fontSize: '0.8rem',
                                '& .MuiAlert-icon': { color: '#ef4444' }
                              }}
                            >
                              {error}
                            </Alert>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Success message for forgot password */}
                      <AnimatePresence mode="wait">
                        {forgotPasswordSent && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.25 }}
                          >
                            <Alert
                              severity="success"
                              sx={{
                                mb: 1.2,
                                bgcolor: 'rgba(34, 197, 94, 0.12)',
                                color: 'white',
                                border: '2px solid rgba(34, 197, 94, 0.3)',
                                borderRadius: 3,
                                backdropFilter: 'blur(15px)',
                                fontWeight: 600,
                                fontSize: '0.8rem',
                                '& .MuiAlert-icon': { color: '#22c55e' }
                              }}
                            >
                              Liên kết khôi phục đã được gửi đến email của bạn! Vui lòng kiểm tra hộp thư.
                            </Alert>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Forgot Password Form */}
                      {isForgotPassword ? (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <StyledTextField
                            margin="normal"
                            required
                            fullWidth
                            id="forgotEmail"
                            label="Địa chỉ email"
                            name="forgotEmail"
                            autoComplete="email"
                            value={forgotPasswordEmail}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForgotPasswordEmail(e.target.value)}
                            disabled={isLoading || forgotPasswordSent}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Email sx={{ color: 'rgba(255, 255, 255, 0.7)', zIndex: 2, fontSize: 20 }} />
                                </InputAdornment>
                              ),
                            }}
                            sx={{ mb: 3 }}
                          />

                          <PrimaryButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={isLoading || forgotPasswordSent}
                            startIcon={
                              isLoading ? (
                                <CircularProgress size={20} color="inherit" />
                              ) : (
                                <Email sx={{ fontSize: 20 }} />
                              )
                            }
                            sx={{
                              mb: 3,
                              padding: { xs: '14px 28px', md: '16px 32px' },
                              fontSize: { xs: '1rem', md: '1.1rem' }
                            }}
                          >
                            {isLoading ? 'Đang gửi...' : 'Gửi liên kết khôi phục'}
                          </PrimaryButton>

                          <Box display="flex" justifyContent="center">
                            <Button
                              onClick={handleBackToLogin}
                              sx={{
                                color: 'rgba(255, 255, 255, 0.85)',
                                textTransform: 'none',
                                fontWeight: 600,
                                borderRadius: 3,
                                px: 3,
                                py: 1.5,
                                fontSize: { xs: '0.9rem', md: '1rem' },
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                                  color: 'white',
                                  transform: 'translateY(-1px)'
                                },
                                transition: 'all 0.3s ease'
                              }}
                              startIcon={<LoginOutlined sx={{ fontSize: 20 }} />}
                            >
                              Quay lại đăng nhập
                            </Button>
                          </Box>
                        </motion.div>
                      ) : (
                        <>
                          {/* Registration Name Field */}
                          <AnimatePresence mode="wait">
                            {!isLogin && (
                              <motion.div
                                variants={itemVariants}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                              >
                                <StyledTextField
                                  margin="normal"
                                  required
                                  fullWidth
                                  id="fullName"
                                  label="Họ và tên"
                                  name="fullName"
                                  autoComplete="name"
                                  value={fullName}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                                  disabled={isLoading}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <PersonAdd sx={{ color: 'rgba(255, 255, 255, 0.7)', zIndex: 2, fontSize: 20 }} />
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{ mb: 0.8 }}
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Email Field */}
                          <motion.div variants={itemVariants}>
                            <StyledTextField
                              margin="normal"
                              required
                              fullWidth
                              id="email"
                              label="Địa chỉ Email"
                              name="email"
                              autoComplete="email"
                              value={email}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                              disabled={isLoading}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Email sx={{ color: 'rgba(255, 255, 255, 0.7)', zIndex: 2, fontSize: 20 }} />
                                  </InputAdornment>
                                ),
                              }}
                              sx={{ mb: !isLogin ? 0.8 : 1.5 }}
                            />
                          </motion.div>

                          {/* Password Field - Sử dụng component mới để tránh lỗi icon trùng */}
                          <motion.div variants={itemVariants}>
                            <PasswordInput
                              label="Mật khẩu"
                              value={password}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                              showPassword={showPassword}
                              onToggleShow={() => setShowPassword(!showPassword)}
                              name="password"
                              id="password"
                              autoComplete="current-password"
                              sx={{ mb: !isLogin ? 0.8 : 1.8 }}
                            />
                          </motion.div>

                          {/* Confirm Password Field */}
                          <AnimatePresence mode="wait">
                            {!isLogin && (
                              <motion.div
                                variants={itemVariants}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                              >
                                <PasswordInput
                                  label="Xác nhận mật khẩu"
                                  value={confirmPassword}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                                  showPassword={showConfirmPassword}
                                  onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
                                  name="confirmPassword"
                                  id="confirmPassword"
                                  sx={{ mb: 1.2 }}
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Submit Button */}
                          <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <PrimaryButton
                              type="submit"
                              fullWidth
                              variant="contained"
                              disabled={isLoading}
                              startIcon={
                                isLoading ? (
                                  <CircularProgress size={20} color="inherit" />
                                ) : isLogin ? (
                                  <LoginOutlined sx={{ fontSize: 20 }} />
                                ) : (
                                  <PersonAdd sx={{ fontSize: 20 }} />
                                )
                              }
                              sx={{
                                mb: 1.2,
                                padding: { xs: '12px 24px', md: !isLogin ? '12px 24px' : '16px 32px' },
                                fontSize: { xs: '0.95rem', md: !isLogin ? '0.95rem' : '1.1rem' }
                              }}
                            >
                              {isLoading
                                ? 'Đang xử lý...'
                                : isLogin
                                  ? 'Đăng nhập vào hệ thống'
                                  : 'Tạo tài khoản mới'
                              }
                            </PrimaryButton>
                          </motion.div>

                          {/* Toggle Mode Button */}
                          <motion.div variants={itemVariants}>
                            <Box display="flex" justifyContent="center" mt={0}>
                              <Button
                                onClick={handleToggleMode}
                                sx={{
                                  color: 'rgba(255, 255, 255, 0.85)',
                                  textTransform: 'none',
                                  fontWeight: 600,
                                  borderRadius: 3,
                                  px: 1.2,
                                  py: 0.8,
                                  fontSize: { xs: '0.75rem', md: !isLogin ? '0.8rem' : '0.95rem' },
                                  '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                                    color: 'white',
                                    transform: 'translateY(-1px)'
                                  },
                                  transition: 'all 0.3s ease'
                                }}
                                startIcon={isLogin ? <PersonAdd sx={{ fontSize: 16 }} /> : <LoginOutlined sx={{ fontSize: 16 }} />}
                              >
                                {isLogin
                                  ? 'Chưa có tài khoản? Đăng ký ngay'
                                  : 'Đã có tài khoản? Đăng nhập ngay'
                                }
                              </Button>
                            </Box>
                          </motion.div>

                          {/* Forgot Password Link - Only show on login */}
                          {isLogin && (
                            <motion.div variants={itemVariants}>
                              <Box display="flex" justifyContent="center" mt={0.5}>
                                <Button
                                  onClick={handleForgotPassword}
                                  sx={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    fontSize: { xs: '0.75rem', md: '0.8rem' },
                                    '&:hover': {
                                      color: 'rgba(59, 130, 246, 0.8)',
                                      backgroundColor: 'transparent'
                                    }
                                  }}
                                >
                                  Quên mật khẩu?
                                </Button>
                              </Box>
                            </motion.div>
                          )}
                        </>
                      )}
                    </Box>
                  </motion.div>
                </CardContent>
              </GlassCard>
            </motion.div>
          </RightPanel>
        </ContentWrapper>
      </MainContent>
    </LoginContainer>
  );
};

export default Login;

