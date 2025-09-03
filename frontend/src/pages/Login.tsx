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
    Analytics,
    Biotech,
    AccountBalance,
    Science,
    MenuBook,
    Calculate,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

/* ====== CONTAINER ====== */
const LoginContainer = styled(Box)`
    min-height: 100vh;
    width: 100vw;
    position: relative;
    overflow-x: hidden;
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
        0% { background-position: 0% 50%;}
        50% { background-position: 100% 50%;}
        100% { background-position: 0% 50%;}
    }

    &::before{
        content:'';
        position:absolute; inset:0;
        background:
                radial-gradient(circle at 10% 20%, rgba(59,130,246,.3) 0%, transparent 50%),
                radial-gradient(circle at 90% 10%, rgba(139,92,246,.25) 0%, transparent 50%),
                radial-gradient(circle at 90% 90%, rgba(168,85,247,.2) 0%, transparent 50%),
                radial-gradient(circle at 10% 90%, rgba(34,197,94,.15) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(236,72,153,.1) 0%, transparent 60%);
        animation: auraFloat 25s ease-in-out infinite;
    }
    @keyframes auraFloat {
        0%,100%{transform:scale(1) rotate(0deg);opacity:.7;}
        25%{transform:scale(1.05) rotate(90deg);opacity:.5;}
        50%{transform:scale(.95) rotate(180deg);opacity:.9;}
        75%{transform:scale(1.02) rotate(270deg);opacity:.6;}
    }
    &::after{
        content:'';
        position:absolute; inset:0;
        background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="g" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23g)"/></svg>');
        opacity:.4;
        pointer-events:none;
    }

    /* Laptop: giữ 100vh, khóa scroll ngoài để tránh "dài" */
    @media (min-width:1024px){
        height:100vh;
        overflow-y:hidden;
        display:flex; align-items:center;
    }
    /* Mobile: cho phép scroll toàn trang */
    @media (max-width:1023px){
        min-height:100vh;
        overflow-y:auto;
        padding:1rem 0;
    }
`;

/* ====== CORNER DECOR ====== */
const CornerDecor = styled(Box)<{ position:'top-left'|'top-right'|'bottom-left'|'bottom-right' }>`
    position:absolute; z-index:2; pointer-events:none;
    ${(p)=>{
        switch(p.position){
            case 'top-left':return 'top:40px;left:40px;';
            case 'top-right':return 'top:40px;right:40px;';
            case 'bottom-left':return 'bottom:40px;left:40px;';
            case 'bottom-right':return 'bottom:40px;right:40px;';
        }
    }}
    @media (max-width:768px){ display:none; }
`;

const FloatingEducationIcon = styled(motion.div)`
    width:90px;height:90px;border-radius:50%;
    background:rgba(255,255,255,.1);
    backdrop-filter:blur(25px); -webkit-backdrop-filter:blur(25px);
    border:3px solid rgba(255,255,255,.25);
    display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.9);
    box-shadow:0 20px 40px rgba(0,0,0,.15),0 10px 20px rgba(0,0,0,.1),inset 0 2px 0 rgba(255,255,255,.3),inset 0 -2px 0 rgba(0,0,0,.1);
    position:relative;overflow:hidden;
    &::before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;
        background:conic-gradient(from 0deg,transparent,rgba(59,130,246,.15),transparent,rgba(139,92,246,.15),transparent,rgba(34,197,94,.1),transparent);
        animation:educationIconRotate 12s linear infinite;}
    @keyframes educationIconRotate{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
`;

/* ====== MAIN AREA ====== */
const MainContent = styled(Box)`
    display:flex; align-items:center; justify-content:center;
    width:100%; padding:0 1.5rem; position:relative; z-index:10; box-sizing:border-box;
    @media (min-width:1024px){ height:100vh; min-height:100vh; overflow:hidden; }
    @media (max-width:1023px){ min-height:100vh; overflow-y:auto; padding:1rem; }
`;

/* Grid 2 cột cân đối trên desktop */
const ContentWrapper = styled(motion.div)`
    width:100%; max-width:1200px;
    display:grid; gap:2.2rem;
    grid-template-columns: 1.1fr 0.9fr;
    align-items:center;

    @media (max-width:1200px) and (min-width:1024px){
        gap:1.8rem; max-width:1000px;
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width:1023px){
        grid-template-columns: 1fr;
        gap:1.2rem; padding:1.2rem 0;
    }
`;

