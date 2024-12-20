import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import Logo from 'D://FLBK-FE/src/app/assets/icon/Logo.svg';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import FlightIcon from '@mui/icons-material/Flight';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import { colors } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';

const NAVIGATION = [
  {
    segment: 'Khachhang',
    title: 'Khách hàng',
    icon: <PersonIcon />,
  },
  {
    segment: 'Lichchuyenbay',
    title: 'Lịch chuyến bay',
    icon: <FlightIcon />,
  },
  {
    segment: 'Ghinhandatve',
    title: 'Ghi nhận đặt vé',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'Ghinhanhuyve',
    title: 'Ghi nhận hủy vé',
    icon: <DeleteForeverIcon />,
  },
  {
    segment: 'Lapbaocao',
    title: 'Lập báo cáo',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'Doanhthutheothang',
        title: 'Doanh thu theo tháng',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'Doanhthutheonam',
        title: 'Doanh thu theo năm',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    kind: 'divider',
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: {
    
    light: {
      palette: {
        primary: {
          main: '#8DD3BB',
          light: '#DDFAF0',
          dark:'#112211',
        },
        background: {
          default: '#F0F3F5',
          paper: '#FFFFFF',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#FFFFFF',
          light: '#FFFFFF',
          dark:'#DDFAF0',
        },
        background: {
          default: '#11221160',
          paper: '#112211',
        },
      },
    },
  },
  typography: {
    fontFamily: [
      'unbounded', 'sans-serif'
    ].join(','),
    
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
  
});

function DemoPageContent({ pathname }) {
  const Navigate = useNavigate();
  Navigate(pathname);
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      
      {pathname}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function Dashboard(props) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // preview-start
    <AppProvider
      
      navigation={NAVIGATION}
      branding={{
        logo: <img src={Logo} alt="Logo" />,
        title: 'FLBK',
        homeUrl: '/toolpad/core/introduction',
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default Dashboard;