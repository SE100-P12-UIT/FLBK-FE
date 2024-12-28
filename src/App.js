import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import theme from './app/styles/muiOverride.js';
import Dashboard from './app/pages/Employee/Dashboard.js';
import DashBoard from './app/pages/Admin/Dashboard.js'
import NotFoundPage from './app/pages/NotFound/NotFound.js';
import SignIn from './app/pages/Authentication/SignIn/SignIn.js';
import SignUp from './app/pages/Authentication/SignUp/SignUp.js';
import UserProfile from './app/pages/Customer/Profile/UserProfile.js';
import TokenService from './app/services/tokenService.js';
import { setUser } from './app/stores/slices/userSlice.js';
import UserService from './app/services/userService.js';

const Home = lazy(() => import('./app/pages/home/Home.js'));
const FlightSearch = lazy(() => import('./app/pages/search/FlightSearch.js'));
const BookFlight = lazy(() => import('./app/pages/search/BookFlight.js'));
const BookingDetails = lazy(() => import('./app/pages/search/BookingDetail.js'));

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.user.user.role || "");
  const { token, refreshToken } = TokenService.getAccessTokenFromURL(window.location.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      if (token && refreshToken) {
        Cookies.set('accessToken', token);
        Cookies.set('refreshToken', refreshToken);
        try {
          const user = await UserService.getUserById(TokenService.decodeToken(token).sub);
          dispatch(setUser(user));
          window.history.replaceState({}, document.title, window.location.pathname);
          window.location.reload();
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      }
    };

    fetchUser();
  }, [token, refreshToken, dispatch]);

  useEffect(() => {
    if (isAuthenticated && userRole) {
      const redirectPath = redirectBasedOnRole(userRole);
      if (window.location.pathname === '/') {
        navigate(redirectPath);
      }
    }
  }, [isAuthenticated, userRole, navigate]);

  const redirectBasedOnRole = (role) => {
    if (role === 'admin') return '/admin/dashboard';
    if (role === 'employee') return '/employee/dashboard';
    return '/home';
  };

  if (!isAuthenticated) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ThemeProvider theme={theme}>
          <Box display="flex" flex={1}>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/search" element={<FlightSearch />} />
              <Route path="/booking" element={<BookFlight />} />
              <Route path="/bkdt" element={<BookingDetails />} />
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Box>
          <ToastContainer position="bottom-right" autoClose={2500} />
        </ThemeProvider>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider theme={theme}>
        <Box display="flex" flex={1}>
          <Routes>
            {userRole === 'admin' && (
              <>
                <Route path="/admin/dashboard" element={<DashBoard />} />
                <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
              </>
            )}
            {userRole === 'employee' && (
              <>
                <Route path="/employee/dashboard" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/employee/dashboard" replace />} />
              </>
            )}
            {userRole === 'user' && (
              <>
                <Route path="/user/profile" element={<UserProfile />} />
                <Route path="/search" element={<FlightSearch />} />
                <Route path="/booking" element={<BookFlight />} />
                <Route path="/bkdt" element={<BookingDetails />} />
                <Route path="/home" element={<Home />} />
                <Route path="*" element={<NotFoundPage />} />
              </>
            )}
          </Routes>
        </Box>
        <ToastContainer position="bottom-right" autoClose={2500} limit={3}/>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