const LeftPanel = styled(Box)`
    min-width:0;
    display:flex; flex-direction:column; align-items:flex-start; justify-content:center;
    padding:1rem; color:white; max-width:520px;
    @media (max-width:1023px){
        max-width:100%; padding:0.5rem; text-align:center; align-items:center; order:2;
    }
`;

const RightPanel = styled(Box)`
    min-width:0;
    display:flex; align-items:center; justify-content:center;
    padding:1rem; max-width:460px; width:100%;
    @media (min-width:1024px){ max-width:460px; min-width:380px; }
    @media (max-width:1023px){ max-width:100%; order:1; height:auto; padding:0.5rem; }
`;

/* ====== CARD / FORM ====== */
const GlassCard = styled(Card)`
    background:rgba(255,255,255,.08);
    backdrop-filter:blur(40px); -webkit-backdrop-filter:blur(40px);
    border-radius:20px; border:2px solid rgba(255,255,255,.15);
    box-shadow:0 20px 40px rgba(0,0,0,.2),0 10px 25px rgba(0,0,0,.15),inset 0 2px 0 rgba(255,255,255,.2),inset 0 -2px 0 rgba(0,0,0,.1);
    overflow:hidden; position:relative; width:100%; transition:all .4s cubic-bezier(.4,0,.2,1);
    &:hover{ transform:translateY(-2px); box-shadow:0 25px 50px rgba(0,0,0,.25),0 15px 30px rgba(0,0,0,.2),inset 0 2px 0 rgba(255,255,255,.25); }
`;

// TextField với animation mượt mà cải tiến
const StyledTextField = styled(TextField)`
    .MuiOutlinedInput-root{
        background:rgba(255,255,255,.1); 
        border-radius:16px; 
        transition:all .4s cubic-bezier(.4,0,.2,1);
        margin:6px 0;
        position: relative;
        overflow: hidden;
        
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
            z-index: 1;
        }
        
        &:hover {
            background:rgba(255,255,255,.15); 
            transform:translateY(-3px); 
            box-shadow:0 20px 45px rgba(0,0,0,.2);
            
            &::before {
                left: 100%;
            }
        }
        
        &.Mui-focused { 
            background:rgba(255,255,255,.2); 
            transform:translateY(-3px); 
            box-shadow:0 25px 55px rgba(0,0,0,.25);
        }
        
        fieldset{ 
            border-color:rgba(255,255,255,.3); 
            border-width:2px; 
            transition: all 0.4s ease;
        }
        
        &:hover fieldset{ 
            border-color:rgba(255,255,255,.6); 
            border-width:3px; 
        }
        
        &.Mui-focused fieldset{ 
            border-color:rgba(59,130,246,.8); 
            border-width:3px; 
        }
        
        /* Styling cho input có icon mắt */
        &.password-field {
            .MuiInputAdornment-positionEnd {
                margin-right: 8px;
            }
        }
    }
    
    .MuiInputLabel-root{ 
        color:rgba(255,255,255,.8); 
        font-weight:600; 
        z-index: 2;
        position: relative;
        
        &.Mui-focused {
            color:rgba(59,130,246,1);
        }
    }
    
    .MuiOutlinedInput-input{ 
        color:white; 
        font-weight:500; 
        z-index: 2;
        position: relative;
    }
`;

// Button với animation mượt mà
const PrimaryButton = styled(Button)`
    background:linear-gradient(135deg,#3b82f6 0%,#6366f1 35%,#8b5cf6 70%,#a855f7 100%);
    border-radius:16px; padding:14px 32px; font-weight:700; font-size:15px; text-transform:none; color:white; border:none; position:relative; overflow:hidden;
    box-shadow:0 15px 35px rgba(59,130,246,.4),0 8px 20px rgba(0,0,0,.2),inset 0 2px 0 rgba(255,255,255,.3);
    transition:all .4s cubic-bezier(.4,0,.2,1);
    
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
    
    &:hover{ 
        background: linear-gradient(135deg, #2563eb 0%, #4f46e5 35%, #7c3aed 70%, #9333ea 100%);
        transform:translateY(-4px) scale(1.02); 
        box-shadow:0 30px 70px rgba(59,130,246,.5),0 15px 35px rgba(0,0,0,.25);
        
        &::before {
            left: 100%;
        }
    }
    
    &:active {
        transform: translateY(-2px) scale(1.01);
    }
    
    &:disabled{ 
        background:rgba(255,255,255,.3); 
        color:rgba(255,255,255,.6); 
        transform: none;
        box-shadow: none;
    }
`;

