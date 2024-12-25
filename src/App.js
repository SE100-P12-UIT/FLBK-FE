import { lazy, Suspense, useEffect } from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Box, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import theme from './app/styles/muiOverride.js';
import Dashboard from '../src/app/pages/Employee/Dashboard.js';
import NotFoundPage from './app/pages/NotFound/NotFound.js';
import SignIn from './app/pages/Authentication/SignIn/SignIn.js';
import SignUp from './app/pages/Authentication/SignUp/SignUp.js';
import { ToastContainer } from 'react-toastify';
import UserProfile from './app/pages/Customer/Profile/UserProfile.js';
import { useState } from 'react';


const Home = lazy(() => import('./app/pages/home/Home.js'));
const FlightSearch = lazy(() => import('./app/pages/search/FlightSearch.js'))
const BookFlight = lazy(() => import('./app/pages/search/BookFlight.js'))

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Lấy trạng thái đăng nhập
  const [userRole, setUserRole] = useState(" ");
  
    useEffect(() => {
      const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (storedUserInfo && storedUserInfo.role) {
    setUserRole(storedUserInfo.role);
  }
    }, [])
  
    useEffect(() => {
      console.log("Updated userRole:", userRole);
    }, [userRole]);
  
  const PublicRoutes = () => (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to={userRole === 'admin' ? '/admin/dashboard' : userRole === 'employee' ? '/employee/dashboard' : '/search'} replace /> : <Home />}
      />
      <Route
        path="/signin"
        element={isAuthenticated ? <Navigate to={userRole === 'admin' ? '/admin/dashboard' : userRole === 'employee' ? '/employee/dashboard' : '/search'} replace /> : <SignIn />}
      />
      <Route
        path="/signup"
        element={isAuthenticated ? <Navigate to={userRole === 'admin' ? '/admin/dashboard' : userRole === 'employee' ? '/employee/dashboard' : '/search'} replace /> : <SignUp />}
      />
      <Route
        path="/home"
        element={isAuthenticated ? <Navigate to={userRole === 'admin' ? '/admin/dashboard' : userRole === 'employee' ? '/employee/dashboard' : '/search'} replace /> : <Home />}
      />
      <Route
        path="/search"
        element={isAuthenticated ? <Navigate to={userRole === 'admin' ? '/admin/dashboard' : userRole === 'employee' ? '/employee/dashboard' : '/search'} replace /> : <FlightSearch />}
      />
      <Route
        path="/booking"
        element={isAuthenticated ? <Navigate to={userRole === 'admin' ? '/admin/dashboard' : userRole === 'employee' ? '/employee/dashboard' : '/search'} replace /> : <BookFlight />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );

  // Route cho nhân viên
  const EmployeeRoutes = () => (
    <Routes>
      <Route path="/employee/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/employee/dashboard" replace />} />
    </Routes>
  );

  // Route cho admin
  const AdminRoutes = () => (
    <Routes>
      <Route path="/admin/dashboard" element={<Dashboard />} /> {/* Sửa thành trang giao diện của admin sau */}
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );

  // Route cho user
  const UserRoutes = () => (
    <Routes>
      <Route path="/user/profile" element={<UserProfile />} /> {/* Sửa thành trang giao diện của người dùng sau */}
      <Route path="/search" element={<FlightSearch />} />
      <Route path="/booking" element={<BookFlight/>}/>
      <Route path="/" element={<Navigate to="/search" replace />} />
      <Route path="*" element={<Navigate to="/search" replace />} />
    </Routes>
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider theme={theme}>
        <Box display={'flex'} flex={1}>
          {!isAuthenticated && <PublicRoutes />}
          {isAuthenticated && userRole === 'employee' && <EmployeeRoutes />}
          {isAuthenticated && userRole === 'admin' && <AdminRoutes />}
          {isAuthenticated && userRole === 'user' && <UserRoutes />}
        </Box>
        <ToastContainer position="bottom-right" autoClose={2500} newestOnTop rtl={false} pauseOnFocusLoss pauseOnHover />
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
