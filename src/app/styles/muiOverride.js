import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#8DD3BB', // Màu chính (primary)
            light: '#DDFAF0', // Màu sáng hơn của primary
            dark: '#112211', // Màu tối hơn của primary
            contrastText: '#FF8682', // Text contrast
        },
        secondary: {
            main: '#FF8682', // Màu phụ
            light: '#FFD1CC', // Màu sáng hơn của secondary
            dark: '#A83B37', // Màu tối hơn của secondary
        },
        background: {
            default: '#FFFFFF', // Màu nền mặc định
            paper: '#F9F9F9', // Nền các thành phần MUI (card, dialog)
        },
        text: {
            primary: '#333', // Text chính
            secondary: '#555', // Text phụ
            disabled: '#999', // Text bị disable
        },
    },
    typography: {
        fontFamily: "'Unbounded', sans-serif", // Font mặc định cho toàn dự án
        h1: {
            fontFamily: "'Unbounded', sans-serif", // Font riêng cho tiêu đề h1
            fontSize: '2.5rem',
            fontWeight: 700,
        },
        h2: {
            fontFamily: "'Unbounded', sans-serif",
            fontSize: '2rem',
            fontWeight: 600,
        },
        h3: {
            fontFamily: "'Unbounded', sans-serif",
            fontSize: '1.75rem',
            fontWeight: 600,
        },
        h4: {
            fontFamily: "'Unbounded', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 500,
        },
        h5: {
            fontFamily: "'Unbounded', sans-serif",
            fontSize: '1.25rem',
            fontWeight: 500,
        },
        h6: {
            fontFamily: "'Unbounded', sans-serif",
            fontSize: '1rem',
            fontWeight: 500,
        },
        body1: {
            fontFamily: "'Montserrat', sans-serif", // Font riêng cho nội dung chính
            fontSize: '1rem',
            lineHeight: 1.5,
        },
        body2: {
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.875rem',
            lineHeight: 1.4,
        },
        button: {
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.875rem',
            fontWeight: 500,
            textTransform: 'none', // Không in hoa chữ trên nút
        },
        caption: {
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.75rem',
        },
        overline: {
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.75rem',
            textTransform: 'uppercase',
        },
    },
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true, // Tắt ripple cho tất cả các thành phần sử dụng ButtonBase (Button, IconButton, v.v.)
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    padding: '8px 16px',
                },
                contained: {
                    backgroundColor: '#8DD3BB',
                    color: '#000000',
                    '&:hover': {
                        backgroundColor: '#DDFAF0',
                        color: '#112211',
                    },
                },
                outlined: {
                    borderColor: '#8DD3BB',
                    color: '#112211',
                    '&:hover': {
                        borderColor: '#FFFFFF',
                        backgroundColor: '#DDFAF0',
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#8DD3BB',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                        backgroundColor: 'transparent',
                        transform: 'scale(1.1)',
                        
                    }
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#8DD3BB',
                        },
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    borderRadius:'8px',
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#8DD3BB',
                        },
                    },
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: '#333',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#F9F9F9',
                    borderRadius: '12px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#8DD3BB',
                    color: '#FFFFFF',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#F9F9F9',
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '0.875rem',
                    lineHeight: 1.4,
    },
},
        },
    },
});

export default theme;