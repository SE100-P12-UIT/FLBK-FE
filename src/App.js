import { lazy, Suspense } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider} from '@mui/material';
import theme from './app/styles/muiOverride.js';
import Dashboard from  '../src/app/pages/Employee/Dashboard.js'
import NotFoundPage from './app/pages/NotFound/NotFound.js';
import SignIn from './app/pages/Authentication/SignIn/SignIn.js';
import SignUp from './app/pages/Authentication/SignUp/SignUp.js';
const Home = lazy(() => import('./app/pages/home/Home.js'))
 
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />}></Route>
          <Route path="/Dashboard" element={<Dashboard />}></Route>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
