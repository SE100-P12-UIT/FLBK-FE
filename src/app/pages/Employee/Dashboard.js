import BarChartIcon from '@mui/icons-material/BarChart';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FlightIcon from '@mui/icons-material/Flight';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Button, createTheme, Typography } from '@mui/material';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import PropTypes from 'prop-types';
import * as React from 'react';
import Logo from '../../assets/icon/Logo.svg';
import CancelTickets from './CancelTickets';
import CustomerList from './CustomerList';
import FlightManagement from './FlightManagement';
import VerifyTickets from './VerifyTickets';
import YesNoModal from '../../components/YesNoModal';
import { userLogout } from '../../stores/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Revenue from '../Admin/Revenue';





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
          selectedOpacity: 0.3,
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
          selectedOpacity: 0.5,
          activatedOpacity: 0.12,
        },
      },
    },
  },
  typography: {
    fontFamily: [
      'unbounded', 'sans-serif', 'montserrat'
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
      {pathname === "/Ghinhandatve" ? (<VerifyTickets />) : <></>}
      {pathname === "/Ghinhanhuyve" ? (<CancelTickets />) : <></>}
      {pathname === "/LapBaoCao" ? <Revenue /> : <></>}
      {/* <Typography>Dashboard content for {pathname}</Typography> */}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function Dashboard(props) {
  const { window } = props;
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const resultAction = await dispatch(userLogout()).unwrap();
      if (resultAction) {
        toast.success('Đăng xuất thành công');
        navigate('/signin');
      }
    } catch (error) {
      toast.error('Đã có lỗi xảy ra');
      console.error('Failed to logout:', error);
    }
  };

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
      segment: 'LapBaoCao',
      title: 'Lập báo cáo',
      icon: <BarChartIcon />,
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
    /* {
      segment: 'Dangxuat',
      title: 'Đăng xuất',
      icon: <LogoutIcon />,
    }, */
  ];

  function SidebarFooter({ mini }) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: mini ? 'center' : 'flex-start',
          alignItems: 'center',
          my: 2,
          mx: 1,
          overflow: 'hidden',
          borderRadius: '8px',
        }}
      >
        <Button
          startIcon={<LogoutIcon />}
          onClick={() => setOpenLogoutModal(true)}
          sx={{
            justifyContent: mini ? 'center' : 'flex-start',
            width: '100%',
            height: '48px',
            padding: '8px 16px',
            textAlign: 'left',
            borderRadius: '8px',
            color: 'text.primary',
            position: 'relative',
            transition: 'all 0.2s',
            backgroundColor: 'transparent',
            '.MuiButton-startIcon': {
              margin: mini ? 'auto' : '0 px 0 0',
            },
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          {/* Chỉ hiện icon hover khi mini */}

          <Typography
            sx={{
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
              position: 'absolute',
              left: '48px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              visibility: mini ? 'hidden' : 'visible',
            }}
          >
            Đăng xuất
          </Typography>

        </Button>
      </Box>
    );
  }



  SidebarFooter.propTypes = {
    mini: PropTypes.bool.isRequired,
  };


  const router = useDemoRouter('/dashboard');

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <Box>
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
        <DashboardLayout slots={{
          sidebarFooter: SidebarFooter,
        }}>
          <DemoPageContent pathname={router.pathname} />
        </DashboardLayout>
      </AppProvider>

      <YesNoModal
        title="Đăng xuất"
        content="Bạn có chắc chắn muốn đăng xuất?"
        open={openLogoutModal}
        setOpen={setOpenLogoutModal}
        onYes={handleLogout}
        onNo={() => setOpenLogoutModal(false)}
      />
    </Box>
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