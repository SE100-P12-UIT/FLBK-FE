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

const Home = lazy(() => import('./app/pages/home/Home.js'));

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Lấy trạng thái đăng nhập
  const userRole = useSelector((state) => state.auth.role); // Lấy vai trò từ Redux

  useEffect(() => {
    console.log(userRole);
  },[])
  const PublicRoutes = () => (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to={userRole === 'admin' ? '/admin/dashboard' : userRole === 'user' ? '/user/dashboard' : '/dashboard'} replace /> : <Home />}
      />
      <Route
        path="/signin"
        element={isAuthenticated ? <Navigate to={userRole === 'admin' ? '/admin/dashboard' : userRole === 'user' ? '/user/dashboard' : '/dashboard'} replace /> : <SignIn />}
      />
      <Route
        path="/signup"
        element={isAuthenticated ? <Navigate to={userRole === 'admin' ? '/admin/dashboard' : userRole === 'user' ? '/user/dashboard' : '/dashboard'} replace /> : <SignUp />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );

  // Route cho nhân viên
  const EmployeeRoutes = () => (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
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
      <Route path="/user/dashboard" element={<Dashboard />} /> {/* Sửa thành trang giao diện của người dùng sau */}
      <Route path="*" element={<Navigate to="/user/dashboard" replace />} />
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
