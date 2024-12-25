import * as React from 'react';
import PropTypes from 'prop-types';
import Logo from '../../assets/icon/Logo.svg';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import FlightIcon from '@mui/icons-material/Flight';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import { Box, createTheme } from '@mui/material';
import CustomerList from './CustomerList';
import FlightManagement from './FlightManagement';


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
  {
    kind: 'divider',
  },
  {
    segment: 'Caidat',
    title: 'Cài đặt',
    icon: <SettingsIcon />,
  },
  {
    segment: 'Dangxuat',
    title: 'Đăng xuất',
    icon: <LogoutIcon />,
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
          dark: '#11221190',
        },
        background: {
          default: '#F0F3F5',
          paper: '#FFFFFF',
        },
        action: {
          hover: '#B2E8D6',
          selected: '#78C8A5', 
          focus: '#78C8A5', 
          hoverOpacity: 0.1, 
          selectedOpacity:0.3,
          activatedOpacity: 0.12, 
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#FFFFFF',
          light: '#FFFFFF',
          dark: '#DDFAF0',
        },
        background: {
          default: '#11221160',
          paper: '#112211',
        },
        action: {
          hover: '#2A433A', 
          selected: '#FFFFFF', 
          focus: '#A3D6C6', 
          hoverOpacity: 0.1,
          selectedOpacity:0.5,
          activatedOpacity: 0.12,
        },
      },
    },
  },
  typography: {
    fontFamily: [
      'unbounded', 'sans-serif','montserrat'
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
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        padding: '10px'
        // alignItems: 'center',
        // textAlign: 'center',
      }}
    >
      {pathname === "/Khachhang" ? (<CustomerList />) : <></>}
      {pathname === "/Lichchuyenbay" ? (<FlightManagement />) : <></>}
      {/* <Typography>Dashboard content for {pathname}</Typography> */}
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