// Social Button với hiệu ứng cải tiến
const SocialButton = styled(IconButton)`
    background:rgba(255,255,255,.12);
    border:2px solid rgba(255,255,255,.25);
    color:white; width:44px; height:44px; border-radius:50%;
    transition:all .4s cubic-bezier(.4,0,.2,1);
    position: relative;
    overflow: hidden;
    
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
    
    &:hover{ 
        background:rgba(255,255,255,.2); 
        transform:translateY(-3px) scale(1.08); 
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
        border-color: rgba(255, 255, 255, 0.4);
        
        &::before {
            width: 150%;
            height: 150%;
        }
    }
    
    @media (max-width: 768px) {
        width: 42px;
        height: 42px;
    }
`;

/* ====== FEATURE BADGE ====== */
const EducationFeature = styled(Box)`
    display:flex; align-items:center; gap:.8rem; padding:.8rem;
    background:rgba(255,255,255,.08); border-radius:12px; backdrop-filter:blur(20px);
    border:2px solid rgba(255,255,255,.15); margin:.3rem 0; transition:all .4s cubic-bezier(.4,0,.2,1);
    
    &:hover{ 
        transform:translateY(-3px) translateX(3px); 
        background:rgba(255,255,255,.12); 
        box-shadow:0 12px 25px rgba(0,0,0,.2); 
        border-color:rgba(59,130,246,.4); 
    }
`;

const FeatureIcon = styled(Box)`
    width:45px; height:45px; border-radius:50%;
    background:rgba(59,130,246,.15); display:flex; align-items:center; justify-content:center;
    backdrop-filter:blur(15px); border:2px solid rgba(59,130,246,.3);
    transition: all 0.3s ease;
`;

