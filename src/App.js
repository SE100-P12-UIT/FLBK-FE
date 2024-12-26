import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import theme from './app/styles/muiOverride.js';
import Dashboard from './app/pages/Employee/Dashboard.js';
import NotFoundPage from './app/pages/NotFound/NotFound.js';
import SignIn from './app/pages/Authentication/SignIn/SignIn.js';
import SignUp from './app/pages/Authentication/SignUp/SignUp.js';
import UserProfile from './app/pages/Customer/Profile/UserProfile.js';

const Home = lazy(() => import('./app/pages/home/Home.js'));
const FlightSearch = lazy(() => import('./app/pages/search/FlightSearch.js'));
const BookFlight = lazy(() => import('./app/pages/search/BookFlight.js'));
const BookingDetails = lazy(() => import('./app/pages/search/BookingDetail.js'));

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.user.user.role || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && userRole) {
      const redirectPath = redirectBasedOnRole(userRole);
      navigate(redirectPath); 
    }
  }, [isAuthenticated, userRole, navigate]);

  const redirectBasedOnRole = (role) => {
    if (role === 'admin') return '/admin/dashboard';
    if (role === 'employee') return '/employee/dashboard';
    return '/search';
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
                <Route path="/admin/dashboard" element={<Dashboard />} />
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
                <Route path="*" element={<Navigate to="/search" replace />} />
              </>
            )}
          </Routes>
        </Box>
        <ToastContainer position="bottom-right" autoClose={2500} />
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
