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
  width: 100vw;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
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
  padding: 1rem;
  position: relative;
  z-index: 10;
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 1024px) {
    height: auto;
    min-height: 100vh;
    overflow-y: auto;
    padding: 1rem 0.5rem;
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
  max-width: 1400px;
  height: 100%;
  gap: 2rem;
  
  @media (max-width: 1400px) {
    gap: 1.5rem;
    max-width: 1200px;
  }
  
  @media (max-width: 1200px) {
    gap: 1rem;
    max-width: 1000px;
  }
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    height: auto;
    padding: 2rem 0;
  }

  @media (max-width: 768px) {
    gap: 1.5rem;
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
  max-width: 500px;
  height: 100%;

  @media (max-width: 1024px) {
    max-width: 100%;
    padding: 1rem;
    text-align: center;
    align-items: center;
    order: 2;
    height: auto;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const RightPanel = styled(Box)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  max-width: 420px;
  height: 100%;

  @media (max-width: 1024px) {
    max-width: 100%;
    width: 100%;
    order: 1;
    height: auto;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const GlassCard = styled(Card)`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-radius: 24px;
  border: 2px solid rgba(255, 255, 255, 0.15);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.2),
    0 10px 25px rgba(0, 0, 0, 0.15),
    inset 0 2px 0 rgba(255, 255, 255, 0.2),
    inset 0 -2px 0 rgba(0, 0, 0, 0.1);
  overflow: visible;
  position: relative;
  width: 100%;
  max-height: 80vh;
  
  @media (max-width: 1024px) {
    max-height: none;
    border-radius: 20px;
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
`;

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    margin: 12px 0;
    
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
    font-size: 1.1rem;
    
    &.Mui-focused {
      color: rgba(59, 130, 246, 1);
    }
  }
  
  .MuiOutlinedInput-input {
    color: white;
    font-weight: 500;
    z-index: 2;
    position: relative;
    font-size: 1.1rem;
  }
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 35%, #8b5cf6 70%, #a855f7 100%);
  border-radius: 24px;
  padding: 22px 45px;
  font-weight: 800;
  font-size: 17px;
  text-transform: none;
  color: white;
  border: none;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 20px 45px rgba(59, 130, 246, 0.4),
    0 10px 25px rgba(0, 0, 0, 0.2),
    inset 0 3px 0 rgba(255, 255, 255, 0.3);
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

const SocialButton = styled(IconButton)`
  background: rgba(255, 255, 255, 0.12);
  border: 2px solid rgba(255, 255, 255, 0.25);
  color: white;
  width: 75px;
  height: 75px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  
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
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.25);
    border-color: rgba(255, 255, 255, 0.4);
    
    &::before {
      width: 150%;
      height: 150%;
    }
  }
`;

const EducationFeature = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.2rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.15);
  margin: 0.6rem 0;
  transition: all 0.4s ease;
  
  &:hover {
    transform: translateY(-2px) translateX(2px);
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
    border-color: rgba(59, 130, 246, 0.3);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
    margin: 0.5rem 0;
  }
`;

const FeatureIcon = styled(Box)`
  width: 60px;
  height: 60px;
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
    width: 50px;
    height: 50px;
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

    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ thông tin để tiếp tục');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('authToken', 'demo-token');
      setIsLoading(false);
      navigate('/');
    }, 2000);
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
                    mb: 2,
                    fontSize: { xs: '2rem', md: '2.8rem', lg: '3.2rem' },
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
                  variant="h5"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.85)',
                    mb: 3,
                    fontWeight: 400,
                    lineHeight: 1.5,
                    fontSize: '1.3rem',
                    textAlign: 'left'
                  }}
                >
                  Nền tảng phân tích thông minh cho giáo dục hiện đại,
                  nơi công nghệ gặp gỡ tri thức
                </Typography>
              </motion.div>

              <Box sx={{ width: '100%', maxWidth: 500 }}>
                <motion.div variants={itemVariants}>
                  <EducationFeature>
                    <FeatureIcon>
                      <Analytics sx={{ fontSize: 40, color: '#3b82f6', zIndex: 3, position: 'relative' }} />
                    </FeatureIcon>
                    <Box>
                      <Typography variant="h6" sx={{ color: 'white', mb: 1, fontWeight: 700 }}>
                        Phân tích học tập AI
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                        Theo dõi và phân tích tiến độ học tập với AI tiên tiến
                      </Typography>
                    </Box>
                  </EducationFeature>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <EducationFeature>
                    <FeatureIcon>
                      <Biotech sx={{ fontSize: 40, color: '#8b5cf6', zIndex: 3, position: 'relative' }} />
                    </FeatureIcon>
                    <Box>
                      <Typography variant="h6" sx={{ color: 'white', mb: 1, fontWeight: 700 }}>
                        Nghiên cứu khoa học
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                        Công cụ hỗ trợ nghiên cứu và phát triển kiến thức
                      </Typography>
                    </Box>
                  </EducationFeature>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <EducationFeature>
                    <FeatureIcon>
                      <AccountBalance sx={{ fontSize: 40, color: '#22c55e', zIndex: 3, position: 'relative' }} />
                    </FeatureIcon>
                    <Box>
                      <Typography variant="h6" sx={{ color: 'white', mb: 1, fontWeight: 700 }}>
                        Quản lý thể chế
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, fontSize: '0.95rem' }}>
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
                <CardContent sx={{ p: { xs: 3, md: 3.5 }, position: 'relative', zIndex: 2 }}>
                  {/* Header */}
                  <motion.div variants={itemVariants}>
                    <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 15 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Avatar
                          sx={{
                            m: 0.5,
                            bgcolor: 'rgba(59, 130, 246, 0.2)',
                            width: { xs: 70, md: 80 },
                            height: { xs: 70, md: 80 },
                            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.25)',
                            border: '2px solid rgba(255, 255, 255, 0.3)'
                          }}
                        >
                          <LockOutlined sx={{ fontSize: { xs: 35, md: 40 }, color: 'white' }} />
                        </Avatar>
                      </motion.div>

                      <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                          color: 'white',
                          fontWeight: 900,
                          textAlign: 'center',
                          background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          mb: 0,
                          fontSize: { xs: '1.6rem', md: '2rem' },
                          letterSpacing: '-0.02em'
                        }}
                      >
                        {isLogin ? 'Chào mừng trở lại' : 'Tạo tài khoản mới'}
                      </Typography>
                    </Box>
                  </motion.div>

                  {/* Social Login */}
                  <motion.div variants={itemVariants}>
                    <Box display="flex" justifyContent="center" gap={2} mb={2}>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <SocialButton sx={{ width: 48, height: 48 }}>
                          <Google sx={{ fontSize: 22 }} />
                        </SocialButton>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <SocialButton sx={{ width: 48, height: 48 }}>
                          <Facebook sx={{ fontSize: 22 }} />
                        </SocialButton>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <SocialButton sx={{ width: 48, height: 48 }}>
                          <GitHub sx={{ fontSize: 22 }} />
                        </SocialButton>
                      </motion.div>
                    </Box>

                    <Box display="flex" alignItems="center" mb={2.5}>
                      <Divider sx={{ flex: 1, bgcolor: 'rgba(255, 255, 255, 0.3)', height: '1px' }} />
                      <Chip
                        label="HOẶC ĐĂNG NHẬP BẰNG EMAIL"
                        sx={{
                          mx: 2,
                          bgcolor: 'rgba(255, 255, 255, 0.12)',
                          color: 'rgba(255, 255, 255, 0.9)',
                          border: '1px solid rgba(255, 255, 255, 0.25)',
                          fontWeight: 700,
                          backdropFilter: 'blur(15px)',
                          fontSize: '0.7rem',
                          padding: '3px 1px'
                        }}
                      />
                      <Divider sx={{ flex: 1, bgcolor: 'rgba(255, 255, 255, 0.3)', height: '1px' }} />
                    </Box>
                  </motion.div>

                  {/* Form */}
                  <motion.div variants={itemVariants}>
                    <Box component="form" onSubmit={handleSubmit}>
                      <AnimatePresence mode="wait">
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: -15, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -15, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Alert
                              severity="error"
                              sx={{
                                mb: 2,
                                bgcolor: 'rgba(239, 68, 68, 0.12)',
                                color: 'white',
                                border: '2px solid rgba(239, 68, 68, 0.3)',
                                borderRadius: 4,
                                backdropFilter: 'blur(15px)',
                                fontWeight: 600,
                                fontSize: '0.85rem',
                                '& .MuiAlert-icon': { color: '#ef4444' }
                              }}
                            >
                              {error}
                            </Alert>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.div variants={itemVariants}>
                        <StyledTextField
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Địa chỉ Email của bạn"
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
                          sx={{ mb: 1.5 }}
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
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
                                <LockOutlined sx={{ color: 'rgba(255, 255, 255, 0.7)', zIndex: 2, fontSize: 20 }} />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowPassword(!showPassword)}
                                  edge="end"
                                  sx={{ color: 'rgba(255, 255, 255, 0.7)', zIndex: 2 }}
                                >
                                  {showPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          sx={{ mb: 2.5 }}
                        />
                      </motion.div>

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
                            ) : (
                              <LoginOutlined sx={{ fontSize: 20 }} />
                            )
                          }
                          sx={{
                            mb: 2,
                            padding: { xs: '12px 24px', md: '14px 28px' },
                            fontSize: { xs: '13px', md: '14px' }
                          }}
                        >
                          {isLoading
                            ? 'Đang xử lý, vui lòng chờ...'
                            : isLogin
                              ? 'Đăng nhập vào hệ thống'
                              : 'Tạo tài khoản mới'
                          }
                        </PrimaryButton>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <Box display="flex" justifyContent="center" mt={0.5}>
                          <Button
                            onClick={() => setIsLogin(!isLogin)}
                            sx={{
                              color: 'rgba(255, 255, 255, 0.85)',
                              textTransform: 'none',
                              fontWeight: 600,
                              borderRadius: 4,
                              px: 2.5,
                              py: 1,
                              fontSize: { xs: '0.8rem', md: '0.9rem' },
                              '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                                color: 'white',
                                transform: 'translateY(-2px)'
                              },
                              transition: 'all 0.3s ease'
                            }}
                            startIcon={<PersonAdd sx={{ fontSize: 20 }} />}
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
          </RightPanel>
        </ContentWrapper>
      </MainContent>
    </LoginContainer>
  );
};

export default Login;