// Custom IconButton cho password field với animation mượt mà
const PasswordToggleButton = styled(IconButton)`
    color: rgba(255, 255, 255, 0.7);
    padding: 8px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 8px;
    
    &:hover {
        color: rgba(255, 255, 255, 0.9);
        background: rgba(255, 255, 255, 0.1);
        transform: scale(1.1);
    }
    
    &:active {
        transform: scale(0.95);
    }
    
    .MuiSvgIcon-root {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;

/* ====== COMPONENT ====== */
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

    // Animation states cho password fields
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg')); // <= 1200
    const isCompact = useMediaQuery('(max-height: 780px)');        // màn hình thấp

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) navigate('/');
    }, [navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (isForgotPassword) {
            if (!forgotPasswordEmail) { setError('Vui lòng nhập địa chỉ email để khôi phục tài khoản'); return; }
            setIsLoading(true);
            setTimeout(() => { setForgotPasswordSent(true); setIsLoading(false); }, 1200);
            return;
        }
        if (!email || !password) { setError('Vui lòng nhập đầy đủ thông tin để tiếp tục'); return; }
        if (!isLogin) {
            if (!fullName.trim()) { setError('Vui lòng nhập họ và tên'); return; }
            if (!confirmPassword) { setError('Vui lòng xác nhận mật khẩu'); return; }
            if (password !== confirmPassword) { setError('Mật khẩu xác nhận không khớp'); return; }
            if (password.length < 6) { setError('Mật khẩu phải có ít nhất 6 ký tự'); return; }
        }
        setIsLoading(true);
        setTimeout(() => { localStorage.setItem('authToken','demo-token'); setIsLoading(false); navigate('/'); }, 1200);
    };

    const handleToggleMode = () => {
        setIsLogin(!isLogin);
        setIsForgotPassword(false);
        setError('');
        setEmail(''); setPassword(''); setConfirmPassword(''); setFullName('');
        setForgotPasswordEmail(''); setForgotPasswordSent(false);
        setShowPassword(false); setShowConfirmPassword(false);
        setPasswordFocused(false); setConfirmPasswordFocused(false);
    };

    const handleForgotPassword = () => {
        setIsForgotPassword(true); setIsLogin(true); setError(''); setForgotPasswordEmail(''); setForgotPasswordSent(false);
        setShowPassword(false); setPasswordFocused(false);
    };

    const handleBackToLogin = () => {
        setIsForgotPassword(false); setIsLogin(true); setError(''); setForgotPasswordEmail(''); setForgotPasswordSent(false);
    };

    const containerVariants = { hidden:{opacity:0}, visible:{opacity:1, transition:{duration:1, staggerChildren:.2}} };
    const itemVariants = { hidden:{opacity:0,y:50}, visible:{opacity:1,y:0,transition:{duration:.6,ease:'easeOut'}} };

    // Animation variants cho password toggle
    const passwordIconVariants = {
        hidden: { opacity: 0, scale: 0.5, rotate: -90 },
        visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } }
    };

    const cornerIcons = [
        { icon: School, position: 'top-left' as const, delay: 0 },
        { icon: Science, position: 'top-right' as const, delay: 0.25 },
        { icon: MenuBook, position: 'bottom-left' as const, delay: 0.5 },
        { icon: Calculate, position: 'bottom-right' as const, delay: 0.75 },
    ];

    return (
        <LoginContainer>
            {/* Decor */}
            {cornerIcons.map(({ icon: Icon, position, delay }, index) => (
                <CornerDecor key={index} position={position}>
                    <motion.div
                        initial={{ scale: 0, rotate: -270, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        transition={{ delay, duration: 1.2, type: 'spring', stiffness: 120, damping: 15 }}
                    >
                        <FloatingEducationIcon
                            animate={{ y: [0, -16, 0], rotate: [0, 8, -8, 0], scale: [1, 1.06, 1] }}
                            transition={{ duration: 4.6 + index * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <Icon sx={{ fontSize: 42, zIndex: 3, position: 'relative' }} />
                        </FloatingEducationIcon>
                    </motion.div>
                </CornerDecor>
            ))}

            <MainContent>
                <ContentWrapper variants={containerVariants} initial="hidden" animate="visible">
                    {!isMobile && (
                        <LeftPanel>
                            <motion.div variants={itemVariants}>
                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontWeight: 900,
                                        background: 'linear-gradient(135deg,#fff 0%,#e2e8f0 50%,#cbd5e1 100%)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        mb: isCompact ? 1.5 : 2.5,
                                        fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
                                        lineHeight: 1.08,
                                        letterSpacing: '-0.03em',
                                        textAlign: 'left'
                                    }}
                                >
                                    Education<br/>Analytics<br/>
                                    <span style={{
                                        background: 'linear-gradient(135deg,#3b82f6 0%,#8b5cf6 100%)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}>Platform</span>
                                </Typography>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: 'rgba(255,255,255,.85)',
                                        mb: isCompact ? 2 : 3,
                                        fontWeight: 400,
                                        lineHeight: 1.5,
                                        fontSize: isCompact ? '1.1rem' : '1.25rem',
                                        textAlign: 'left'
                                    }}
                                >
                                    Nền tảng phân tích thông minh cho giáo dục hiện đại
                                </Typography>
                            </motion.div>

                            <Box sx={{ width: '100%', maxWidth: 520 }}>
                                <motion.div variants={itemVariants}>
                                    <EducationFeature>
                                        <FeatureIcon><Analytics sx={{ fontSize: 30, color: '#3b82f6' }} /></FeatureIcon>
                                        <Box>
                                            <Typography variant="h6" sx={{ color: 'white', mb: .3, fontWeight: 700, fontSize: '1.1rem' }}>
                                                Phân tích học tập AI
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,.8)' }}>
                                                Theo dõi và phân tích tiến độ học tập với AI tiên tiến
                                            </Typography>
                                        </Box>
                                    </EducationFeature>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <EducationFeature>
                                        <FeatureIcon><Biotech sx={{ fontSize: 30, color: '#8b5cf6' }} /></FeatureIcon>
                                        <Box>
                                            <Typography variant="h6" sx={{ color: 'white', mb: .3, fontWeight: 700, fontSize: '1.1rem' }}>
                                                Nghiên cứu khoa học
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,.8)' }}>
                                                Công cụ hỗ trợ nghiên cứu và phát triển kiến thức
                                            </Typography>
                                        </Box>
                                    </EducationFeature>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <EducationFeature>
                                        <FeatureIcon><AccountBalance sx={{ fontSize: 30, color: '#22c55e' }} /></FeatureIcon>
                                        <Box>
                                            <Typography variant="h6" sx={{ color: 'white', mb: .3, fontWeight: 700, fontSize: '1.1rem' }}>
                                                Quản lý thể chế
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,.8)' }}>
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
                                <CardContent
                                    sx={{
                                        p: { xs: 3, md: isCompact ? 3 : 4 },
                                        position: 'relative',
                                        zIndex: 2,
                                        maxHeight: { xs: 'none', md: 'calc(100vh - 160px)' },
                                        overflowY: { xs: 'visible', md: 'auto' },
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        gap: isCompact ? 1.5 : 2
                                    }}
                                >
                                    {/* Header */}
                                    <motion.div variants={itemVariants}>
                                        <Box display="flex" flexDirection="column" alignItems="center" mb={isCompact ? 1.5 : 2.5}>
                                            <motion.div whileHover={{ scale: 1.06, rotate: 10 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                                                <Avatar
                                                    sx={{
                                                        m: .5,
                                                        bgcolor: isForgotPassword ? 'rgba(168,85,247,0.2)' : (isLogin ? 'rgba(59,130,246,0.2)' : 'rgba(34,197,94,0.2)'),
                                                        width: { xs: 68, md: isCompact ? 70 : 80 },
                                                        height:{ xs: 68, md: isCompact ? 70 : 80 },
                                                        boxShadow:'0 15px 35px rgba(0,0,0,.25)',
                                                        border:'3px solid rgba(255,255,255,.3)'
                                                    }}
                                                >
                                                    {isForgotPassword ? <LockOutlined sx={{ fontSize:{ xs:34, md: isCompact ? 34 : 40 }, color:'white' }}/>
                                                        : isLogin ? <LockOutlined sx={{ fontSize:{ xs:34, md: isCompact ? 34 : 40 }, color:'white' }}/>
                                                            : <PersonAdd sx={{ fontSize:{ xs:34, md: isCompact ? 34 : 40 }, color:'white' }}/>}
                                                </Avatar>
                                            </motion.div>

                                            <Typography
                                                variant="h4"
                                                sx={{
                                                    color:'white', fontWeight:800, textAlign:'center',
                                                    background:'linear-gradient(135deg,#fff 0%,#f1f5f9 100%)',
                                                    backgroundClip:'text', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                                                    mb: .5, fontSize:{ xs:'1.5rem', md: isCompact ? '1.6rem':'1.8rem' }, letterSpacing:'-0.02em'
                                                }}
                                            >
                                                {isForgotPassword ? 'Khôi phục tài khoản' : (isLogin ? 'Chào mừng trở lại' : 'Tạo tài khoản mới')}
                                            </Typography>

                                            {isForgotPassword && (
                                                <Typography variant="body2" sx={{ color:'rgba(255,255,255,.75)', textAlign:'center', fontSize:'0.95rem', lineHeight:1.5, maxWidth:320 }}>
                                                    Không thể truy cập? Nhập email để nhận liên kết khôi phục.
                                                </Typography>
                                            )}
                                        </Box>
                                    </motion.div>

                                    {/* Social (ẩn chip khi màn hình thấp) */}
                                    {!isForgotPassword && (
                                        <motion.div variants={itemVariants}>
                                            <Box display="flex" justifyContent="center" gap={1} mb={isCompact ? 1.5 : 2}>
                                                <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}>
                                                    <SocialButton><Google sx={{ fontSize: 20 }}/></SocialButton>
                                                </motion.div>
                                                <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}>
                                                    <SocialButton><Facebook sx={{ fontSize: 20 }}/></SocialButton>
                                                </motion.div>
                                                <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}>
                                                    <SocialButton><GitHub sx={{ fontSize: 20 }}/></SocialButton>
                                                </motion.div>
                                            </Box>

                                            {!isCompact && (
                                                <Box display="flex" alignItems="center" mb={2}>
                                                    <Divider sx={{ flex:1, bgcolor:'rgba(255,255,255,.3)', height:'1px' }}/>
                                                    <Chip
                                                        label={isLogin ? 'HOẶC ĐĂNG NHẬP BẰNG EMAIL' : 'HOẶC ĐĂNG KÝ BẰNG EMAIL'}
                                                        sx={{
                                                            mx:2, bgcolor:'rgba(255,255,255,.12)', color:'rgba(255,255,255,.9)',
                                                            border:'1px solid rgba(255,255,255,.25)', fontWeight:600, backdropFilter:'blur(15px)', fontSize:'.7rem', height:'28px',
                                                            '& .MuiChip-label':{ padding:'0 10px' }
                                                        }}
                                                    />
                                                    <Divider sx={{ flex:1, bgcolor:'rgba(255,255,255,.3)', height:'1px' }}/>
                                                </Box>
                                            )}
                                        </motion.div>
                                    )}

                                    {/* Form */}
                                    <motion.div variants={itemVariants}>
                                        <Box component="form" onSubmit={handleSubmit}>
                                            <AnimatePresence mode="wait">
                                                {error && (
                                                    <motion.div initial={{ opacity:0,y:-10,scale:.95 }} animate={{ opacity:1,y:0,scale:1 }} exit={{ opacity:0,y:-10,scale:.95 }} transition={{ duration:.25 }}>
                                                        <Alert severity="error" sx={{ mb:2, bgcolor:'rgba(239,68,68,.12)', color:'white', border:'2px solid rgba(239,68,68,.3)', borderRadius:3, backdropFilter:'blur(15px)', fontWeight:600, fontSize:'.85rem', '& .MuiAlert-icon':{ color:'#ef4444' } }}>
                                                            {error}
                                                        </Alert>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            <AnimatePresence mode="wait">
                                                {forgotPasswordSent && (
                                                    <motion.div initial={{ opacity:0,y:-10,scale:.95 }} animate={{ opacity:1,y:0,scale:1 }} exit={{ opacity:0,y:-10,scale:.95 }} transition={{ duration:.25 }}>
                                                        <Alert severity="success" sx={{ mb:2, bgcolor:'rgba(34,197,94,.12)', color:'white', border:'2px solid rgba(34,197,94,.3)', borderRadius:3, backdropFilter:'blur(15px)', fontWeight:600, fontSize:'.85rem', '& .MuiAlert-icon':{ color:'#22c55e' } }}>
                                                            Đã gửi liên kết khôi phục tới email của bạn.
                                                        </Alert>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {isForgotPassword ? (
                                                <motion.div initial={{ opacity:0,x:20 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-20 }} transition={{ duration:.3 }}>
                                                    <StyledTextField
                                                        margin="normal" required fullWidth id="forgotEmail" label="Địa chỉ email" name="forgotEmail" autoComplete="email"
                                                        value={forgotPasswordEmail} onChange={(e)=>setForgotPasswordEmail(e.target.value)}
                                                        disabled={isLoading || forgotPasswordSent}
                                                        InputProps={{ startAdornment:<InputAdornment position="start"><Email sx={{ color:'rgba(255,255,255,.7)', fontSize:20 }}/></InputAdornment> }}
                                                        sx={{ mb: 2.5 }}
                                                    />
                                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                        <PrimaryButton type="submit" fullWidth variant="contained" disabled={isLoading || forgotPasswordSent}
                                                                       startIcon={isLoading ? <CircularProgress size={20} color="inherit"/> : <Email sx={{ fontSize:20 }}/> }
                                                                       sx={{ mb: 2, padding:{ xs:'14px 28px', md:'16px 32px' }, fontSize:{ xs:'1rem', md:'1.08rem' } }}
                                                        >
                                                            {isLoading ? 'Đang gửi...' : 'Gửi liên kết khôi phục'}
                                                        </PrimaryButton>
                                                    </motion.div>
                                                    <Box display="flex" justifyContent="center">
                                                        <Button onClick={handleBackToLogin}
                                                                sx={{ color:'rgba(255,255,255,.85)', textTransform:'none', fontWeight:600, borderRadius:3, px:3, py:1.4, fontSize:{ xs:'.95rem', md:'1rem' },
                                                                    '&:hover':{ backgroundColor:'rgba(255,255,255,.12)', color:'white', transform:'translateY(-1px)' }, transition:'all .3s' }}
                                                                startIcon={<LoginOutlined sx={{ fontSize:20 }}/>}>
                                                            Quay lại đăng nhập
                                                        </Button>
                                                    </Box>
                                                </motion.div>
                                            ) : (
                                                <>
                                                    {!isLogin && (
                                                        <motion.div variants={itemVariants} initial={{ opacity:0,y:-20 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-20 }} transition={{ duration:.3 }}>
                                                            <StyledTextField
                                                                margin="normal" required fullWidth id="fullName" label="Họ và tên" name="fullName" autoComplete="name"
                                                                value={fullName} onChange={(e)=>setFullName(e.target.value)} disabled={isLoading}
                                                                InputProps={{ startAdornment:<InputAdornment position="start"><PersonAdd sx={{ color:'rgba(255,255,255,.7)', fontSize:20 }}/></InputAdornment> }}
                                                                sx={{ mb: 1.25 }}
                                                            />
                                                        </motion.div>
                                                    )}

                                                    <StyledTextField
                                                        margin="normal" required fullWidth id="email" label="Địa chỉ Email" name="email" autoComplete="email"
                                                        value={email} onChange={(e)=>setEmail(e.target.value)} disabled={isLoading}
                                                        InputProps={{ startAdornment:<InputAdornment position="start"><Email sx={{ color:'rgba(255,255,255,.7)', fontSize:20 }}/></InputAdornment> }}
                                                        sx={{ mb: 1.25 }}
                                                    />

                                                    {/* Password Field với icon mắt được cải tiến */}
                                                    <StyledTextField
                                                        margin="normal"
                                                        required
                                                        fullWidth
                                                        name="password"
                                                        label="Mật khẩu"
                                                        type={showPassword ? 'text':'password'}
                                                        id="password"
                                                        autoComplete="current-password"
                                                        value={password}
                                                        onChange={(e)=>setPassword(e.target.value)}
                                                        disabled={isLoading}
                                                        onFocus={() => setPasswordFocused(true)}
                                                        onBlur={() => setPasswordFocused(false)}
                                                        className="password-field"
                                                        InputProps={{
                                                            startAdornment:<InputAdornment position="start"><LockOutlined sx={{ color:'rgba(255,255,255,.7)', fontSize:20 }}/></InputAdornment>,
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <AnimatePresence mode="wait">
                                                                        {(password || passwordFocused) && (
                                                                            <motion.div
                                                                                key="password-toggle"
                                                                                variants={passwordIconVariants}
                                                                                initial="hidden"
                                                                                animate="visible"
                                                                                exit="hidden"
                                                                            >
                                                                                <PasswordToggleButton
                                                                                    onClick={()=>setShowPassword(!showPassword)}
                                                                                    edge="end"
                                                                                    aria-label="toggle password visibility"
                                                                                >
                                                                                    <motion.div
                                                                                        animate={{ rotate: showPassword ? 0 : 180 }}
                                                                                        transition={{ duration: 0.3 }}
                                                                                    >
                                                                                        {showPassword ?
                                                                                            <VisibilityOff sx={{ fontSize:20 }}/> :
                                                                                            <Visibility sx={{ fontSize:20 }}/>
                                                                                        }
                                                                                    </motion.div>
                                                                                </PasswordToggleButton>
                                                                            </motion.div>
                                                                        )}
                                                                    </AnimatePresence>
                                                                </InputAdornment>
                                                            )
                                                        }}
                                                        sx={{ mb: !isLogin ? 1.25 : 2 }}
                                                    />

                                                    {/* Confirm Password Field với icon mắt được cải tiến */}
                                                    {!isLogin && (
                                                        <motion.div variants={itemVariants} initial={{ opacity:0,y:-20 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-20 }} transition={{ duration:.3 }}>
                                                            <StyledTextField
                                                                margin="normal"
                                                                required
                                                                fullWidth
                                                                name="confirmPassword"
                                                                label="Xác nhận mật khẩu"
                                                                type={showConfirmPassword ? 'text':'password'}
                                                                id="confirmPassword"
                                                                value={confirmPassword}
                                                                onChange={(e)=>setConfirmPassword(e.target.value)}
                                                                disabled={isLoading}
                                                                onFocus={() => setConfirmPasswordFocused(true)}
                                                                onBlur={() => setConfirmPasswordFocused(false)}
                                                                className="password-field"
                                                                InputProps={{
                                                                    startAdornment:<InputAdornment position="start"><LockOutlined sx={{ color:'rgba(255,255,255,.7)', fontSize:20 }}/></InputAdornment>,
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <AnimatePresence mode="wait">
                                                                                {(confirmPassword || confirmPasswordFocused) && (
                                                                                    <motion.div
                                                                                        key="confirm-password-toggle"
                                                                                        variants={passwordIconVariants}
                                                                                        initial="hidden"
                                                                                        animate="visible"
                                                                                        exit="hidden"
                                                                                    >
                                                                                        <PasswordToggleButton
                                                                                            onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
                                                                                            edge="end"
                                                                                            aria-label="toggle confirm password visibility"
                                                                                        >
                                                                                            <motion.div
                                                                                                animate={{ rotate: showConfirmPassword ? 0 : 180 }}
                                                                                                transition={{ duration: 0.3 }}
                                                                                            >
                                                                                                {showConfirmPassword ?
                                                                                                    <VisibilityOff sx={{ fontSize:20 }}/> :
                                                                                                    <Visibility sx={{ fontSize:20 }}/>
                                                                                                }
                                                                                            </motion.div>
                                                                                        </PasswordToggleButton>
                                                                                    </motion.div>
                                                                                )}
                                                                            </AnimatePresence>
                                                                        </InputAdornment>
                                                                    )
                                                                }}
                                                                sx={{ mb: 2 }}
                                                            />
                                                        </motion.div>
                                                    )}

                                                    <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                        <PrimaryButton
                                                            type="submit" fullWidth variant="contained" disabled={isLoading}
                                                            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : (isLogin ? <LoginOutlined sx={{ fontSize:20 }}/> : <PersonAdd sx={{ fontSize:20 }}/>)}
                                                            sx={{ mb: 1.5, padding:{ xs:'14px 28px', md:'16px 32px' }, fontSize:{ xs:'1rem', md:'1.08rem' } }}
                                                        >
                                                            {isLoading ? 'Đang xử lý...' : (isLogin ? 'Đăng nhập vào hệ thống' : 'Tạo tài khoản mới')}
                                                        </PrimaryButton>
                                                    </motion.div>

                                                    <motion.div variants={itemVariants}>
                                                        <Box display="flex" justifyContent="center">
                                                            <Button
                                                                onClick={handleToggleMode}
                                                                sx={{
                                                                    color:'rgba(255,255,255,.85)', textTransform:'none', fontWeight:600, borderRadius:3, px:2, py:1.1,
                                                                    fontSize:{ xs:'.9rem', md:'.95rem' },
                                                                    '&:hover':{ backgroundColor:'rgba(255,255,255,.12)', color:'white', transform:'translateY(-1px)' },
                                                                    transition:'all .3s'
                                                                }}
                                                                startIcon={isLogin ? <PersonAdd sx={{ fontSize:20 }}/> : <LoginOutlined sx={{ fontSize:20 }}/>}
                                                            >
                                                                {isLogin ? 'Chưa có tài khoản? Đăng ký ngay' : 'Đã có tài khoản? Đăng nhập ngay'}
                                                            </Button>
                                                        </Box>
                                                    </motion.div>

                                                    {isLogin && (
                                                        <motion.div variants={itemVariants}>
                                                            <Box display="flex" justifyContent="center">
                                                                <Button
                                                                    onClick={handleForgotPassword}
                                                                    sx={{
                                                                        color:'rgba(255,255,255,.7)',
                                                                        textTransform:'none',
                                                                        fontWeight:500,
                                                                        fontSize:{ xs:'.85rem', md:'.9rem' },
                                                                        transition: 'all 0.3s ease',
                                                                        '&:hover':{
                                                                            color:'rgba(59,130,246,.85)',
                                                                            transform: 'translateY(-1px)'
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
